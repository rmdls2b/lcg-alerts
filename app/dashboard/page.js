"use client"
import { useState, useEffect } from "react"

const btnStyle = {
  padding: "6px 14px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "bold",
}

export default function Dashboard() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [data, setData] = useState(null)
  const [newEmail, setNewEmail] = useState({})
  const [editInstructions, setEditInstructions] = useState({})

  async function handleLogin(e) {
    e.preventDefault()
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: password }),
    })
    if (res.ok) {
      setAuthed(true)
      loadData()
    } else {
      setError("Mot de passe incorrect")
    }
  }

  async function loadData() {
    const res = await fetch("/api/dashboard-data")
    if (res.ok) {
      const json = await res.json()
      setData(json)
    }
  }

  async function addRecipient(addressId) {
    const email = newEmail[addressId]
    if (!email) return
    await fetch("/api/recipients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addressId: addressId, email: email }),
    })
    setNewEmail({ ...newEmail, [addressId]: "" })
    loadData()
  }

  async function removeRecipient(id) {
    await fetch("/api/recipients?id=" + id, { method: "DELETE" })
    loadData()
  }

  async function toggleAddress(id) {
    await fetch("/api/addresses/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    })
    loadData()
  }

  async function saveInstructions(id) {
    await fetch("/api/addresses/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, instructions: editInstructions[id] }),
    })
    loadData()
  }

  if (!authed) {
    return (
      <div style={{ maxWidth: "400px", margin: "80px auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "24px" }}>Dashboard Admin</h1>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={function(e) { setPassword(e.target.value) }}
            placeholder="Mot de passe"
            style={{ width: "100%", padding: "12px", backgroundColor: "#111", border: "1px solid #333", borderRadius: "6px", color: "#e0e0e0", outline: "none", marginBottom: "12px", boxSizing: "border-box" }}
          />
          {error && <p style={{ color: "#ff4444", marginBottom: "12px" }}>{error}</p>}
          <button type="submit" style={{ ...btnStyle, width: "100%", padding: "12px", backgroundColor: "#00d4aa", color: "#000" }}>
            Connexion
          </button>
        </form>
      </div>
    )
  }

  if (!data) return <p style={{ textAlign: "center", marginTop: "40px" }}>Chargement...</p>

  return (
    <div>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}>Dashboard Admin</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "32px" }}>
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "16px" }}>
          <div style={{ color: "#888", fontSize: "13px" }}>Utilisateurs</div>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#00d4aa" }}>{data.stats.users}</div>
        </div>
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "16px" }}>
          <div style={{ color: "#888", fontSize: "13px" }}>Adresses surveillees</div>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#00d4aa" }}>{data.stats.addresses}</div>
        </div>
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "16px" }}>
          <div style={{ color: "#888", fontSize: "13px" }}>Alertes envoyees</div>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#00d4aa" }}>{data.stats.alerts}</div>
        </div>
      </div>

      {data.users.map(function(user) {
        return (
          <div key={user.id} style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <h2 style={{ fontWeight: "bold", fontSize: "18px" }}>{user.pseudonym}</h2>
              <span style={{ color: "#666", fontSize: "13px" }}>{user.email}</span>
            </div>

            {user.addresses.map(function(addr) {
              return (
                <div key={addr.id} style={{ marginLeft: "16px", marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #222" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <span style={{ color: addr.isActive ? "#00d4aa" : "#666", fontSize: "20px" }}>{addr.isActive ? "●" : "○"}</span>
                    <span style={{ fontFamily: "monospace", fontSize: "13px" }}>{addr.address.slice(0, 12)}...{addr.address.slice(-8)}</span>
                    {addr.label && <span style={{ color: "#888" }}>({addr.label})</span>}
                    <button
                      onClick={function() { toggleAddress(addr.id) }}
                      style={{ ...btnStyle, backgroundColor: addr.isActive ? "#661111" : "#116633", color: "#fff", marginLeft: "auto" }}
                    >
                      {addr.isActive ? "Desactiver" : "Activer"}
                    </button>
                  </div>

                  <div style={{ marginLeft: "32px" }}>
                    <div style={{ marginBottom: "12px" }}>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Emails destinataires :</label>
                      <div style={{ fontSize: "13px", color: "#ccc", marginBottom: "4px" }}>- {user.email} (principal)</div>
                      {addr.recipients.map(function(r) {
                        return (
                          <div key={r.id} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                            <span style={{ fontSize: "13px", color: "#ccc" }}>- {r.email}</span>
                            <button
                              onClick={function() { removeRecipient(r.id) }}
                              style={{ ...btnStyle, backgroundColor: "#331111", color: "#ff6666", padding: "2px 8px", fontSize: "11px" }}
                            >
                              supprimer
                            </button>
                          </div>
                        )
                      })}
                      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                        <input
                          type="email"
                          placeholder="Ajouter un email..."
                          value={newEmail[addr.id] || ""}
                          onChange={function(e) { setNewEmail({ ...newEmail, [addr.id]: e.target.value }) }}
                          style={{ flex: 1, padding: "6px 10px", backgroundColor: "#0a0a0a", border: "1px solid #333", borderRadius: "4px", color: "#e0e0e0", outline: "none", fontSize: "13px" }}
                        />
                        <button
                          onClick={function() { addRecipient(addr.id) }}
                          style={{ ...btnStyle, backgroundColor: "#00d4aa", color: "#000" }}
                        >
                          Ajouter
                        </button>
                      </div>
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Instructions d urgence :</label>
                      <textarea
                        rows={3}
                        value={editInstructions[addr.id] !== undefined ? editInstructions[addr.id] : addr.instructions}
                        onChange={function(e) { setEditInstructions({ ...editInstructions, [addr.id]: e.target.value }) }}
                        style={{ width: "100%", padding: "8px", backgroundColor: "#0a0a0a", border: "1px solid #333", borderRadius: "4px", color: "#e0e0e0", outline: "none", fontSize: "13px", resize: "vertical", boxSizing: "border-box" }}
                      />
                      <button
                        onClick={function() { saveInstructions(addr.id) }}
                        style={{ ...btnStyle, backgroundColor: "#00d4aa", color: "#000", marginTop: "6px" }}
                      >
                        Sauvegarder les instructions
                      </button>
                    </div>

                    {addr.alerts.length > 0 && (
                      <div>
                        <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Dernieres alertes :</label>
                        {addr.alerts.map(function(alert) {
                          return (
                            <div key={alert.id} style={{ fontSize: "12px", color: "#888", marginBottom: "2px" }}>
                              {alert.amount} {alert.asset} vers {alert.toAddr.slice(0, 8)}... - {new Date(alert.createdAt).toLocaleString("fr-FR")}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}

      {data.users.length === 0 && <p style={{ color: "#666", textAlign: "center" }}>Aucun utilisateur inscrit</p>}
    </div>
  )
}
