import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const { addressId, email } = await request.json()
    if (!addressId || !email) {
      return NextResponse.json({ error: "addressId et email requis" }, { status: 400 })
    }
    const recipient = await prisma.alertRecipient.create({
      data: { addressId: addressId, email: email },
    })
    return NextResponse.json({ recipient: recipient }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ error: "id requis" }, { status: 400 })
    }
    await prisma.alertRecipient.delete({ where: { id: id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
