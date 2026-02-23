"use client"
import { useState } from "react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
    setLoading(false)
    setSent(true)
  }

  if (sent) return (
    <div style={{ maxWidth: "400px", margin: "80px auto", textAlign: "center" }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
      <h2 style={{ fontSize: "18px", color: "#00d4aa", marginBottom: "8px" }}>Email envoyé</h2>
      <p style={{ color: "#888" }}>Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.</p>
    </div>
  )

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "22px", marginBottom: "8px" }}>Mot de passe oublié</h1>
      <p style={{ color: "#888", marginBottom: "24px", fontSize: "14px" }}>Entrez votre email pour recevoir un lien de réinitialisation.</p>
      <form onSubmit={handleSubmit}>
        <input type="email" required value={email} onChange={function(e) { setEmail(e.target.value) }} placeholder="votre@email.com"
          style={{ width: "100%", padding: "12px", backgroundColor: "#111", border: "1px solid #333", borderRadius: "6px", color: "#e0e0e0", outline: "none", marginBottom: "12px", boxSizing: "border-box" }} />
        <button type="submit" disabled={loading}
          style={{ width: "100%", padding: "12px", backgroundColor: "#00d4aa", color: "#000", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
          {loading ? "Envoi..." : "Envoyer le lien"}
        </button>
      </form>
      <p style={{ color: "#666", fontSize: "13px", marginTop: "16px" }}>
        <a href="/login" style={{ color: "#00d4aa" }}>Retour à la connexion</a>
      </p>
    </div>
  )
}
