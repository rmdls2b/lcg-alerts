"use client"
import { useState, useEffect } from "react"

export default function Dashboard() {
  const [auth, setAuth] = useState(false)
  const [pwd, setPwd] = useState("")
  const [data, setData] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(function() {
    if (sessionStorage.getItem("lcg_admin") === "1") {
      setAuth(true)
      loadData()
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
      sessionStorage.setItem("lcg_admin", "1")
      setAuth(true)
      loadData()
    } else {
      alert("Mot de passe incorrect")
    }
  }

  async function loadData() {
    const res = await fetch("/api/dashboard-data", { cache: "no-store" })
    if (res.ok) setData(await res.json())
  }

  async function deleteUser(userId) {
    const res = await fetch("/api/delete-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    <div style={{ maxWidth: "360px", margin: "120px auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "22px", marginBottom: "24px" }}>Dashboard Admin</h1>
      <form onSubmit={handleAuth}>
        <input type="password" value={pwd} onChange={function(e) { setPwd(e.target.value) }} placeholder="Mot de passe admin"
          style={{ width: "100%", padding: "12px", backgroundColor: "#111", border: "1px solid #333", borderRadius: "6px", color: "#e0e0e0", outline: "none", marginBottom: "12px", boxSizing: "border-box" }} />
        <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#00d4aa", color: "#000", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
          Acceder
        </button>
      </form>
    </div>
  )

  if (!data) return <p style={{ textAlign: "center", marginTop: "40px" }}>Chargement...</p>

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "32px" }}>Dashboard Admin</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "40px" }}>
        {[
          { label: "Clients", value: data.totalUsers },
          { label: "Adresses surveillées", value: data.totalAddresses },
          { label: "Alertes envoyées", value: data.totalAlerts },
        ].map(function(stat) {
          return (
            <div key={stat.label} style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "20px" }}>
              <div style={{ fontSize: "13px", color: "#888", marginBottom: "8px" }}>{stat.label}</div>
              <div style={{ fontSize: "32px", fontWeight: "bold", color: "#00d4aa" }}>{stat.value}</div>
            </div>
          )
        })}
      </div>

      <h2 style={{ fontSize: "18px", marginBottom: "16px", color: "#888" }}>Clients</h2>
      {data.users.map(function(user) {
        return (
          <div key={user.id} style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "16px", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{user.pseudonym}</div>
              <div style={{ fontSize: "13px", color: "#888" }}>{user.email}</div>
              <div style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>
                {user._count.addresses} adresse{user._count.addresses > 1 ? "s" : ""} — inscrit le {new Date(user.createdAt).toLocaleDateString("fr-FR")}
              </div>
            </div>
            <div>
              {confirmDelete === user.id ? (
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={function() { deleteUser(user.id) }} style={{ padding: "6px 12px", backgroundColor: "#ff4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                    Confirmer
                  </button>
                  <button onClick={function() { setConfirmDelete(null) }} style={{ padding: "6px 12px", backgroundColor: "#333", color: "#ccc", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                    Annuler
                  </button>
                </div>
              ) : (
                <button onClick={function() { setConfirmDelete(user.id) }} style={{ padding: "6px 12px", backgroundColor: "#1a0000", border: "1px solid #661111", color: "#ff6666", borderRadius: "4px", cursor: "pointer" }}>
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
