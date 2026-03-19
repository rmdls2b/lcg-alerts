"use client"
import { useState, useEffect } from "react"

const BOT_USERNAME = "walleRt_guard_bot"

export default function MonEspaceClient() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [instructions, setInstructions] = useState("")
  const [instructionsSaved, setInstructionsSaved] = useState(false)
  const [recurringAlerts, setRecurringAlerts] = useState(false)
  const [pseudonym, setPseudonym] = useState("")
  const [pseudonymSaved, setPseudonymSaved] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmDeleteAddr, setConfirmDeleteAddr] = useState(null)
  const [confirmDeleteChannel, setConfirmDeleteChannel] = useState(null)
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [newAddr, setNewAddr] = useState({ address: "", label: "" })
  const [addingAddr, setAddingAddr] = useState(false)
  const [showAddEmail, setShowAddEmail] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [newEmailLabel, setNewEmailLabel] = useState("")
  const [showAddTelegram, setShowAddTelegram] = useState(false)
  const [newTelegramLabel, setNewTelegramLabel] = useState("")
  const [newTelegramGroupId, setNewTelegramGroupId] = useState("")
  const [addingTelegram, setAddingTelegram] = useState(false)

  function authHeaders() {
    return { "Content-Type": "application/json", "Authorization": "Bearer " + token }
  }

  useEffect(function() {
    const stored = localStorage.getItem("wallert_token")
    if (!stored) { window.location.href = "/login"; return }
    setToken(stored)
    loadData(stored)
  }, [])

  async function loadData(t) {
    const res = await fetch("/api/my-account", { headers: { "Authorization": "Bearer " + t } })
    if (res.status === 401) { localStorage.removeItem("wallert_token"); window.location.href = "/login"; return }
    if (res.ok) {
      const json = await res.json()
      setUser(json.user)
      setData(json)
      setInstructions(json.user ? json.user.instructions : "")
      setRecurringAlerts(json.user ? json.user.recurringAlerts : false)
      setPseudonym(json.user ? json.user.pseudonym || "" : "")
    }
    setLoading(false)
  }

  async function saveInstructions() {
    await fetch("/api/user/update", { method: "POST", headers: authHeaders(), body: JSON.stringify({ instructions }) })
    setInstructionsSaved(true)
    setTimeout(function() { setInstructionsSaved(false) }, 2000)
  }

  async function savePseudonym() {
    await fetch("/api/user/update", { method: "POST", headers: authHeaders(), body: JSON.stringify({ pseudonym }) })
    setPseudonymSaved(true)
    setTimeout(function() { setPseudonymSaved(false) }, 2000)
  }

  async function addEmailChannel() {
    if (!newEmail) return
    const res = await fetch("/api/channels", { method: "POST", headers: authHeaders(), body: JSON.stringify({ type: "email", value: newEmail, label: newEmailLabel }) })
    if (!res.ok) {
      const err = await res.json()
      alert(err.error || "Error adding email channel")
    }
    setNewEmail("")
    setNewEmailLabel("")
    setShowAddEmail(false)
    loadData(token)
  }

  async function addTelegramChannel() {
    if (!newTelegramGroupId) return
    setAddingTelegram(true)
    const res = await fetch("/api/channels", { method: "POST", headers: authHeaders(), body: JSON.stringify({ type: "telegram", value: newTelegramGroupId.trim(), label: newTelegramLabel }) })
    if (res.ok) {
      setNewTelegramGroupId("")
      setNewTelegramLabel("")
      setShowAddTelegram(false)
      loadData(token)
    } else {
      const err = await res.json()
      alert(err.error || "Error adding Telegram channel")
    }
    setAddingTelegram(false)
  }

  async function toggleChannel(id, active) {
    await fetch("/api/channels", { method: "PATCH", headers: authHeaders(), body: JSON.stringify({ id, isActive: active }) })
    loadData(token)
  }

  async function removeChannel(id) {
    await fetch("/api/channels?id=" + id, { method: "DELETE", headers: authHeaders() })
    setConfirmDeleteChannel(null)
    loadData(token)
  }

  async function toggleRecurring() {
    const newVal = !recurringAlerts
    setRecurringAlerts(newVal)
    await fetch("/api/user/update", { method: "POST", headers: authHeaders(), body: JSON.stringify({ recurringAlerts: newVal }) })
  }

  async function toggleAddress(id) {
    await fetch("/api/addresses/toggle", { method: "POST", headers: authHeaders(), body: JSON.stringify({ id }) })
    loadData(token)
  }

  async function deleteAddress(id) {
    await fetch("/api/addresses?id=" + id, { method: "DELETE", headers: authHeaders() })
    setConfirmDeleteAddr(null)
    loadData(token)
  }

  async function addAddress(e) {
    e.preventDefault()
    setAddingAddr(true)
    const res = await fetch("/api/addresses", { method: "POST", headers: authHeaders(), body: JSON.stringify({ address: newAddr.address, label: newAddr.label }) })
    if (res.ok) { setNewAddr({ address: "", label: "" }); setShowAddAddress(false); loadData(token) }
    else {
      const err = await res.json()
      alert(err.error || "Error adding wallet")
    }
    setAddingAddr(false)
  }

  async function deleteAccount() {
    await fetch("/api/delete-account", { method: "POST", headers: authHeaders() })
    localStorage.removeItem("wallert_token")
    window.location.href = "/"
  }

  function logout() {
    localStorage.removeItem("wallert_token")
    window.location.href = "/login"
  }

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>
  if (!user || !data) return null

  const hasWallet = data.addresses.length >= 1
  const hasSecondaryEmail = data.channels.filter(function(c) { return c.type === "email" }).length >= 1
  const hasTelegram = data.channels.filter(function(c) { return c.type === "telegram" }).length >= 1

  return (
    <div className="max-w-[700px] mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-bold text-white">Alert settings</h1>
          <p className="text-xs text-white font-bold mt-1">ID #{String(user.id).slice(-6).toUpperCase()}</p>
        </div>
        <button onClick={logout} className="px-4 py-2 text-xs text-gray-300 font-bold border border-gray-800 rounded-lg hover:border-gray-600 transition-colors">Log out</button>
      </div>

      {/* Beta banner */}
      <div className="flex items-start gap-2 mb-6 px-4 py-3 bg-[#0a1a0f] border-l-2 border-[#00FF85] rounded-r-lg">
        <span className="text-[#00FF85] text-sm mt-0.5 shrink-0">ⓘ</span>
        <p className="text-[#9A9A95] text-xs leading-relaxed">{"Wallert is in beta. Limits apply on the public instance (1 wallet, 1 email, 1 Telegram group, limited reminders). For full control with no limits, "}<a href="https://github.com/rmdls2b/wallert" className="text-[#00d4aa] hover:underline">self-host your own instance</a>.</p>
      </div>

      {/* Monitored wallets */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mb-4">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Monitored wallets</p>
        {data.addresses.length === 0 && <p className="text-gray-600 text-sm mb-3">No wallet monitored yet.</p>}
        {data.addresses.map(function(addr) {
          return (
            <div key={addr.id} className="flex items-center gap-3 py-3 border-b border-gray-800/50 last:border-0">
              <span className={addr.isActive ? "text-[#00d4aa] text-sm" : "text-gray-600 text-sm"}>{addr.isActive ? "●" : "○"}</span>
              <div className="flex-1 min-w-0">
                <span className="font-mono text-xs text-gray-300">{addr.address.slice(0, 14)}...{addr.address.slice(-8)}</span>
                {addr.label && <span className="text-gray-600 text-xs ml-2">({addr.label})</span>}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={function() { toggleAddress(addr.id) }} className={"px-3 py-1 text-xs rounded-lg border transition-colors " + (addr.isActive ? "border-yellow-500/30 text-yellow-500 hover:border-yellow-500/50" : "border-[#00d4aa]/30 text-[#00d4aa] hover:border-[#00d4aa]/50")}>
                  {addr.isActive ? "Disable" : "Enable"}
                </button>
                {confirmDeleteAddr === addr.id ? (
                  <div className="flex gap-1">
                    <button onClick={function() { deleteAddress(addr.id) }} className="px-3 py-1 text-xs rounded-lg bg-red-500 text-white">Confirm</button>
                    <button onClick={function() { setConfirmDeleteAddr(null) }} className="px-3 py-1 text-xs rounded-lg border border-gray-800 text-gray-400">Cancel</button>
                  </div>
                ) : (
                  <button onClick={function() { setConfirmDeleteAddr(addr.id) }} className="px-3 py-1 text-xs rounded-lg border border-red-500/30 text-red-400 hover:border-red-500/50 transition-colors">Delete</button>
                )}
              </div>
            </div>
          )
        })}
        {!hasWallet && !showAddAddress && (
          <button onClick={function() { setShowAddAddress(true) }} className="mt-4 px-4 py-2 text-sm border border-[#00d4aa] text-[#00d4aa] rounded-lg hover:bg-[#00d4aa]/5 transition-colors">+ Add a wallet</button>
        )}
        {hasWallet && !showAddAddress && (
          <p className="mt-4 text-xs text-gray-600">Beta limit: 1 wallet. <a href="https://github.com/rmdls2b/wallert" className="text-[#00d4aa] hover:underline">Self-host</a> for unlimited.</p>
        )}
        {showAddAddress && (
          <form onSubmit={addAddress} className="mt-4 pt-4 border-t border-gray-800">
            <input type="text" required value={newAddr.address} onChange={function(e) { setNewAddr({ ...newAddr, address: e.target.value }) }} placeholder="0x..." className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600 font-mono mb-2" />
            <input type="text" value={newAddr.label} onChange={function(e) { setNewAddr({ ...newAddr, label: e.target.value }) }} placeholder="Wallet name (optional)" className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600 mb-3" />
            <div className="flex gap-2">
              <button type="submit" disabled={addingAddr} className="px-4 py-2 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors disabled:opacity-50">{addingAddr ? "Adding..." : "Add"}</button>
              <button type="button" onClick={function() { setShowAddAddress(false) }} className="px-4 py-2 text-sm border border-gray-800 text-gray-400 rounded-lg hover:border-gray-600 transition-colors">Cancel</button>
            </div>
          </form>
        )}
      </div>

      {/* Alert channels */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mb-4">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Alert channels</p>
        <div className="flex items-center gap-2 py-3 border-b border-gray-800/50">
          <span className="text-sm">📧</span>
          <span className="text-sm text-gray-300 flex-1">{user.email} (primary)</span>
          <span className="text-xs text-[#00d4aa]">● Always active</span>
        </div>
        {data.channels.map(function(ch) {
          const icon = ch.type === "email" ? "📧" : "💬"
          const displayValue = ch.type === "email" ? ch.value + (ch.verified ? "" : " (pending verification)") : (ch.value ? "Telegram group" : "Telegram (not linked)")
          return (
            <div key={ch.id} className="flex items-center gap-2 py-3 border-b border-gray-800/50 last:border-0">
              <span className="text-sm">{icon}</span>
              <span className={"text-sm flex-1 " + (ch.isActive ? "text-gray-300" : "text-gray-600")}>
                {displayValue}
                {ch.label && <span className="text-gray-500 ml-1">— {ch.label}</span>}
              </span>
              <button onClick={function() { toggleChannel(ch.id, !ch.isActive) }} className={"px-3 py-1 text-xs rounded-lg border transition-colors " + (ch.isActive ? "border-yellow-500/30 text-yellow-500 hover:border-yellow-500/50" : "border-[#00d4aa]/30 text-[#00d4aa] hover:border-[#00d4aa]/50")}>
                {ch.isActive ? "Disable" : "Enable"}
              </button>
              {confirmDeleteChannel === ch.id ? (
                <div className="flex gap-1">
                  <button onClick={function() { removeChannel(ch.id) }} className="px-3 py-1 text-xs rounded-lg bg-red-500 text-white">Confirm</button>
                  <button onClick={function() { setConfirmDeleteChannel(null) }} className="px-3 py-1 text-xs rounded-lg border border-gray-800 text-gray-400">Cancel</button>
                </div>
              ) : (
                <button onClick={function() { setConfirmDeleteChannel(ch.id) }} className="px-3 py-1 text-xs rounded-lg border border-red-500/30 text-red-400 hover:border-red-500/50 transition-colors">Delete</button>
              )}
            </div>
          )
        })}

        {/* Recurring alerts toggle */}
        <div className="mt-4 pt-4 border-t border-gray-800 flex items-center gap-3">
          <button onClick={toggleRecurring} className={"w-10 h-[22px] rounded-full border-none cursor-pointer relative transition-colors " + (recurringAlerts ? "bg-[#00d4aa]" : "bg-gray-700")}>
            <span className={"absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white transition-all " + (recurringAlerts ? "left-5" : "left-[2px]")}></span>
          </button>
          <div>
            <span className="text-sm text-gray-300">Recurring alerts</span>
            <p className="text-xs text-gray-600 mt-0.5">Resends the alert every 5 min until a recipient confirms</p>
          </div>
        </div>

        {/* Add channels */}
        {showAddEmail ? (
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="flex gap-2 mb-2">
              <input type="email" required placeholder="Email..." value={newEmail} onChange={function(e) { setNewEmail(e.target.value) }} className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600" />
              <input type="text" placeholder="Label (optional)" value={newEmailLabel} onChange={function(e) { setNewEmailLabel(e.target.value) }} className="max-w-[160px] px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600" />
            </div>
            <div className="flex gap-2">
              <button onClick={addEmailChannel} className="px-4 py-2 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors">Add</button>
              <button onClick={function() { setShowAddEmail(false); setNewEmail(""); setNewEmailLabel("") }} className="px-4 py-2 text-sm border border-gray-800 text-gray-400 rounded-lg hover:border-gray-600 transition-colors">Cancel</button>
            </div>
          </div>
        ) : showAddTelegram ? (
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="flex items-start gap-2 mb-4 px-3 py-2.5 bg-[#0a1a0f] border-l-2 border-[#00FF85] rounded-r-lg">
              <span className="text-[#00FF85] text-sm mt-0.5 shrink-0">ⓘ</span>
              <div className="text-[#9A9A95] text-xs leading-relaxed">
                <p className="mb-1"><strong className="text-gray-300">Step 1:</strong> Create a Telegram group and add your trusted contacts.</p>
                <p className="mb-1"><strong className="text-gray-300">Step 2:</strong> Add <strong className="text-gray-300">@{BOT_USERNAME}</strong> to the group as a member.</p>
                <p className="mb-1"><strong className="text-gray-300">Step 3:</strong> The bot will post a Group ID in the chat. Copy it.</p>
                <p><strong className="text-gray-300">Step 4:</strong> Paste the Group ID below.</p>
              </div>
            </div>
            <input type="text" placeholder="Group ID (e.g. -4012345678)" value={newTelegramGroupId} onChange={function(e) { setNewTelegramGroupId(e.target.value) }} className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600 font-mono mb-2" />
            <input type="text" placeholder="Label (e.g. family group, bodyguard...)" value={newTelegramLabel} onChange={function(e) { setNewTelegramLabel(e.target.value) }} className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600 mb-3" />
            <div className="flex gap-2">
              <button onClick={addTelegramChannel} disabled={addingTelegram || !newTelegramGroupId} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold text-sm hover:bg-blue-600 transition-colors disabled:opacity-50">{addingTelegram ? "Linking..." : "Link group"}</button>
              <button onClick={function() { setShowAddTelegram(false); setNewTelegramLabel(""); setNewTelegramGroupId("") }} className="px-4 py-2 text-sm border border-gray-800 text-gray-400 rounded-lg hover:border-gray-600 transition-colors">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 mt-4">
            {!hasSecondaryEmail && (
              <button onClick={function() { setShowAddEmail(true) }} className="px-4 py-2 text-sm border border-[#00d4aa] text-[#00d4aa] rounded-lg hover:bg-[#00d4aa]/5 transition-colors">+ Email</button>
            )}
            {!hasTelegram && (
              <button onClick={function() { setShowAddTelegram(true) }} className="px-4 py-2 text-sm border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/5 transition-colors">+ Telegram</button>
            )}
            {hasSecondaryEmail && hasTelegram && (
              <p className="text-xs text-gray-600 mt-1">Beta limits reached. <a href="https://github.com/rmdls2b/wallert" className="text-[#00d4aa] hover:underline">Self-host</a> for unlimited channels.</p>
            )}
          </div>
        )}
      </div>

      {/* Display name */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mb-4">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Display name</p>
        <p className="text-gray-500 text-sm mb-3">This name will appear in alerts sent to your contacts so they know who it's from.</p>
        <input type="text" value={pseudonym} onChange={function(e) { setPseudonym(e.target.value) }} placeholder="E.g. Rem, Dad, etc." className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600 mb-3" />
        <button onClick={savePseudonym} className="px-4 py-2 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors">
          {pseudonymSaved ? "Saved!" : "Save"}
        </button>
      </div>

      {/* Emergency instructions */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mb-4">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Emergency instructions</p>
        <textarea rows={4} value={instructions} onChange={function(e) { setInstructions(e.target.value) }} placeholder="Example: Call me. Call X. Contact the police. Open a ticket on SEAL911. Etc." className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600 resize-y" />
        <button onClick={saveInstructions} className="mt-3 px-4 py-2 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors">
          {instructionsSaved ? "Saved!" : "Save"}
        </button>
      </div>

      {/* Test alert */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mb-4">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Test my alert</p>
        <p className="text-gray-500 text-sm mb-4">Send a test alert to make sure your contacts receive the notifications. Test reminders are limited to 3 in beta.</p>
        <button onClick={async function() { const res = await fetch("/api/test-alert", { method: "POST", headers: authHeaders() }); if (res.ok) alert("Test alert sent!"); else { const err = await res.json(); alert(err.error || "Error sending test alert") } }} className="px-4 py-2 text-sm border border-yellow-500/30 text-yellow-500 rounded-lg hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-colors">
          Send a test alert
        </button>
      </div>

      {/* Delete account */}
      <div className="mt-8 pt-8 border-t border-gray-800">
        {!confirmDelete ? (
          <button onClick={function() { setConfirmDelete(true) }} className="px-5 py-2.5 text-sm border border-red-500/30 text-red-400 rounded-lg hover:border-red-500/50 hover:bg-red-500/5 transition-colors">Delete my account</button>
        ) : (
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
            <p className="text-red-300 text-sm mb-4">Are you sure? This action is irreversible.</p>
            <div className="flex gap-2">
              <button onClick={deleteAccount} className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold text-sm">Yes, delete</button>
              <button onClick={function() { setConfirmDelete(false) }} className="px-4 py-2 text-sm border border-gray-800 text-gray-400 rounded-lg hover:border-gray-600 transition-colors">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
