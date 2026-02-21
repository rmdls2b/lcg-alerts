import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const { id, instructions, label } = await request.json()
    if (!id) {
      return NextResponse.json({ error: "id requis" }, { status: 400 })
    }
    const data = {}
    if (instructions !== undefined) data.instructions = instructions
    if (label !== undefined) data.label = label
    const updated = await prisma.watchedAddress.update({
      where: { id: id },
      data: data,
    })
    return NextResponse.json({ address: updated })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
