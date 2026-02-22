import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function addAddressToAlchemy(address) {
  const webhookId = "wh_71oaymhjegok01aq"
  const apiKey = process.env.ALCHEMY_API_KEY
  await fetch("https://dashboard.alchemy.com/api/update-webhook-addresses", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Alchemy-Token": apiKey,
    },
    body: JSON.stringify({
      webhook_id: webhookId,
      addresses_to_add: [address],
      addresses_to_remove: [],
    }),
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
    return NextResponse.json({ ok: true, userId: user.id }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
