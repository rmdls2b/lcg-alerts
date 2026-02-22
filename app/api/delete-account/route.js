import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const { userId } = await request.json()
    if (!userId) {
      return NextResponse.json({ error: "userId requis" }, { status: 400 })
    }
    const addresses = await prisma.watchedAddress.findMany({ where: { userId } })
    for (const addr of addresses) {
      await prisma.alertRecipient.deleteMany({ where: { addressId: addr.id } })
      await prisma.alert.deleteMany({ where: { addressId: addr.id } })
    }
    await prisma.watchedAddress.deleteMany({ where: { userId } })
    await prisma.user.delete({ where: { id: userId } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
