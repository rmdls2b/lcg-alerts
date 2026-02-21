import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const { userId, address, label, instructions } = await request.json()
    if (!address || !address.match(/^0x[0-9a-fA-F]{40}$/)) {
      return NextResponse.json({ error: 'Adresse Ethereum invalide' }, { status: 400 })
    }
    const watched = await prisma.watchedAddress.create({
      data: { userId, address: address.toLowerCase(), label: label || '', instructions: instructions || '' },
    })
    return NextResponse.json({ address: watched }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur: ' + error.message }, { status: 500 })
  }
}
