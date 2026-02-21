import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

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
    return NextResponse.json({ ok: true, userId: user.id }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
