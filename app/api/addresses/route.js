import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

async function addAddressToAlchemy(address) {
  await fetch("https://dashboard.alchemy.com/api/update-webhook-addresses", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Alchemy-Token": process.env.ALCHEMY_API_KEY,
    },
    body: JSON.stringify({
      webhook_id: "wh_71oaymhjegok01aq",
      addresses_to_add: [address],
      addresses_to_remove: [],
    }),
  })
}

export async function POST(request) {
  try {
    const { userId, address, label, instructions } = await request.json()
    if (!address || !address.match(/^0x[0-9a-fA-F]{40}$/)) {
      return NextResponse.json({ error: 'Adresse Ethereum invalide' }, { status: 400 })
    }
    const watched = await prisma.watchedAddress.create({
      data: { userId, address: address.toLowerCase(), label: label || '', instructions: instructions || '' },
    })
    await addAddressToAlchemy(address.toLowerCase())
    return NextResponse.json({ address: watched }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur: ' + error.message }, { status: 500 })
  }
}
