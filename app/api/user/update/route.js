import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { getUserFromRequest } from "../../../lib/security"

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const userId = getUserFromRequest(request)
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await request.json()
    const { instructions, recurringAlerts, pseudonym } = body
    const data = {}
    if (instructions !== undefined) data.instructions = instructions
    if (recurringAlerts !== undefined) data.recurringAlerts = recurringAlerts
    if (pseudonym !== undefined) data.pseudonym = pseudonym
    await prisma.user.update({ where: { id: userId }, data })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
