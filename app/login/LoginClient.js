"use client"
import { useState } from "react"

export default function LoginClient() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem("lcg_user", JSON.stringify({ userId: data.userId, pseudonym: data.pseudonym, email: email }))
      window.location.href = "/mon-espace"
    } else {
      setError(data.error)
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>Mon espace</h1>
      <p style={{ color: "#888", marginBottom: "24px", fontSize: "14px" }}>Connectez-vous pour acceder a vos alertes</p>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={function(e) { setEmail(e.target.value) }} placeholder="Email"
          style={{ width: "100%", padding: "12px", backgroundColor: "#111", border: "1px solid #333", borderRadius: "6px", color: "#e0e0e0", outline: "none", marginBottom: "12px", boxSizing: "border-box" }} />
        <input type="password" value={password} onChange={function(e) { setPassword(e.target.value) }} placeholder="Mot de passe"
          style={{ width: "100%", padding: "12px", backgroundColor: "#111", border: "1px solid #333", borderRadius: "6px", color: "#e0e0e0", outline: "none", marginBottom: "12px", boxSizing: "border-box" }} />
        {error && <p style={{ color: "#ff4444", marginBottom: "12px" }}>{error}</p>}
        <button type="submit" disabled={loading}
          style={{ width: "100%", padding: "12px", backgroundColor: "#00d4aa", color: "#000", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
      <p style={{ color: "#666", fontSize: "13px", marginTop: "16px" }}>
        Pas encore de compte ? <a href="/" style={{ color: "#00d4aa" }}>S inscrire</a>
      </p>
    </div>
  )
}
