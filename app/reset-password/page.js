"use client"
import { useState, useEffect } from "react"

export default function ResetPassword() {
  const [token, setToken] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(function() {
    const params = new URLSearchParams(window.location.search)
    setToken(params.get("token") || "")
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    if (password.length < 8) { setError("Mot de passe trop court (8 caracteres minimum)"); return }
    if (password !== confirm) { setError("Les mots de passe ne correspondent pas"); return }
    setLoading(true)
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) { setDone(true) }
    else { setError(data.error) }
  }

  if (done) return (
    <div style={{ maxWidth: "400px", margin: "80px auto", textAlign: "center" }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
      <h2 style={{ fontSize: "18px", color: "#00d4aa", marginBottom: "8px" }}>Mot de passe modifie</h2>
      <a href="/login" style={{ display: "inline-block", marginTop: "16px", padding: "12px 24px", background: "#00d4aa", borderRadius: "6px", color: "#000", textDecoration: "none", fontWeight: "bold" }}>
        Se connecter
      </a>
    </div>
  )

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "22px", marginBottom: "8px" }}>Nouveau mot de passe</h1>
      <p style={{ color: "#888", marginBottom: "24px", fontSize: "14px" }}>Choisissez un nouveau mot de passe pour votre compte.</p>
      <form onSubmit={handleSubmit}>
        <input type="password" required value={password} onChange={function(e) { setPassword(e.target.value) }} placeholder="Nouveau mot de passe"
          style={{ width: "100%", padding: "12px", backgroundColor: "#111", border: "1px solid #333", borderRadius: "6px", color: "#e0e0e0", outline: "none", marginBottom: "12px", boxSizing: "border-box" }} />
        <input type="password" required value={confirm} onChange={function(e) { setConfirm(e.target.value) }} placeholder="Confirmer le mot de passe"
          style={{ width: "100%", padding: "12px", backgroundColor: "#111", border: "1px solid #333", borderRadius: "6px", color: "#e0e0e0", outline: "none", marginBottom: "12px", boxSizing: "border-box" }} />
        {error && <p style={{ color: "#ff4444", marginBottom: "12px" }}>{error}</p>}
        <button type="submit" disabled={loading}
          style={{ width: "100%", padding: "12px", backgroundColor: "#00d4aa", color: "#000", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
          {loading ? "Modification..." : "Modifier le mot de passe"}
        </button>
      </form>
    </div>
  )
}
