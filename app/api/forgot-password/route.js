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
    const resetUrl = "https://wallert.app/reset-password?token=" + token

    await resend.emails.send({
      from: "Wallert <" + (process.env.ALERT_FROM_EMAIL || "onboarding@resend.dev") + ">",
      to: email,
      subject: "Réinitialisation de votre mot de passe Wallert",
      html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;"><div style="background:#00b892;padding:20px 32px;text-align:center;"><span style="color:#fff;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;">R&eacute;initialisation mot de passe</span></div><div style="padding:32px;"><p style="color:#333;font-size:14px;line-height:1.6;margin:0 0 20px 0;">Cliquez sur le bouton ci-dessous pour r&eacute;initialiser votre mot de passe. Ce lien expire dans 1 heure.</p><div style="text-align:center;margin:28px 0;"><a href="${resetUrl}" style="display:inline-block;background:#00b892;color:#fff;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">R&eacute;initialiser mon mot de passe</a></div><p style="color:#999;font-size:12px;margin:20px 0 0 0;">Si vous n'&ecirc;tes pas &agrave; l'origine de cette demande, ignorez cet email.</p></div><div style="border-top:1px solid #eee;padding:16px 32px;text-align:center;"><p style="color:#ccc;font-size:10px;margin:0;">Wallert &mdash; Surveillance blockchain</p></div></div>`,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
