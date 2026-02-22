import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

async function addAddressToAlchemy(address) {
  await fetch("https://dashboard.alchemy.com/api/update-webhook-addresses", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "X-Alchemy-Token": process.env.ALCHEMY_API_KEY },
    body: JSON.stringify({ webhook_id: "wh_71oaymhjegok01aq", addresses_to_add: [address], addresses_to_remove: [] }),
  })
}

async function removeAddressFromAlchemy(address) {
  await fetch("https://dashboard.alchemy.com/api/update-webhook-addresses", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "X-Alchemy-Token": process.env.ALCHEMY_API_KEY },
    body: JSON.stringify({ webhook_id: "wh_71oaymhjegok01aq", addresses_to_add: [], addresses_to_remove: [address] }),
  })
}

export async function POST(request) {
  try {
    const { id } = await request.json()
    const addr = await prisma.watchedAddress.findUnique({ where: { id } })
    const updated = await prisma.watchedAddress.update({ where: { id }, data: { isActive: !addr.isActive } })
    if (updated.isActive) { await addAddressToAlchemy(updated.address) }
    else { await removeAddressFromAlchemy(updated.address) }
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
