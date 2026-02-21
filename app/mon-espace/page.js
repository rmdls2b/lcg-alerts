"use client"
import { useState, useEffect } from "react"

export default function MonEspace() {
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("lcg_user")
    if (!stored) {
      window.location.href = "/login"
      return
    }
    const u = JSON.parse(stored)
    setUser(u)
    loadData(u.userId)
  }, [])

  async function loadData(userId) {
    const res = await fetch("/api/mon-espace?userId=" + userId)
    if (res.ok) {
      const json = await res.json()
      setData(json)
    }
    setLoading(false)
  }

  function logout() {
    localStorage.removeItem("lcg_user")
    window.location.href = "/login"
  }

  if (loading) return <p style={{ textAlign: "center", marginTop: "40px" }}>Chargement...</p>
  if (!user) return null

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Bonjour {user.pseudonym}</h1>
        <button onClick={logout} style={{ padding: "8px 16px", backgroundColor: "#222", border: "1px solid #333", borderRadius: "6px", color: "#888", cursor: "pointer" }}>
          Deconnexion
        </button>
      </div>

      {data && data.addresses.length === 0 && (
        <p style={{ color: "#666", textAlign: "center" }}>Aucune adresse surveillee</p>
      )}

      {data && data.addresses.map(function(addr) {
        return (
          <div key={addr.id} style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "20px", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <span style={{ color: addr.isActive ? "#00d4aa" : "#666", fontSize: "18px" }}>{addr.isActive ? "●" : "○"}</span>
              <span style={{ fontFamily: "monospace", fontSize: "13px" }}>{addr.address.slice(0, 12)}...{addr.address.slice(-8)}</span>
              {addr.label && <span style={{ color: "#888" }}>({addr.label})</span>}
              <span style={{ marginLeft: "auto", fontSize: "12px", color: addr.isActive ? "#00d4aa" : "#666" }}>
                {addr.isActive ? "Surveillance active" : "Surveillance inactive"}
              </span>
            </div>
            {addr.alerts.length > 0 && (
              <div style={{ marginTop: "12px", borderTop: "1px solid #222", paddingTop: "12px" }}>
                <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>Dernieres alertes :</p>
                {addr.alerts.map(function(alert) {
                  return (
                    <div key={alert.id} style={{ fontSize: "12px", color: "#ccc", marginBottom: "4px" }}>
                      {alert.amount} {alert.asset} vers {alert.toAddr.slice(0, 8)}... — {new Date(alert.createdAt).toLocaleString("fr-FR")}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
