import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
const { Resend } = require("resend")

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

async function addAddressToAlchemy(address) {
  await fetch("https://dashboard.alchemy.com/api/update-webhook-addresses", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Alchemy-Token": process.env.ALCHEMY_API_KEY,
    },
    body: JSON.stringify({
      webhook_id: "wh_71oaymhjegok01aq",
      addresses_to_add: [address],
      addresses_to_remove: [],
    }),
  })
}

async function sendWelcomeEmail(email, pseudonym) {
  await resend.emails.send({
    from: process.env.ALERT_FROM_EMAIL,
    to: email,
    subject: "Bienvenue sur LCG Alerts",
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#0a0a0a;color:#e0e0e0;padding:32px;border-radius:8px">
        <h1 style="color:#00d4aa;font-size:22px;margin-bottom:16px">Bienvenue ${pseudonym}</h1>
        <p style="color:#ccc;line-height:1.6">Votre compte LCG Alerts est actif. Vous recevrez un email a chaque mouvement sortant detecte sur vos adresses surveillees.</p>
        <p style="color:#ccc;line-height:1.6;margin-top:16px">En cas de doute ou d urgence, consultez vos instructions d urgence dans votre espace client.</p>
        <div style="margin-top:32px;padding-top:16px;border-top:1px solid #222;font-size:12px;color:#555">
          Legacy Crypto Guard — Surveillance blockchain professionnelle
        </div>
      </div>
    `,
  })
}

export async function POST(request) {
  try {
    const { email, pseudonym, password, address, label, instructions } = await request.json()
    if (!email || !pseudonym || !password || !address) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Mot de passe trop court (8 caracteres minimum)" }, { status: 400 })
    }
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "Email deja utilise" }, { status: 400 })
    }
    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        pseudonym,
        password: hashed,
        addresses: {
          create: {
            address: address.toLowerCase(),
            label: label || "",
            instructions: instructions || "",
          }
        }
      }
    })
    await addAddressToAlchemy(address.toLowerCase())
    await sendWelcomeEmail(email, pseudonym)
    return NextResponse.json({ ok: true, userId: user.id }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
