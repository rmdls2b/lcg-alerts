import { PrismaClient } from "@prisma/client"
import { Resend } from "resend"
import { NextResponse } from "next/server"
const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)
export async function POST(request) {
  try {
    const payload = await request.json()
    const activities = payload?.event?.activity || []
    for (const tx of activities) {
      const fromAddress = (tx.fromAddress || "").toLowerCase()
      const toAddress = (tx.toAddress || "").toLowerCase()
      const value = tx.value || 0
      const asset = tx.asset || "ETH"
      const txHash = tx.hash || ""
      const watched = await prisma.watchedAddress.findFirst({
        where: { address: fromAddress, isActive: true },
        include: { user: { include: { channels: true } } },
      })
      if (!watched) continue
      const alert = await prisma.alert.create({
        data: { addressId: watched.id, txHash, fromAddr: fromAddress, toAddr: toAddress, amount: String(value), asset, chain: watched.chain, status: "pending", lastSentAt: new Date() },
      })
      const shortFrom = fromAddress.slice(0, 8) + "..." + fromAddress.slice(-6)
      const shortTo = toAddress.slice(0, 8) + "..." + toAddress.slice(-6)
      const explorerUrl = "https://etherscan.io/tx/" + txHash
      const ackUrl = "https://lcg-alerts.vercel.app/api/acknowledge?id=" + alert.id
      const instructionsHtml = watched.user.instructions
        ? `<div style="background:#1a0000;border-left:3px solid #ff4444;padding:15px;margin:20px 0;border-radius:4px;"><strong style="color:#ff4444;">INSTRUCTIONS D'URGENCE :</strong><br><br>${watched.user.instructions.replace(/\n/g, "<br>")}</div>`
        : ""

      // Envoi emails
      const emails = [watched.user.email, ...watched.user.channels.filter(c => c.type === "email" && c.isActive).map(c => c.value)]
      await resend.emails.send({
        from: "Wallert <" + (process.env.ALERT_FROM_EMAIL || "onboarding@resend.dev") + ">",
        to: emails,
        subject: `Wallert — Signal d'urgence activé : action immédiate requise`,
        html: `<div style="font-family:Arial;max-width:600px;margin:0 auto;background:#0a0a0a;color:#e0e0e0;border:1px solid #ff4444;border-radius:12px;padding:40px;">
          <h1 style="color:#ff4444;text-align:center;font-size:28px;">ALERTE TRANSACTION</h1>
          <p style="color:#ff8888;text-align:center;margin-bottom:24px;">Mouvement sortant détecté</p>
          <p style="color:#888;font-size:13px;text-align:center;margin-bottom:24px;font-style:italic;">Vous recevez cet email car vous êtes désigné comme contact d'urgence.</p>
          <table style="width:100%;margin:20px 0;">
            <tr style="border-bottom:1px solid #333;"><td style="padding:12px;color:#888;">Montant</td><td style="padding:12px;text-align:right;color:#ff4444;font-size:22px;font-weight:bold;">${value} ${asset}</td></tr>
            <tr style="border-bottom:1px solid #333;"><td style="padding:12px;color:#888;">De</td><td style="padding:12px;text-align:right;font-family:monospace;font-size:13px;">${shortFrom}</td></tr>
            <tr style="border-bottom:1px solid #333;"><td style="padding:12px;color:#888;">Vers</td><td style="padding:12px;text-align:right;font-family:monospace;font-size:13px;">${shortTo}</td></tr>
          </table>
          <div style="text-align:center;margin:24px 0;">
            <a href="${explorerUrl}" style="display:inline-block;background:#333;color:#ccc;padding:10px 24px;border-radius:6px;text-decoration:none;font-size:13px;">Voir sur Etherscan</a>
          </div>
          <div style="text-align:center;margin:24px 0;">
            <a href="${ackUrl}" style="display:inline-block;background:#00d4aa;color:#000;padding:14px 36px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:16px;">✓ J'ai pris en charge cette alerte</a>
          </div>
          ${instructionsHtml}
          <p style="color:#555;font-size:12px;margin-top:30px;border-top:1px solid #222;padding-top:15px;text-align:center;">Des rappels seront envoyés toutes les 5 minutes tant que personne ne confirme. — Wallert</p>
        </div>`,
      })

      // Envoi Telegram
      for (const channel of watched.user.channels) {
        if (channel.type === "telegram" && channel.isActive && channel.value) {
          const telegramText = `🚨 <b>ALERTE WALLERT</b>\n\nMouvement sortant détecté !\n\n Montant : ${value} ${asset}\n De : <code>${shortFrom}</code>\n Vers : <code>${shortTo}</code>\n\n🔗 <a href="${explorerUrl}">Voir sur Etherscan</a>\n\n✅ <a href="${ackUrl}">Confirmer la prise en charge</a>${watched.user.instructions ? "\n\n⚠️ <b>INSTRUCTIONS D'URGENCE :</b>\n" + watched.user.instructions : ""}`
          await sendTelegramMessage(channel.value, telegramText)
        }
      }
    }
    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ status: "ok" })
  }
}

async function sendTelegramMessage(chatId, text) {
  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  })
}
