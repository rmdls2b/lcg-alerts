"use client"
import { useState, useEffect } from "react"

export default function Dashboard() {
  const [auth, setAuth] = useState(false)
  const [pwd, setPwd] = useState("")
  const [data, setData] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(function() {
    const stored = sessionStorage.getItem("lcg_admin_pwd")
    if (stored) {
      setPwd(stored)
      setAuth(true)
      loadData(stored)
    }
  }, [])

  async function handleAuth(e) {
    e.preventDefault()
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd }),
    })
    if (res.ok) {
      sessionStorage.setItem("lcg_admin_pwd", pwd)
      setAuth(true)
      loadData(pwd)
    } else {
      alert("Mot de passe incorrect")
    }
  }

  async function loadData(password) {
    const res = await fetch("/api/dashboard-data", {
      cache: "no-store",
      headers: { "Authorization": password || pwd },
    })
    if (res.ok) setData(await res.json())
  }

  async function deleteUser(userId) {
    const res = await fetch("/api/delete-account", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": pwd },
      body: JSON.stringify({ userId: userId }),
    })
    if (res.ok) {
      setConfirmDelete(null)
      loadData()
    } else {
      const d = await res.json()
      alert("Erreur: " + d.error)
    }
  }

  if (!auth) return (
    <div className="max-w-[360px] mx-auto mt-32 text-center">
      <h1 className="text-xl font-bold text-white mb-6">Dashboard Admin</h1>
      <form onSubmit={handleAuth}>
        <input type="password" value={pwd} onChange={function(e) { setPwd(e.target.value) }} placeholder="Mot de passe admin"
          className="w-full px-4 py-3 bg-[#111] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600 mb-3" />
        <button type="submit" className="w-full py-3 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors">
          Accéder
        </button>
      </form>
    </div>
  )

  if (!data) return <p className="text-center mt-10 text-gray-500">Chargement...</p>

  return (
    <div className="max-w-[800px] mx-auto px-6 py-8">
      <h1 className="text-xl font-bold text-white mb-8">Dashboard Admin</h1>

      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: "Clients", value: data.totalUsers },
          { label: "Adresses surveillées", value: data.totalAddresses },
          { label: "Alertes envoyées", value: data.totalAlerts },
        ].map(function(stat) {
          return (
            <div key={stat.label} className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <div className="text-xs text-gray-500 mb-2">{stat.label}</div>
              <div className="text-3xl font-bold text-[#00d4aa]">{stat.value}</div>
            </div>
          )
        })}
      </div>

      <h2 className="text-base text-gray-500 mb-4">Clients</h2>
      {data.users.map(function(user) {
        return (
          <div key={user.id} className="bg-[#111] border border-gray-800 rounded-xl p-4 mb-3 flex items-center justify-between">
            <div>
              <div className="font-bold font-mono text-sm text-gray-300">ID #{String(user.id).slice(-6).toUpperCase()}</div>
              <div className="text-xs text-gray-600 mt-1">
                {user._count.addresses} adresse{user._count.addresses > 1 ? "s" : ""} — inscrit le {new Date(user.createdAt).toLocaleDateString("fr-FR")}
              </div>
            </div>
            <div>
              {confirmDelete === user.id ? (
                <div className="flex gap-2">
                  <button onClick={function() { deleteUser(user.id) }} className="px-3 py-1.5 text-xs rounded-lg bg-red-500 text-white font-bold">
                    Confirmer
                  </button>
                  <button onClick={function() { setConfirmDelete(null) }} className="px-3 py-1.5 text-xs rounded-lg border border-gray-800 text-gray-400">
                    Annuler
                  </button>
                </div>
              ) : (
                <button onClick={function() { setConfirmDelete(user.id) }} className="px-3 py-1.5 text-xs rounded-lg border border-red-500/30 text-red-400 hover:border-red-500/50 transition-colors">
                  Supprimer
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
