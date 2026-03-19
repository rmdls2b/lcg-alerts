export const dynamic = "force-dynamic"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
const prisma = new PrismaClient()

export async function GET(request) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const now = new Date()
  const h24 = new Date(now - 24 * 60 * 60 * 1000)
  const d7 = new Date(now - 7 * 24 * 60 * 60 * 1000)

  const [
    totalUsers,
    totalAddresses,
    totalAlerts,
    totalTestAlerts,
    pendingAlerts,
    alerts24h,
    alerts7d,
    unverifiedUsers,
    registrations7d,
    activeChannels,
    users,
    activeAlerts,
    recentAlerts,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.watchedAddress.count(),
    prisma.alert.count({ where: { isTest: false } }),
    prisma.alert.count({ where: { isTest: true } }),
    prisma.alert.count({ where: { status: "pending", acknowledgedAt: null, isTest: false } }),
    prisma.alert.count({ where: { isTest: false, createdAt: { gte: h24 } } }),
    prisma.alert.count({ where: { isTest: false, createdAt: { gte: d7 } } }),
    prisma.user.count({ where: { emailVerified: false } }),
    prisma.user.count({ where: { createdAt: { gte: d7 } } }),
    prisma.alertChannel.count({ where: { isActive: true } }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        pseudonym: true,
        createdAt: true,
        emailVerified: true,
        recurringAlerts: true,
        deletionRequestedAt: true,
        _count: { select: { addresses: true, channels: true } },
      },
    }),
    prisma.alert.findMany({
      where: { status: "pending", acknowledgedAt: null, isTest: false },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fromAddr: true,
        toAddr: true,
        amount: true,
        asset: true,
        createdAt: true,
        lastSentAt: true,
        resendCount: true,
        address: {
          select: {
            address: true,
            user: { select: { id: true, pseudonym: true } },
          },
        },
      },
    }),
    prisma.alert.findMany({
      where: { isTest: false },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        fromAddr: true,
        amount: true,
        asset: true,
        status: true,
        isTest: true,
        createdAt: true,
        acknowledgedAt: true,
        resendCount: true,
        address: {
          select: {
            user: { select: { id: true, pseudonym: true } },
          },
        },
      },
    }),
  ])

  return NextResponse.json({
    stats: {
      totalUsers,
      totalAddresses,
      totalAlerts,
      totalTestAlerts,
      pendingAlerts,
      alerts24h,
      alerts7d,
      unverifiedUsers,
      registrations7d,
      activeChannels,
    },
    users,
    activeAlerts,
    recentAlerts,
  })
}
