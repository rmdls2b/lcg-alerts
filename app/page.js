"use client"
import { useState } from "react"

const inputStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#111",
  border: "1px solid #333",
  borderRadius: "6px",
  color: "#e0e0e0",
  outline: "none",
  fontSize: "14px",
  boxSizing: "border-box",
}

const btnStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#00d4aa",
  color: "#000",
  fontWeight: "bold",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
}

export default function Home() {
  const [form, setForm] = useState({ email: "", pseudonym: "", password: "", confirmPassword: "" })
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleRegister(e) {
    e.preventDefault()
    setMessage("")
    if (form.password.length < 8) { setMessage("Mot de passe trop court (8 caractères minimum)"); return }
    if (form.password !== form.confirmPassword) { setMessage("Les mots de passe ne correspondent pas"); return }
    setLoading(true)
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, pseudonym: form.pseudonym, password: form.password }),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) { setDone(true) }
    else { setMessage(data.error || "Erreur") }
  }

  if (done) return (
    <div style={{ maxWidth: "500px", margin: "40px auto", textAlign: "center" }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
      <h2 style={{ fontSize: "18px", color: "#00d4aa", marginBottom: "8px" }}>Compte créé !</h2>
      <p style={{ color: "#888", marginBottom: "24px" }}>Vous pouvez maintenant vous connecter et ajouter vos wallets à surveiller.</p>
      <a href="/login" style={{ display: "inline-block", padding: "12px 24px", background: "#00d4aa", borderRadius: "6px", color: "#000", textDecoration: "none", fontWeight: "bold" }}>
        Se connecter
      </a>
    </div>
  )

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", textAlign: "center", marginBottom: "8px" }}>WalleRt</h1>
      <p style={{ color: "#888", textAlign: "center", marginBottom: "40px" }}>Surveillance blockchain — alertes en temps réel</p>

      {message && (
        <div style={{ background: "#330000", border: "1px solid #ff4444", color: "#ff8888", padding: "12px", borderRadius: "6px", marginBottom: "20px" }}>
          {message}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <h2 style={{ fontSize: "18px", color: "#00d4aa", marginBottom: "16px" }}>Créer un compte</h2>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontSize: "13px", color: "#888", marginBottom: "4px" }}>Email</label>
          <input type="email" required value={form.email} onChange={function(e) { setForm({...form, email: e.target.value}) }} style={inputStyle} placeholder="vous@exemple.com" />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontSize: "13px", color: "#888", marginBottom: "4px" }}>Pseudonyme</label>
          <input type="text" required value={form.pseudonym} onChange={function(e) { setForm({...form, pseudonym: e.target.value}) }} style={inputStyle} placeholder="Votre nom ou pseudo" />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontSize: "13px", color: "#888", marginBottom: "4px" }}>Mot de passe</label>
          <input type="password" required value={form.password} onChange={function(e) { setForm({...form, password: e.target.value}) }} style={inputStyle} placeholder="8 caractères minimum" />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "13px", color: "#888", marginBottom: "4px" }}>Confirmer le mot de passe</label>
          <input type="password" required value={form.confirmPassword} onChange={function(e) { setForm({...form, confirmPassword: e.target.value}) }} style={inputStyle} placeholder="Répétez le mot de passe" />
        </div>
        <button type="submit" style={btnStyle} disabled={loading}>{loading ? "Creation..." : "Créer mon compte"}</button>
        <p style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "#666" }}>
          Déjà inscrit ? <a href="/login" style={{ color: "#00d4aa" }}>Se connecter</a>
        </p>
      </form>
    </div>
  )
}
