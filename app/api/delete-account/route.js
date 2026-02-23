import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { Resend } from "resend"

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

async function removeAddressFromAlchemy(address) {
  await fetch("https://dashboard.alchemy.com/api/update-webhook-addresses", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "X-Alchemy-Token": process.env.ALCHEMY_API_KEY },
    body: JSON.stringify({ webhook_id: "wh_71oaymhjegok01aq", addresses_to_add: [], addresses_to_remove: [address] }),
  })
}

export async function POST(request) {
  try {
    const { userId } = await request.json()
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { addresses: true } })
    if (!user) return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    for (const addr of user.addresses) {
      await prisma.alert.deleteMany({ where: { addressId: addr.id } })
      await removeAddressFromAlchemy(addr.address)
    }
    await prisma.watchedAddress.deleteMany({ where: { userId } })
    await prisma.alertRecipient.deleteMany({ where: { userId } })
    await prisma.user.delete({ where: { id: userId } })
    await resend.emails.send({
      from: "Crypto Guard <" + process.env.ALERT_FROM_EMAIL + ">",
      to: user.email,
      subject: "Votre compte Wallert a été supprimé",
      html: `<div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#0a0a0a;color:#e0e0e0;padding:32px;border-radius:8px"><h1 style="color:#e0e0e0;font-size:22px;margin-bottom:16px">Compte supprime</h1><p style="color:#ccc;line-height:1.6">Bonjour ${user.pseudonym}, votre compte et toutes vos adresses ont ete supprimes.</p><div style="margin-top:32px;padding-top:16px;border-top:1px solid #222;font-size:12px;color:#555">Legacy Crypto Guard</div></div>`,
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
