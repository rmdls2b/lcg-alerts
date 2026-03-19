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
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem("wallert_token", data.token)
      window.location.href = "/my-account"
    } else {
      setError(data.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold text-white mb-2">My account</h1>
            <p className="text-gray-500 text-sm">Log in to access your alerts</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={function(e) { setEmail(e.target.value) }}
              placeholder="Email"
              required
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600"
            />
            <input
              type="password"
              value={password}
              onChange={function(e) { setPassword(e.target.value) }}
              placeholder="Password"
              required
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600"
            />

            {error && (
              <div className="bg-red-500/5 border border-red-500/20 rounded-lg px-4 py-3">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          {"No account yet? "}
          <a href="/register" className="text-[#00d4aa] hover:underline">{"Sign up"}</a>
          {" — "}
          <a href="/mot-de-passe-oublie" className="text-gray-500 hover:text-gray-400 transition-colors">Forgot password</a>
        </p>
      </div>
    </div>
  )
}
