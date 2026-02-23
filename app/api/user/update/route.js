import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const body = await request.json()
    const { userId, instructions, recurringAlerts } = body
    const data = {}
    if (instructions !== undefined) data.instructions = instructions
    if (recurringAlerts !== undefined) data.recurringAlerts = recurringAlerts
    await prisma.user.update({ where: { id: userId }, data })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
