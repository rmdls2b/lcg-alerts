import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    if (!userId) return NextResponse.json({ user: null, addresses: [], recipients: [] })
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: { orderBy: { createdAt: "asc" } },
        recipients: { orderBy: { createdAt: "asc" } },
      },
    })
    if (!user) return NextResponse.json({ user: null, addresses: [], recipients: [] })
    return NextResponse.json({ user, addresses: user.addresses, recipients: user.recipients })
  } catch (error) {
    return NextResponse.json({ user: null, addresses: [], recipients: [] })
  }
}
