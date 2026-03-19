import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { getUserFromRequest } from "../../lib/security"

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

    const { address, label } = await request.json()
    if (!address || !address.match(/^0x[0-9a-fA-F]{40}$/)) return NextResponse.json({ error: "Invalid address" }, { status: 400 })

    const count = await prisma.watchedAddress.count({ where: { userId } })
    if (count >= 1) return NextResponse.json({ error: "Beta limit: 1 monitored wallet maximum. Self-host for unlimited." }, { status: 400 })

    const watched = await prisma.watchedAddress.create({ data: { userId, address: address.toLowerCase(), label: label || "" } })
    await addAddressToAlchemy(address.toLowerCase())
    return NextResponse.json({ address: watched }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error: " + error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const userId = getUserFromRequest(request)
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const addr = await prisma.watchedAddress.findUnique({ where: { id } })
    if (!addr || addr.userId !== userId) return NextResponse.json({ error: "Not found" }, { status: 404 })

    await prisma.alert.deleteMany({ where: { addressId: id } })
    await prisma.watchedAddress.delete({ where: { id } })
    const remaining = await prisma.watchedAddress.count({ where: { address: addr.address, isActive: true } })
    if (remaining === 0) await removeAddressFromAlchemy(addr.address)
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Error: " + error.message }, { status: 500 })
  }
}
