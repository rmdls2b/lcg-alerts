import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: "id requis" }, { status: 400 })
    }
    const current = await prisma.watchedAddress.findUnique({ where: { id: id } })
    if (!current) {
      return NextResponse.json({ error: "Adresse non trouvee" }, { status: 404 })
    }
    const updated = await prisma.watchedAddress.update({
      where: { id: id },
      data: { isActive: !current.isActive },
    })
    return NextResponse.json({ address: updated })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
