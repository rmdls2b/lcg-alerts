export const dynamic = "force-dynamic"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
  const [totalUsers, totalAddresses, totalAlerts, users] = await Promise.all([
    prisma.user.count(),
    prisma.watchedAddress.count(),
    prisma.alert.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { addresses: true } } },
    }),
  ])
  return NextResponse.json({ totalUsers, totalAddresses, totalAlerts, users })
}
