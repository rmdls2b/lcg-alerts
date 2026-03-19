import { NextResponse } from "next/server"
import { createRateLimiter } from "../../lib/security"

const authLimiter = createRateLimiter(5, 15 * 60 * 1000)

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    if (!authLimiter.check(ip)) return NextResponse.json({ error: "Too many attempts" }, { status: 429 })

    const { password } = await request.json()
    if (password === process.env.DASHBOARD_PASSWORD) {
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
