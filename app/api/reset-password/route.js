import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const { token, password } = await request.json()
    if (!token || !password || password.length < 8) return NextResponse.json({ error: "Données invalides" }, { status: 400 })
    const reset = await prisma.passwordReset.findUnique({ where: { token }, include: { user: true } })
    if (!reset) return NextResponse.json({ error: "Lien invalide" }, { status: 400 })
    if (reset.expiresAt < new Date()) return NextResponse.json({ error: "Lien expiré" }, { status: 400 })
    const hashed = await bcrypt.hash(password, 10)
    await prisma.user.update({ where: { id: reset.userId }, data: { password: hashed } })
    await prisma.passwordReset.delete({ where: { token } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
