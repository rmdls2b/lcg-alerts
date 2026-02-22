import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    if (!userId) return NextResponse.json({ addresses: [] })
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: {
          include: {
            recipients: true,
            alerts: { orderBy: { createdAt: "desc" }, take: 5 },
          },
        },
      },
    })
    if (!user) return NextResponse.json({ addresses: [] })
    return NextResponse.json({ addresses: user.addresses })
  } catch (error) {
    return NextResponse.json({ addresses: [] })
  }
}
