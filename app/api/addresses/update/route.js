import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { getUserFromRequest } from "../../../lib/security"

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const userId = getUserFromRequest(request)
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id, label } = await request.json()
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

    const addr = await prisma.watchedAddress.findUnique({ where: { id } })
    if (!addr || addr.userId !== userId) return NextResponse.json({ error: "Not found" }, { status: 404 })

    const updated = await prisma.watchedAddress.update({ where: { id }, data: { label: label || "" } })
    return NextResponse.json({ address: updated })
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
