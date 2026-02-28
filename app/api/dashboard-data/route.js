export const dynamic = "force-dynamic"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
const prisma = new PrismaClient()

export async function GET(request) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const [totalUsers, totalAddresses, totalAlerts, totalTestAlerts, users] = await Promise.all([
    prisma.user.count(),
    prisma.watchedAddress.count(),
    prisma.alert.count({ where: { isTest: false } }),
    prisma.alert.count({ where: { isTest: true } }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { addresses: true } } },
    }),
  ])
  return NextResponse.json({ totalUsers, totalAddresses, totalAlerts, totalTestAlerts, users })
}
