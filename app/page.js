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

const labelStyle = {
  display: "block",
  fontSize: "13px",
  color: "#888",
  marginBottom: "4px",
}

export default function Home() {
  const [step, setStep] = useState(1)
  const [userId, setUserId] = useState(null)
  const [form, setForm] = useState({ email: "", pseudonym: "" })
  const [addrForm, setAddrForm] = useState({ address: "", label: "", instructions: "" })
  const [message, setMessage] = useState("")

  async function handleRegister(e) {
    e.preventDefault()
    setMessage("")
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (res.ok) {
      setUserId(data.user.id)
      setStep(2)
    } else {
      setMessage(data.error || "Erreur")
    }
  }

  async function handleAddAddress(e) {
    e.preventDefault()
    setMessage("")
    const res = await fetch("/api/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...addrForm, userId }),
    })
    const data = await res.json()
    if (res.ok) {
      setStep(3)
    } else {
      setMessage(data.error || "Erreur")
    }
  }

  return (
    <div style={{maxWidth: "500px", margin: "40px auto"}}>
      <h1 style={{fontSize: "28px", fontWeight: "bold", textAlign: "center", marginBottom: "8px"}}>
        Surveillance Blockchain
      </h1>
      <p style={{color: "#888", textAlign: "center", marginBottom: "40px"}}>
        Recevez une alerte email a chaque mouvement sortant
      </p>

      {message && (
        <div style={{background: "#330000", border: "1px solid #ff4444", color: "#ff8888", padding: "12px", borderRadius: "6px", marginBottom: "20px"}}>
          {message}
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleRegister}>
          <h2 style={{fontSize: "18px", color: "#00d4aa", marginBottom: "16px"}}>Etape 1 - Inscription</h2>
          <div style={{marginBottom: "12px"}}>
            <label style={labelStyle}>Email</label>
            <input type="email" required value={form.email}
              onChange={function(e) { setForm({...form, email: e.target.value}) }}
              style={inputStyle} placeholder="vous@exemple.com" />
          </div>
          <div style={{marginBottom: "16px"}}>
            <label style={labelStyle}>Pseudonyme</label>
            <input type="text" required value={form.pseudonym}
              onChange={function(e) { setForm({...form, pseudonym: e.target.value}) }}
              style={inputStyle} placeholder="Votre nom ou pseudo" />
          </div>
          <button type="submit" style={btnStyle}>Continuer</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleAddAddress}>
          <h2 style={{fontSize: "18px", color: "#00d4aa", marginBottom: "16px"}}>Etape 2 - Adresse a surveiller</h2>
          <div style={{marginBottom: "12px"}}>
            <label style={labelStyle}>Adresse Ethereum</label>
            <input type="text" required value={addrForm.address}
              onChange={function(e) { setAddrForm({...addrForm, address: e.target.value}) }}
              style={{...inputStyle, fontFamily: "monospace", fontSize: "13px"}} placeholder="0x..." />
          </div>
          <div style={{marginBottom: "12px"}}>
            <label style={labelStyle}>Nom du coffre</label>
            <input type="text" value={addrForm.label}
              onChange={function(e) { setAddrForm({...addrForm, label: e.target.value}) }}
              style={inputStyle} placeholder="Ex: Coffre principal" />
          </div>
          <div style={{marginBottom: "16px"}}>
            <label style={labelStyle}>Instructions d urgence</label>
            <textarea rows={4} value={addrForm.instructions}
              onChange={function(e) { setAddrForm({...addrForm, instructions: e.target.value}) }}
              style={{...inputStyle, resize: "vertical"}}
              placeholder="Ex: Contacter Rem... Ne signer aucune transaction..." />
          </div>
          <button type="submit" style={btnStyle}>Activer la surveillance</button>
        </form>
      )}

      {step === 3 && (
        <div style={{textAlign: "center"}}>
          <div style={{fontSize: "48px", marginBottom: "16px"}}>OK</div>
          <h2 style={{fontSize: "18px", color: "#00d4aa", marginBottom: "8px"}}>Surveillance activee !</h2>
          <p style={{color: "#888", marginBottom: "24px"}}>Vous recevrez un email a chaque mouvement sortant detecte.</p>
          <a href="/dashboard" style={{display: "inline-block", padding: "12px 24px", background: "#222", border: "1px solid #444", borderRadius: "6px", color: "#e0e0e0", textDecoration: "none"}}>
            Voir le dashboard
          </a>
        </div>
      )}
    </div>
  )
}
