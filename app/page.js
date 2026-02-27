"use client"
import { useState } from "react"

export default function Home() {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" })
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleRegister(e) {
    e.preventDefault()
    setMessage("")
    if (form.password.length < 8) { setMessage("Mot de passe trop court (8 caracteres minimum)"); return }
    if (form.password !== form.confirmPassword) { setMessage("Les mots de passe ne correspondent pas"); return }
    setLoading(true)
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, password: form.password }),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) { setDone(true) }
    else { setMessage(data.error || "Erreur") }
  }

  if (done) return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-6">
      <div className="w-full max-w-[400px] text-center">
        <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-lg font-bold text-[#00d4aa] mb-2">Compte cree !</h2>
          <p className="text-gray-500 text-sm mb-6">Vous pouvez maintenant vous connecter et ajouter vos wallets a surveiller.</p>
          <a href="/login" className="inline-block px-6 py-3 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors">Se connecter</a>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Walle<span className="text-[#00d4aa]">r</span>t</h1>
          <p className="text-gray-500 text-sm">Surveillance de wallets — alertes en temps reel</p>
        </div>

        <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
          <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-6">Creer un compte</p>

          {message && (
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg px-4 py-3 mb-4">
              <p className="text-red-400 text-sm">{message}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Email</label>
              <input type="email" required value={form.email} onChange={function(e) { setForm({...form, email: e.target.value}) }} placeholder="vous@exemple.com" className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Mot de passe</label>
              <input type="password" required value={form.password} onChange={function(e) { setForm({...form, password: e.target.value}) }} placeholder="8 caracteres minimum" className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Confirmer le mot de passe</label>
              <input type="password" required value={form.confirmPassword} onChange={function(e) { setForm({...form, confirmPassword: e.target.value}) }} placeholder="Repetez le mot de passe" className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors disabled:opacity-50 mt-2">{loading ? "Creation..." : "Creer mon compte"}</button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">{"Deja inscrit ? "}<a href="/login" className="text-[#00d4aa] hover:underline">Se connecter</a></p>
      </div>
    </div>
  )
}
