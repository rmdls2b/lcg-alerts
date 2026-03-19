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
    if (form.password.length < 8) { setMessage("Password too short (8 characters minimum)"); return }
    if (!/[a-z]/.test(form.password)) { setMessage("Password must contain at least one lowercase letter"); return }
    if (!/[A-Z]/.test(form.password)) { setMessage("Password must contain at least one uppercase letter"); return }
    if (!/[0-9]/.test(form.password)) { setMessage("Password must contain at least one number"); return }
    if (form.password !== form.confirmPassword) { setMessage("Passwords do not match"); return }
    setLoading(true)
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, password: form.password }),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) { setDone(true) }
    else { setMessage(data.error || "An error occurred") }
  }

  if (done) return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-6">
      <div className="w-full max-w-[400px] text-center">
        <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
          <div className="text-3xl mb-4">📧</div>
          <h2 className="text-lg font-bold text-[#00d4aa] mb-2">Check your email</h2>
          <p className="text-gray-500 text-sm mb-2">{"We've sent a verification link to your email address."}</p>
          <p className="text-gray-500 text-sm mb-6">Click the link to activate your account, then log in.</p>
          <a href="/login" className="inline-block px-6 py-3 text-[#00d4aa] border border-[#00d4aa]/30 rounded-lg font-bold text-sm hover:bg-[#00d4aa]/5 transition-colors">Go to login</a>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Walle<span className="text-[#00d4aa]">r</span>t</h1>
          <p className="text-gray-500 text-sm">Wallet monitoring. Real-time alert signal.</p>
        </div>

        <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
          <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-6">Create an account</p>

          {message && (
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg px-4 py-3 mb-4">
              <p className="text-red-400 text-sm">{message}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <div>
              <label className="block text-xs text-white mb-1.5">Email</label>
              <input type="email" required value={form.email} onChange={function(e) { setForm({...form, email: e.target.value}) }} placeholder="you@example.com" className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600" />
              <div className="flex items-start gap-2 mt-2 px-3 py-2.5 bg-[#0a1a0f] border-l-2 border-[#00FF85] rounded-r-lg">
                <span className="text-[#00FF85] text-sm mt-0.5 shrink-0">ⓘ</span>
                <p className="text-[#9A9A95] text-xs leading-relaxed">{"For ultimate privacy, use a dedicated, non-personal email address (e.g. randomname@proton.me). Don't link your identity to your Wallert account."}</p>
              </div>
            </div>
            <div>
              <label className="block text-xs text-white mb-1.5">Password</label>
              <input type="password" required value={form.password} onChange={function(e) { setForm({...form, password: e.target.value}) }} placeholder="Min. 8 characters" className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600" />
              <p className="text-gray-600 text-xs mt-1.5">At least 8 characters, one uppercase, one lowercase, one number.</p>
            </div>
            <div>
              <label className="block text-xs text-white mb-1.5">Confirm password</label>
              <input type="password" required value={form.confirmPassword} onChange={function(e) { setForm({...form, confirmPassword: e.target.value}) }} placeholder="Repeat your password" className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors disabled:opacity-50 mt-2">{loading ? "Creating..." : "Create my account"}</button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">{"Already have an account? "}<a href="/login" className="text-[#00d4aa] hover:underline">Log in</a></p>
      </div>
    </div>
  )
}
