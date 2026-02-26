import { PrismaClient } from "@prisma/client"
import { Resend } from "resend"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)
const RESEND_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes

export async function GET(request) {
  try {
    const cutoff = new Date(Date.now() - RESEND_INTERVAL_MS)

    const pendingAlerts = await prisma.alert.findMany({
      where: {
       status: "pending",
        acknowledgedAt: null,
        lastSentAt: { lt: cutoff },
        address: { user: { recurringAlerts: true } },
      },
      include: {
        address: {
          include: {
            user: { include: { channels: true } },
          },
        },
      },
    })

    for (const alert of pendingAlerts) {
      const user = alert.address.user
      const shortFrom = alert.fromAddr.slice(0, 8) + "..." + alert.fromAddr.slice(-6)
      const shortTo = alert.toAddr.slice(0, 8) + "..." + alert.toAddr.slice(-6)
      const explorerUrl = "https://etherscan.io/tx/" + alert.txHash
      const ackUrl = "https://lcg-alerts.vercel.app/api/acknowledge?id=" + alert.id

      const instructionsHtml = user.instructions
        ? `<div style="background:#1a0000;border-left:3px solid #ff4444;padding:15px;margin:20px 0;border-radius:4px;"><strong style="color:#ff4444;">INSTRUCTIONS D'URGENCE :</strong><br><br>${user.instructions.replace(/\n/g, "<br>")}</div>`
        : ""

      // Envoi emails
      const emails = [user.email, ...user.channels.filter(c => c.type === "email" && c.isActive).map(c => c.value)]
      await resend.emails.send({
        from: "Wallert <" + (process.env.ALERT_FROM_EMAIL || "onboarding@resend.dev") + ">",
        to: emails,
        subject: `[RAPPEL] Wallert — Signal d'urgence toujours en attente`,
        html: `<div style="font-family:Arial;max-width:600px;margin:0 auto;background:#0a0a0a;color:#e0e0e0;border:1px solid #ff4444;border-radius:12px;padding:40px;">
          <div style="background:#441100;border:1px solid #883300;border-radius:6px;padding:10px;margin-bottom:20px;text-align:center;">
            <span style="color:#ff8800;font-weight:bold;">🔁 RAPPEL — Alerte non confirmée</span>
          </div>
          <h1 style="color:#ff4444;text-align:center;font-size:28px;">ALERTE TRANSACTION</h1>
          <p style="color:#ff8888;text-align:center;margin-bottom:24px;">Mouvement sortant détecté</p>
          <table style="width:100%;margin:20px 0;">
            <tr style="border-bottom:1px solid #333;"><td style="padding:12px;color:#888;">Montant</td><td style="padding:12px;text-align:right;color:#ff4444;font-size:22px;font-weight:bold;">${alert.amount} ${alert.asset}</td></tr>
            <tr style="border-bottom:1px solid #333;"><td style="padding:12px;color:#888;">De</td><td style="padding:12px;text-align:right;font-family:monospace;font-size:13px;">${shortFrom}</td></tr>
            <tr style="border-bottom:1px solid #333;"><td style="padding:12px;color:#888;">Vers</td><td style="padding:12px;text-align:right;font-family:monospace;font-size:13px;">${shortTo}</td></tr>
          </table>
          <div style="text-align:center;margin:24px 0;">
            <a href="${ackUrl}" style="display:inline-block;background:#00d4aa;color:#000;padding:14px 36px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:16px;">✓ J'ai pris en charge cette alerte</a>
          </div>
          ${instructionsHtml}
          <p style="color:#555;font-size:12px;margin-top:30px;border-top:1px solid #222;padding-top:15px;text-align:center;">Ce rappel sera envoyé toutes les 5 minutes tant que personne ne confirme.</p>
        </div>`,
      })

      // Envoi Telegram
      for (const channel of user.channels) {
        if (channel.type === "telegram" && channel.isActive && channel.value) {
          const telegramText = `🔁 <b>[RAPPEL] ALERTE WALLERT</b>\n\nAlerte non confirmée !\n\n Montant : ${alert.amount} ${alert.asset}\n De : <code>${shortFrom}</code>\n Vers : <code>${shortTo}</code>\n\n✅ <a href="${ackUrl}">Confirmer la prise en charge</a>${user.instructions ? "\n\n⚠️ <b>INSTRUCTIONS D'URGENCE :</b>\n" + user.instructions : ""}`
          await sendTelegramMessage(channel.value, telegramText)
        }
      }

      await prisma.alert.update({
        where: { id: alert.id },
        data: { lastSentAt: new Date() },
      })
    }

    return NextResponse.json({ status: "ok", resent: pendingAlerts.length })
  } catch (error) {
    console.error("Resend alerts error:", error)
    return NextResponse.json({ status: "error" }, { status: 500 })
  }
}

async function sendTelegramMessage(chatId, text) {
  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  })
}
