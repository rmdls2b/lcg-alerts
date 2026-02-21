import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        addresses: {
          include: {
            recipients: { orderBy: { createdAt: "asc" } },
            alerts: { orderBy: { createdAt: "desc" }, take: 5 },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    const totalUsers = users.length
    var totalAddresses = 0
    for (var i = 0; i < users.length; i++) {
      totalAddresses = totalAddresses + users[i].addresses.length
    }
    const totalAlerts = await prisma.alert.count()

    return NextResponse.json({
      users: users,
      stats: { users: totalUsers, addresses: totalAddresses, alerts: totalAlerts },
    })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
