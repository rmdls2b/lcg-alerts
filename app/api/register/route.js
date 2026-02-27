import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { Resend } from "resend"

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) return NextResponse.json({ error: "Champs manquants" }, { status: 400 })
    if (password.length < 8) return NextResponse.json({ error: "Mot de passe trop court (8 caractères minimum)" }, { status: 400 })
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return NextResponse.json({ error: "Email deja utilisé" }, { status: 400 })
    const hashed = await bcrypt.hash(password, 10)
    await prisma.user.create({ data: { email, password: hashed } })

    await resend.emails.send({
      from: "Wallert <" + (process.env.ALERT_FROM_EMAIL || "onboarding@resend.dev") + ">",
      to: email,
      subject: "Bienvenue sur Wallert",
      html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;"><div style="background:#00b892;padding:20px 32px;text-align:center;"><span style="color:#fff;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;">Bienvenue sur Wallert</span></div><div style="padding:32px;"><p style="color:#333;font-size:14px;line-height:1.6;margin:0 0 20px 0;">Votre compte est actif. Connectez-vous pour ajouter vos wallets &agrave; surveiller et configurer vos contacts d'urgence.</p><div style="text-align:center;margin:28px 0;"><a href="https://wallert.app/login" style="display:inline-block;background:#00b892;color:#fff;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Se connecter</a></div></div><div style="border-top:1px solid #eee;padding:16px 32px;text-align:center;"><p style="color:#ccc;font-size:10px;margin:0;">Wallert &mdash; Surveillance blockchain</p></div></div>`,
    })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
