import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { getUserFromRequest } from "../../../lib/security"

const prisma = new PrismaClient()

async function addAddressToAlchemy(address) {
  await fetch("https://dashboard.alchemy.com/api/update-webhook-addresses", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "X-Alchemy-Token": process.env.ALCHEMY_API_KEY },
    body: JSON.stringify({ webhook_id: process.env.ALCHEMY_WEBHOOK_ID, addresses_to_add: [address], addresses_to_remove: [] }),
  })
}

async function removeAddressFromAlchemy(address) {
  await fetch("https://dashboard.alchemy.com/api/update-webhook-addresses", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "X-Alchemy-Token": process.env.ALCHEMY_API_KEY },
    body: JSON.stringify({ webhook_id: process.env.ALCHEMY_WEBHOOK_ID, addresses_to_add: [], addresses_to_remove: [address] }),
  })
}

export async function POST(request) {
  try {
    const userId = getUserFromRequest(request)
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id } = await request.json()
    const addr = await prisma.watchedAddress.findUnique({ where: { id } })
    if (!addr || addr.userId !== userId) return NextResponse.json({ error: "Not found" }, { status: 404 })

    const updated = await prisma.watchedAddress.update({ where: { id }, data: { isActive: !addr.isActive } })
    if (updated.isActive) { await addAddressToAlchemy(updated.address) }
    else {
      const remaining = await prisma.watchedAddress.count({ where: { address: updated.address, isActive: true } })
      if (remaining === 0) await removeAddressFromAlchemy(updated.address)
    }
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
