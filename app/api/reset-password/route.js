import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
const prisma = new PrismaClient()
export async function POST(request) {
  try {
    const { token, password } = await request.json()
    if (!token || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 })
    if (!/[a-zA-Z]/.test(password)) return NextResponse.json({ error: "Password must contain at least one letter." }, { status: 400 })
    if (!/[0-9]/.test(password)) return NextResponse.json({ error: "Password must contain at least one number." }, { status: 400 })
    const reset = await prisma.passwordReset.findUnique({ where: { token }, include: { user: true } })
    if (!reset) return NextResponse.json({ error: "Invalid link" }, { status: 400 })
    if (reset.expiresAt < new Date()) return NextResponse.json({ error: "Link expired" }, { status: 400 })
    const hashed = await bcrypt.hash(password, 10)
    await prisma.user.update({ where: { id: reset.userId }, data: { password: hashed } })
    await prisma.passwordReset.delete({ where: { token } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
