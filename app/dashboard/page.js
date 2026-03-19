"use client"
import { useState, useEffect } from "react"

export default function Dashboard() {
  const [auth, setAuth] = useState(false)
  const [pwd, setPwd] = useState("")
  const [data, setData] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [tab, setTab] = useState("overview")

  useEffect(function() {
    const stored = sessionStorage.getItem("wallert_admin_pwd")
    if (stored) { setPwd(stored); setAuth(true); loadData(stored) }
  }, [])

  async function handleAuth(e) {
    e.preventDefault()
    const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pwd }) })
    if (res.ok) { sessionStorage.setItem("wallert_admin_pwd", pwd); setAuth(true); loadData(pwd) }
    else { alert("Incorrect password") }
  }

  async function loadData(password) {
    const res = await fetch("/api/dashboard-data", { cache: "no-store", headers: { "Authorization": password || pwd } })
    if (res.ok) setData(await res.json())
  }

  async function requestDeletion(userId) {
    const res = await fetch("/api/delete-account", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": pwd }, body: JSON.stringify({ userId }) })
    if (res.ok) { setConfirmDelete(null); loadData() } else { const d = await res.json(); alert("Error: " + d.error) }
  }

  async function cancelDeletion(userId) {
    const res = await fetch("/api/delete-account", { method: "PATCH", headers: { "Content-Type": "application/json", "Authorization": pwd }, body: JSON.stringify({ userId }) })
    if (res.ok) { loadData() } else { const d = await res.json(); alert("Error: " + d.error) }
  }

  function logout() { sessionStorage.removeItem("wallert_admin_pwd"); setAuth(false); setPwd(""); setData(null) }
  function timeAgo(d) {
    const s = Math.floor((Date.now() - new Date(d)) / 1000)
    if (s < 60) return s + "s ago"
    if (s < 3600) return Math.floor(s / 60) + "m ago"
    if (s < 86400) return Math.floor(s / 3600) + "h ago"
    return Math.floor(s / 86400) + "d ago"
  }
  function timeLeft(d) {
    const ms = new Date(d).getTime() + (72 * 60 * 60 * 1000) - Date.now()
    if (ms <= 0) return "imminent"
    const h = Math.floor(ms / (60 * 60 * 1000))
    if (h >= 24) return Math.floor(h / 24) + "d " + (h % 24) + "h left"
    return h + "h left"
  }
  function shortAddr(a) { return a ? a.slice(0, 8) + "..." + a.slice(-6) : "—" }
  function userId(id) { return "ID #" + String(id).slice(-6).toUpperCase() }

  if (!auth) return (
    <div className="max-w-[360px] mx-auto mt-32 text-center">
      <h1 className="text-xl font-bold text-white mb-6">Admin</h1>
      <form onSubmit={handleAuth}>
        <input type="password" value={pwd} onChange={function(e) { setPwd(e.target.value) }} placeholder="Password" className="w-full px-4 py-3 bg-[#111] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600 mb-3" />
        <button type="submit" className="w-full py-3 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors">Access</button>
      </form>
    </div>
  )

  if (!data) return <p className="text-center mt-10 text-gray-500">Loading...</p>

  const s = data.stats

  return (
    <div className="max-w-[900px] mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-white">Wallert Admin</h1>
        <div className="flex gap-3">
          <button onClick={function() { loadData() }} className="px-3 py-1.5 text-xs rounded-lg border border-gray-800 text-gray-400 hover:border-gray-600 transition-colors">Refresh</button>
          <button onClick={logout} className="px-3 py-1.5 text-xs rounded-lg border border-gray-800 text-gray-400 hover:border-gray-600 transition-colors">Log out</button>
        </div>
      </div>

      {/* Active alerts banner */}
      {s.pendingAlerts > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4 mb-6 flex items-center gap-3">
          <span className="text-red-400 text-lg">⚠</span>
          <div>
            <p className="text-red-400 font-bold text-sm">{s.pendingAlerts} active alert{s.pendingAlerts > 1 ? "s" : ""} — unacknowledged</p>
            <p className="text-red-400/60 text-xs mt-0.5">Only the alert recipient can acknowledge. Admin cannot intervene.</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {[
          { label: "Users", value: s.totalUsers, color: "#00d4aa" },
          { label: "Wallets", value: s.totalAddresses, color: "#00d4aa" },
          { label: "Channels", value: s.activeChannels, color: "#00d4aa" },
          { label: "Alerts (real)", value: s.totalAlerts, color: s.pendingAlerts > 0 ? "#F87171" : "#00d4aa" },
          { label: "Alerts (test)", value: s.totalTestAlerts, color: "#9A9A95" },
        ].map(function(stat) {
          return (
            <div key={stat.label} className="bg-[#111] border border-gray-800 rounded-xl p-4">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
            </div>
          )
        })}
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Alerts 24h", value: s.alerts24h },
          { label: "Alerts 7d", value: s.alerts7d },
          { label: "Registrations 7d", value: s.registrations7d },
          { label: "Unverified", value: s.unverifiedUsers, warn: s.unverifiedUsers > 0 },
        ].map(function(stat) {
          return (
            <div key={stat.label} className="bg-[#111] border border-gray-800 rounded-xl p-4">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{stat.label}</div>
              <div className={"text-lg font-bold " + (stat.warn ? "text-yellow-500" : "text-gray-300")}>{stat.value}</div>
            </div>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-800 pb-1">
        {["overview", "users", "alerts"].map(function(t) {
          return (
            <button key={t} onClick={function() { setTab(t) }} className={"px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-t-lg transition-colors " + (tab === t ? "text-[#00d4aa] bg-[#111] border border-gray-800 border-b-0" : "text-gray-500 hover:text-gray-300")}>
              {t}
            </button>
          )
        })}
      </div>

      {/* OVERVIEW TAB */}
      {tab === "overview" && (
        <div>
          <h2 className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">Recent alerts (real)</h2>
          {data.recentAlerts.length === 0 && <p className="text-gray-600 text-sm mb-8">No real alerts yet.</p>}
          {data.recentAlerts.length > 0 && (
            <div className="mb-8">
              {data.recentAlerts.map(function(alert) {
                const isAcked = alert.status === "acknowledged"
                const isExpired = alert.status === "expired"
                return (
                  <div key={alert.id} className="flex items-center gap-4 py-3 border-b border-gray-800/50 last:border-0">
                    <span className={"text-sm " + (isAcked ? "text-[#00d4aa]" : isExpired ? "text-gray-600" : "text-red-400")}>{isAcked ? "✓" : isExpired ? "○" : "●"}</span>
                    <span className="text-xs text-gray-500 font-mono">{shortAddr(alert.fromAddr)}</span>
                    <span className="text-xs text-gray-300 font-bold">{alert.amount} {alert.asset}</span>
                    <span className="text-xs text-gray-600">{alert.resendCount}x</span>
                    <span className="text-xs text-gray-500 ml-auto">{userId(alert.address.user.id)}</span>
                    <span className={"text-xs " + (isAcked ? "text-[#00d4aa]" : isExpired ? "text-gray-600" : "text-gray-600")}>{isAcked ? "Ack" : isExpired ? "Expired" : ""} {timeAgo(alert.createdAt)}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* USERS TAB */}
      {tab === "users" && (
        <div>
          <p className="text-xs text-gray-600 mb-4">{s.totalUsers} user{s.totalUsers !== 1 ? "s" : ""} — {s.unverifiedUsers} unverified</p>
          {data.users.map(function(user) {
            const pendingDeletion = !!user.deletionRequestedAt
            return (
              <div key={user.id} className={"bg-[#111] border rounded-xl p-4 mb-2 flex items-center justify-between " + (pendingDeletion ? "border-red-500/30" : "border-gray-800")}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-sm text-gray-300">{userId(user.id)}</span>
                    {user.pseudonym && <span className="text-gray-500 text-xs">({user.pseudonym})</span>}
                    {!user.emailVerified && <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500">Unverified</span>}
                    {pendingDeletion && <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400">Deletion {timeLeft(user.deletionRequestedAt)}</span>}
                  </div>
                  <div className="text-xs text-gray-600 mt-1 flex gap-3">
                    <span>{user._count.addresses} wallet{user._count.addresses !== 1 ? "s" : ""}</span>
                    <span>{user._count.channels} channel{user._count.channels !== 1 ? "s" : ""}</span>
                    <span>{user.recurringAlerts ? "Recurring ✓" : "Recurring ✗"}</span>
                    <span>{timeAgo(user.createdAt)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ALERTS TAB */}
      {tab === "alerts" && (
        <div>
          {data.activeAlerts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs text-red-400 font-bold uppercase tracking-widest mb-3">Pending ({data.activeAlerts.length})</h2>
              {data.activeAlerts.map(function(alert) {
                return (
                  <div key={alert.id} className="bg-[#111] border border-red-500/20 rounded-xl p-4 mb-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-red-400 text-xs font-bold">{userId(alert.address.user.id)}</span>
                        {alert.address.user.pseudonym && <span className="text-gray-500 text-xs">({alert.address.user.pseudonym})</span>}
                        <span className="text-xs text-gray-400 font-mono">{shortAddr(alert.fromAddr)} → {shortAddr(alert.toAddr)}</span>
                      </div>
                      <span className="text-red-400 text-xs font-bold">{alert.amount} {alert.asset}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Created {timeAgo(alert.createdAt)} · Last sent {timeAgo(alert.lastSentAt)} · {alert.resendCount} reminder{alert.resendCount !== 1 ? "s" : ""}
                    </div>
                  </div>
                )
              })}
              <p className="text-xs text-gray-600 mt-2 italic">Only the alert recipient can acknowledge via their unique link.</p>
            </div>
          )}

          <h2 className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">History (last 20)</h2>
          {data.recentAlerts.length === 0 && <p className="text-gray-600 text-sm">No real alerts yet.</p>}
          {data.recentAlerts.map(function(alert) {
            const isAcked = alert.status === "acknowledged"
            const isExpired = alert.status === "expired"
            return (
              <div key={alert.id} className="flex items-center gap-4 py-3 border-b border-gray-800/50 last:border-0">
                <span className={"text-sm " + (isAcked ? "text-[#00d4aa]" : isExpired ? "text-gray-600" : "text-red-400")}>{isAcked ? "✓" : isExpired ? "○" : "●"}</span>
                <span className="text-xs text-gray-500">{userId(alert.address.user.id)}</span>
                <span className="text-xs text-gray-500 font-mono">{shortAddr(alert.fromAddr)}</span>
                <span className="text-xs text-gray-300 font-bold">{alert.amount} {alert.asset}</span>
                <span className="text-xs text-gray-600">{alert.resendCount} reminder{alert.resendCount !== 1 ? "s" : ""}</span>
                <span className={"text-xs ml-auto " + (isAcked ? "text-[#00d4aa]" : isExpired ? "text-gray-600" : "text-red-400")}>{isAcked ? "Ack " + timeAgo(alert.acknowledgedAt) : isExpired ? "Expired" : "Pending"}</span>
                <span className="text-xs text-gray-600">{timeAgo(alert.createdAt)}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
