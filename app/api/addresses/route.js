import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

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
    const { userId, address, label } = await request.json()
    if (!address || !address.match(/^0x[0-9a-fA-F]{40}$/)) return NextResponse.json({ error: "Adresse invalide" }, { status: 400 })
    const watched = await prisma.watchedAddress.create({ data: { userId, address: address.toLowerCase(), label: label || "" } })
    await addAddressToAlchemy(address.toLowerCase())
    return NextResponse.json({ address: watched }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const addr = await prisma.watchedAddress.findUnique({ where: { id } })
    await prisma.alert.deleteMany({ where: { addressId: id } })
    await prisma.watchedAddress.delete({ where: { id } })
    await removeAddressFromAlchemy(addr.address)
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
