import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    if (!userId) {
      return NextResponse.json({ error: "userId requis" }, { status: 400 })
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: {
          include: {
            alerts: { orderBy: { createdAt: "desc" }, take: 5 },
          },
        },
      },
    })
    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouve" }, { status: 404 })
    }
    return NextResponse.json({ addresses: user.addresses })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
