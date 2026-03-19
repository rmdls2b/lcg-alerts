import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createRateLimiter, signToken } from "../../lib/security"

const prisma = new PrismaClient()
const loginLimiter = createRateLimiter(5, 15 * 60 * 1000)

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    if (!loginLimiter.check(ip)) {
      return NextResponse.json({ error: "Too many login attempts. Please try again later." }, { status: 429 })
    }

    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: "Incorrect email or password" }, { status: 401 })
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return NextResponse.json({ error: "Incorrect email or password" }, { status: 401 })
    }
    if (!user.emailVerified) {
      return NextResponse.json({ error: "Please verify your email before logging in. Check your inbox." }, { status: 403 })
    }
    const token = signToken(user.id)
    return NextResponse.json({ ok: true, token })
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
