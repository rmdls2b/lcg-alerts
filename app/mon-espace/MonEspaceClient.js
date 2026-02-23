"use client"
import { useState, useEffect } from "react"

const inputStyle = { flex: 1, padding: "6px 10px", backgroundColor: "#0a0a0a", border: "1px solid #333", borderRadius: "4px", color: "#e0e0e0", outline: "none", fontSize: "13px" }
const btnStyle = { padding: "6px 14px", borderRadius: "4px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }
const BOT_USERNAME = "walleRt_guard_bot"

export default function MonEspaceClient() {
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newEmail, setNewEmail] = useState("")
  const [instructions, setInstructions] = useState("")
  const [instructionsSaved, setInstructionsSaved] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmDeleteAddr, setConfirmDeleteAddr] = useState(null)
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [newAddr, setNewAddr] = useState({ address: "", label: "" })
  const [addingAddr, setAddingAddr] = useState(false)

  useEffect(function() {
    const stored = localStorage.getItem("lcg_user")
    if (!stored) { window.location.href = "/login"; return }
    const u = JSON.parse(stored)
    setUser(u)
    loadData(u.userId)
  }, [])

  async function loadData(userId) {
    const res = await fetch("/api/mon-espace?userId=" + userId)
    if (res.ok) {
      const json = await res.json()
      setData(json)
      setInstructions(json.user ? json.user.instructions : "")
    }
    setLoading(false)
  }

  async function saveInstructions() {
    await fetch("/api/user/update", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.userId, instructions }) })
    setInstructionsSaved(true)
    setTimeout(function() { setInstructionsSaved(false) }, 2000)
  }

  async function addRecipient() {
    if (!newEmail) return
    await fetch("/api/recipients", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.userId, email: newEmail }) })
    setNewEmail("")
    loadData(user.userId)
  }

  async function removeRecipient(id) {
    await fetch("/api/recipients?id=" + id, { method: "DELETE" })
    loadData(user.userId)
  }

  async function toggleAddress(id) {
    await fetch("/api/addresses/toggle", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    loadData(user.userId)
  }

  async function deleteAddress(id) {
    await fetch("/api/addresses?id=" + id, { method: "DELETE" })
    setConfirmDeleteAddr(null)
    loadData(user.userId)
  }

  async function addAddress(e) {
    e.preventDefault()
    setAddingAddr(true)
    const res = await fetch("/api/addresses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.userId, address: newAddr.address, label: newAddr.label }) })
    if (res.ok) { setNewAddr({ address: "", label: "" }); setShowAddAddress(false); loadData(user.userId) }
    setAddingAddr(false)
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

  function copyTelegramLink(recipientId) {
    const link = "https://t.me/" + BOT_USERNAME + "?start=" + recipientId
    navigator.clipboard.writeText(link)
  }

  if (loading) return <p style={{ textAlign: "center", marginTop: "40px" }}>Chargement...</p>
  if (!user || !data) return null

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Bonjour {user.pseudonym}</h1>
        <button onClick={logout} style={{ ...btnStyle, backgroundColor: "#222", border: "1px solid #333", color: "#888" }}>Déconnexion</button>
      </div>

      {/* Wallets surveilles */}
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "20px", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "15px", color: "#00d4aa", marginBottom: "12px" }}>Wallets surveillés</h2>
        {data.addresses.length === 0 && <p style={{ color: "#555", fontSize: "13px", marginBottom: "12px" }}>Aucun wallet surveillé.</p>}
        {data.addresses.map(function(addr) {
          return (
            <div key={addr.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid #1a1a1a" }}>
              <span style={{ color: addr.isActive ? "#00d4aa" : "#444", fontSize: "16px" }}>{addr.isActive ? "●" : "○"}</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: "monospace", fontSize: "12px" }}>{addr.address.slice(0, 14)}...{addr.address.slice(-8)}</span>
                {addr.label && <span style={{ color: "#666", fontSize: "12px", marginLeft: "8px" }}>({addr.label})</span>}
              </div>
              <button onClick={function() { toggleAddress(addr.id) }} style={{ ...btnStyle, backgroundColor: addr.isActive ? "#1a1a00" : "#001a0a", border: "1px solid " + (addr.isActive ? "#444400" : "#004422"), color: addr.isActive ? "#aaaa00" : "#00aa44", fontSize: "11px" }}>
                {addr.isActive ? "Desactiver" : "Activer"}
              </button>
              {confirmDeleteAddr === addr.id ? (
                <div style={{ display: "flex", gap: "4px" }}>
                  <button onClick={function() { deleteAddress(addr.id) }} style={{ ...btnStyle, backgroundColor: "#ff4444", color: "#fff", fontSize: "11px" }}>Confirmer</button>
                  <button onClick={function() { setConfirmDeleteAddr(null) }} style={{ ...btnStyle, backgroundColor: "#333", color: "#ccc", fontSize: "11px" }}>Annuler</button>
                </div>
              ) : (
                <button onClick={function() { setConfirmDeleteAddr(addr.id) }} style={{ ...btnStyle, backgroundColor: "#1a0000", border: "1px solid #440000", color: "#ff4444", fontSize: "11px" }}>Supprimer</button>
              )}
            </div>
          )
        })}
        {!showAddAddress ? (
          <button onClick={function() { setShowAddAddress(true) }} style={{ ...btnStyle, backgroundColor: "transparent", border: "1px solid #00d4aa", color: "#00d4aa", marginTop: "12px" }}>
            + Ajouter un wallet
          </button>
        ) : (
          <form onSubmit={addAddress} style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #222" }}>
            <div style={{ marginBottom: "10px" }}>
              <input type="text" required value={newAddr.address} onChange={function(e) { setNewAddr({ ...newAddr, address: e.target.value }) }}
                style={{ ...inputStyle, width: "100%", fontFamily: "monospace", boxSizing: "border-box" }} placeholder="0x..." />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <input type="text" value={newAddr.label} onChange={function(e) { setNewAddr({ ...newAddr, label: e.target.value }) }}
                style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }} placeholder="Nom du wallet (optionnel)" />
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button type="submit" disabled={addingAddr} style={{ ...btnStyle, backgroundColor: "#00d4aa", color: "#000" }}>{addingAddr ? "Ajout..." : "Ajouter"}</button>
              <button type="button" onClick={function() { setShowAddAddress(false) }} style={{ ...btnStyle, backgroundColor: "#333", color: "#ccc" }}>Annuler</button>
            </div>
          </form>
        )}
      </div>

      {/* Contacts d alerte */}
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "20px", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "15px", color: "#00d4aa", marginBottom: "12px" }}>{"Contacts d'alerte"}</h2>
        <div style={{ fontSize: "13px", color: "#ccc", marginBottom: "8px" }}>— {user.email} (principal)</div>
        {data.recipients.map(function(r) {
          return (
            <div key={r.id} style={{ padding: "8px 0", borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ fontSize: "13px", color: "#ccc" }}>— {r.email}</span>
                <button onClick={function() { removeRecipient(r.id) }} style={{ ...btnStyle, backgroundColor: "#331111", color: "#ff6666", padding: "2px 8px", fontSize: "11px" }}>supprimer</button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "14px" }}>
                {r.telegramChatId ? (
                  <span style={{ fontSize: "11px", color: "#00d4aa" }}>✓ Telegram activé</span>
                ) : (
                  <button onClick={function() { copyTelegramLink(r.id) }} style={{ ...btnStyle, backgroundColor: "#0088cc22", border: "1px solid #0088cc44", color: "#0088cc", padding: "2px 8px", fontSize: "11px" }}>
                    Copier le lien Telegram
                  </button>
                )}
              </div>
            </div>
          )
        })}
        <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
          <input type="email" placeholder="Ajouter un email..." value={newEmail} onChange={function(e) { setNewEmail(e.target.value) }} style={inputStyle} />
          <button onClick={addRecipient} style={{ ...btnStyle, backgroundColor: "#00d4aa", color: "#000" }}>Ajouter</button>
        </div>
      </div>

     {/* Tester l alerte */}
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "20px", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "15px", color: "#00d4aa", marginBottom: "12px" }}>Tester mon alerte</h2>
        <p style={{ color: "#888", fontSize: "13px", marginBottom: "12px" }}>{"Envoyez une fausse alerte pour vérifier que vos contacts reçoivent bien les notifications (email + Telegram)."}</p>
        <button onClick={async function() { await fetch("/api/test-alert", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.userId }) }); alert("Alerte test envoyée !") }} style={{ ...btnStyle, backgroundColor: "#332200", border: "1px solid #665500", color: "#ffaa00" }}>
          Envoyer une alerte test
        </button>
      </div>

      {/* Instructions d urgence */}
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: "8px", padding: "20px", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "15px", color: "#00d4aa", marginBottom: "12px" }}>{"Instructions d'urgence"}</h2>
        <textarea rows={4} value={instructions} onChange={function(e) { setInstructions(e.target.value) }}
          style={{ width: "100%", padding: "8px", backgroundColor: "#0a0a0a", border: "1px solid #333", borderRadius: "4px", color: "#e0e0e0", outline: "none", fontSize: "13px", resize: "vertical", boxSizing: "border-box" }}
          placeholder="Ex: Appeler le 06... Contacter la police..."/>
        <button onClick={saveInstructions} style={{ ...btnStyle, backgroundColor: "#00d4aa", color: "#000", marginTop: "8px" }}>
          {instructionsSaved ? "Sauvegarde !" : "Sauvegarder"}
        </button>
      </div>

      {/* Supprimer le compte */}
      <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid #1a1a1a" }}>
        {!confirmDelete ? (
          <button onClick={function() { setConfirmDelete(true) }} style={{ ...btnStyle, backgroundColor: "#1a0000", border: "1px solid #661111", color: "#ff6666", padding: "10px 20px" }}>
            Supprimer mon compte
          </button>
        ) : (
          <div style={{ background: "#1a0000", border: "1px solid #661111", borderRadius: "8px", padding: "16px" }}>
            <p style={{ color: "#ff8888", marginBottom: "12px" }}>{"Etes-vous sur ? Cette action est irreversible."}</p>
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
