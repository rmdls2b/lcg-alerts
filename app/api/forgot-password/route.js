import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { Resend } from "resend"
import crypto from "crypto"

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { email } = await request.json()
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ ok: true })
    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60)
    await prisma.passwordReset.create({ data: { userId: user.id, token, expiresAt } })
    const resetUrl = "https://lcg-alerts.vercel.app/reset-password?token=" + token
    await resend.emails.send({
      from: "Legacy Crypto Guard <" + process.env.ALERT_FROM_EMAIL + ">",
      to: email,
      subject: "Reinitialisation de votre mot de passe",
      html: `<div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#0a0a0a;color:#e0e0e0;padding:32px;border-radius:8px"><h1 style="color:#00d4aa;font-size:22px;margin-bottom:16px">Mot de passe oublie</h1><p style="color:#ccc;line-height:1.6">Cliquez sur le lien ci-dessous pour reinitialiser votre mot de passe. Ce lien expire dans 1 heure.</p><a href="${resetUrl}" style="display:inline-block;margin-top:24px;padding:12px 24px;background:#00d4aa;color:#000;border-radius:6px;text-decoration:none;font-weight:bold">Reinitialiser mon mot de passe</a><p style="color:#555;font-size:12px;margin-top:24px">Si vous n etes pas a l origine de cette demande, ignorez cet email.</p></div>`,
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
