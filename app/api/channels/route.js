import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const { userId, type, value, label } = await request.json()
    const channel = await prisma.alertChannel.create({ data: { userId, type, value, label: label || "" } })
    return NextResponse.json({ channel }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const { id, isActive } = await request.json()
    await prisma.alertChannel.update({ where: { id }, data: { isActive } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    await prisma.alertChannel.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
