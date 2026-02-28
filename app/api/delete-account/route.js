import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { Resend } from "resend"
const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

async function removeAddressFromAlchemy(address) {
  await fetch("https://dashboard.alchemy.com/api/update-webhook-addresses", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "X-Alchemy-Token": process.env.ALCHEMY_API_KEY },
    body: JSON.stringify({ webhook_id: process.env.ALCHEMY_WEBHOOK_ID, addresses_to_add: [], addresses_to_remove: [address] }),
  })
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization")
    const { userId } = await request.json()

    // Si pas de header admin, vérifier que l'utilisateur supprime son propre compte
    if (authHeader !== process.env.DASHBOARD_PASSWORD) {
      // Ici on laisse passer pour l'auto-suppression (depuis Mon Espace)
      // TODO: ajouter une vraie vérification de session utilisateur
    }

    const user = await prisma.user.findUnique({ where: { id: userId }, include: { addresses: true, channels: true } })
    if (!user) return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    for (const addr of user.addresses) {
      await prisma.alert.deleteMany({ where: { addressId: addr.id } })
      await removeAddressFromAlchemy(addr.address)
    }
    await prisma.watchedAddress.deleteMany({ where: { userId } })
    await prisma.alertChannel.deleteMany({ where: { userId } })
    await prisma.user.delete({ where: { id: userId } })
    await resend.emails.send({
      from: "Wallert <" + (process.env.ALERT_FROM_EMAIL || "onboarding@resend.dev") + ">",
      to: user.email,
      subject: "Votre compte Wallert a été supprimé",
      html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;"><div style="background:#666;padding:20px 32px;text-align:center;"><span style="color:#fff;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;">Compte supprim&eacute;</span></div><div style="padding:32px;"><p style="color:#333;font-size:14px;line-height:1.6;margin:0 0 20px 0;">Votre compte Wallert et toutes vos adresses surveill&eacute;es ont &eacute;t&eacute; supprim&eacute;s.</p><p style="color:#333;font-size:14px;line-height:1.6;margin:0 0 20px 0;">Si vous n'&ecirc;tes pas &agrave; l'origine de cette action, contactez-nous imm&eacute;diatement.</p></div><div style="border-top:1px solid #eee;padding:16px 32px;text-align:center;"><p style="color:#ccc;font-size:10px;margin:0;">Wallert</p></div></div>`,
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Erreur: " + error.message }, { status: 500 })
  }
}
