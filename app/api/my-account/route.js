import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { getUserFromRequest } from "../../lib/security"

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    const userId = getUserFromRequest(request)
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: { orderBy: { createdAt: "asc" } },
        channels: { orderBy: { createdAt: "asc" } },
      },
    })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
    const { password, ...safeUser } = user
    return NextResponse.json({ user: safeUser, addresses: user.addresses, channels: user.channels })
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
