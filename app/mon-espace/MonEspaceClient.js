"use client"
"use client"
import { useState, useEffect } from "react"

const inputStyle = { flex: 1, padding: "6px 10px", backgroundColor: "#0a0a0a", border: "1px solid #333", borderRadius: "4px", color: "#e0e0e0", outline: "none", fontSize: "13px" }
const btnStyle = { padding: "6px 14px", borderRadius: "4px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }

export default function MonEspaceClient() {
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newEmail, setNewEmail] = useState({})
  const [editInstructions, setEditInstructions] = useState({})
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(function() {
    const stored = localStorage.getItem("lcg_user")
    if (!stored) { window.location.href = "/login"; return }
    const u = JSON.parse(stored)
    setUser(u)
    loadData(u.userId)
  }, [])

  async function loadData(userId) {
    const res = await fetch("/api/mon-espace?userId=" + userId)
    if (res.ok) { const json = await res.json(); setData(json) }
    setLoading(false)
  }

  async function toggleAddress(id) {
    await fetch("/api/addresses/toggle", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: id }) })
    loadData(user.userId)
  }

  async function saveInstructions(id) {
    await fetch("/api/addresses/update", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: id, instructions: editInstructions[id] }) })
    loadData(user.userId)
  }

  async function addRecipient(addressId) {
    const email = newEmail[addressId]
    if (!email) return
    await fetch("/api/recipients", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ addressId: addressId, email: email }) })
    setNewEmail({ ...newEmail, [addressId]: "" })
    loadData(user.userId)
  }

  async function removeRecipient(id) {
    await fetch("/api/recipients?id=" + id, { method: "DELETE" })
    loadData(user.userId)
  }

  async function deleteAccount() {
    await fetch("/api/delete-account", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.userId }) })
    localStorage.removeItem("lcg_user")
    window.location.href = "/"
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
        <button onClick={logout} style={{ ...btnStyle, backgroundColor: "#222", border: "1px solid #333", color: "#888" }}>Deconnexion</button>
      </div>

      {data && data.addresses && data.addresses.map(function(addr) {
        return (
          <div key={addr.id} style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "20px", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ color: addr.isActive ? "#00d4aa" : "#666", fontSize: "20px" }}>{addr.isActive ? "●" : "○"}</span>
              <span style={{ fontFamily: "monospace", fontSize: "13px" }}>{addr.address.slice(0, 12)}...{addr.address.slice(-8)}</span>
              {addr.label && <span style={{ color: "#888" }}>({addr.label})</span>}
              <button onClick={function() { toggleAddress(addr.id) }} style={{ ...btnStyle, backgroundColor: addr.isActive ? "#661111" : "#116633", color: "#fff", marginLeft: "auto" }}>
                {addr.isActive ? "Desactiver" : "Activer"}
              </button>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "6px" }}>Emails destinataires :</label>
              <div style={{ fontSize: "13px", color: "#ccc", marginBottom: "4px" }}>— {user.email} (principal)</div>
              {addr.recipients.map(function(r) {
                return (
                  <div key={r.id} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "13px", color: "#ccc" }}>— {r.email}</span>
                    <button onClick={function() { removeRecipient(r.id) }} style={{ ...btnStyle, backgroundColor: "#331111", color: "#ff6666", padding: "2px 8px", fontSize: "11px" }}>supprimer</button>
                  </div>
                )
              })}
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <input type="email" placeholder="Ajouter un email..." value={newEmail[addr.id] || ""} onChange={function(e) { setNewEmail({ ...newEmail, [addr.id]: e.target.value }) }} style={inputStyle} />
                <button onClick={function() { addRecipient(addr.id) }} style={{ ...btnStyle, backgroundColor: "#00d4aa", color: "#000" }}>Ajouter</button>
              </div>
            </div>

            <div>
              <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "6px" }}>Instructions d urgence :</label>
              <textarea rows={3} value={editInstructions[addr.id] !== undefined ? editInstructions[addr.id] : addr.instructions} onChange={function(e) { setEditInstructions({ ...editInstructions, [addr.id]: e.target.value }) }}
                style={{ width: "100%", padding: "8px", backgroundColor: "#0a0a0a", border: "1px solid #333", borderRadius: "4px", color: "#e0e0e0", outline: "none", fontSize: "13px", resize: "vertical", boxSizing: "border-box" }} />
              <button onClick={function() { saveInstructions(addr.id) }} style={{ ...btnStyle, backgroundColor: "#00d4aa", color: "#000", marginTop: "6px" }}>Sauvegarder</button>
            </div>

            {addr.alerts && addr.alerts.length > 0 && (
              <div style={{ marginTop: "16px", borderTop: "1px solid #222", paddingTop: "12px" }}>
                <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "6px" }}>Dernieres alertes :</label>
                {addr.alerts.map(function(alert) {
                  return (
                    <div key={alert.id} style={{ fontSize: "12px", color: "#888", marginBottom: "2px" }}>
                      {alert.amount} {alert.asset} vers {alert.toAddr.slice(0, 8)}... — {new Date(alert.createdAt).toLocaleString("fr-FR")}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}

      <div style={{ marginTop: "40px", borderTop: "1px solid #222", paddingTop: "24px" }}>
        {!confirmDelete ? (
          <button onClick={function() { setConfirmDelete(true) }} style={{ ...btnStyle, backgroundColor: "#1a0000", border: "1px solid #661111", color: "#ff6666", padding: "10px 20px" }}>
            Supprimer mon compte
          </button>
        ) : (
          <div style={{ background: "#1a0000", border: "1px solid #661111", borderRadius: "8px", padding: "16px" }}>
            <p style={{ color: "#ff8888", marginBottom: "12px" }}>Etes-vous sur ? Cette action est irreversible.</p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={deleteAccount} style={{ ...btnStyle, backgroundColor: "#ff4444", color: "#fff" }}>Oui, supprimer</button>
              <button onClick={function() { setConfirmDelete(false) }} style={{ ...btnStyle, backgroundColor: "#333", color: "#ccc" }}>Annuler</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
