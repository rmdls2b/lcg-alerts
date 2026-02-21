import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const body = await request.json()
    const email = body.email
    const pseudonym = body.pseudonym

    if (!email || !pseudonym) {
      return NextResponse.json({ error: "Email et pseudonyme requis" }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email: email } })
    if (existing) {
      return NextResponse.json({ user: existing }, { status: 200 })
    }

    const user = await prisma.user.create({
      data: { email: email, pseudonym: pseudonym },
    })
    return NextResponse.json({ user: user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
