import { PrismaClient } from "@prisma/client"
import { Resend } from "resend"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { userId } = await request.json()
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 })

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { channels: true, addresses: true },
    })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const shortFrom = "0x1a2b3c...d4e5f6"
    const shortTo = "0xaa11bb...cc22dd"
    const value = "0.42"
    const asset = "ETH"

    // Créer une vraie alerte test pour pouvoir tester le acknowledge
    const firstAddress = user.addresses[0]
    let ackUrl = ""
    if (firstAddress) {
      const alert = await prisma.alert.create({
        data: { addressId: firstAddress.id, txHash: "test_" + Date.now(), fromAddr: "0x1a2b3cd4e5f6", toAddr: "0xaa11bbcc22dd", amount: value, asset, chain: "ethereum", status: "pending", lastSentAt: new Date() },
      })
      ackUrl = "https://lcg-alerts.vercel.app/api/acknowledge?id=" + alert.id
    }

    const instructionsHtml = user.instructions
      ? `<div style="background:#1a0000;border-left:3px solid #ff4444;padding:15px;margin:20px 0;border-radius:4px;"><strong style="color:#ff4444;">INSTRUCTIONS D'URGENCE :</strong><br><br>${user.instructions.replace(/\n/g, "<br>")}</div>`
      : ""

    const emails = [user.email, ...user.channels.filter(c => c.type === "email" && c.isActive).map(c => c.value)]

    await resend.emails.send({
      from: "Wallert <" + (process.env.ALERT_FROM_EMAIL || "onboarding@resend.dev") + ">",
      to: emails,
      subject: `[TEST] Wallert — Signal d'urgence activé : action immédiate requise`,
      html: `<div style="font-family:Arial;max-width:600px;margin:0 auto;background:#0a0a0a;color:#e0e0e0;border:1px solid #ff4444;border-radius:12px;padding:40px;">
        <div style="background:#332200;border:1px solid #665500;border-radius:6px;padding:10px;margin-bottom:20px;text-align:center;">
          <span style="color:#ffaa00;font-weight:bold;">⚠️ CECI EST UN TEST — PAS UNE VRAIE ALERTE</span>
        </div>
        <h1 style="color:#ff4444;text-align:center;font-size:28px;">ALERTE TRANSACTION</h1>
        <p style="color:#ff8888;text-align:center;margin-bottom:24px;">Mouvement sortant détecté</p>
        <p style="color:#888;font-size:13px;text-align:center;margin-bottom:24px;font-style:italic;">Vous recevez cet email car vous êtes désigné comme contact d'urgence.</p>
        <table style="width:100%;margin:20px 0;">
          <tr style="border-bottom:1px solid #333;"><td style="padding:12px;color:#888;">Montant</td><td style="padding:12px;text-align:right;color:#ff4444;font-size:22px;font-weight:bold;">${value} ${asset}</td></tr>
          <tr style="border-bottom:1px solid #333;"><td style="padding:12px;color:#888;">De</td><td style="padding:12px;text-align:right;font-family:monospace;font-size:13px;">${shortFrom}</td></tr>
          <tr style="border-bottom:1px solid #333;"><td style="padding:12px;color:#888;">Vers</td><td style="padding:12px;text-align:right;font-family:monospace;font-size:13px;">${shortTo}</td></tr>
        </table>
        ${ackUrl ? `<div style="text-align:center;margin:24px 0;">
          <a href="${ackUrl}" style="display:inline-block;background:#00d4aa;color:#000;padding:14px 36px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:16px;">✓ J'ai pris en charge cette alerte</a>
        </div>` : ""}
        ${instructionsHtml}
        <p style="color:#555;font-size:12px;margin-top:30px;border-top:1px solid #222;padding-top:15px;text-align:center;">Wallert — Protégez vos cryptos</p>
      </div>`,
    })

    // Envoi Telegram
    for (const channel of user.channels) {
      if (channel.type === "telegram" && channel.isActive && channel.value) {
        const telegramText = `⚠️ <b>[TEST] ALERTE WALLERT</b>\n\nCeci est un test — pas une vraie alerte.\n\n Montant : ${value} ${asset}\n De : <code>${shortFrom}</code>\n Vers : <code>${shortTo}</code>${ackUrl ? "\n\n✅ <a href=\"" + ackUrl + "\">Confirmer la prise en charge</a>" : ""}${user.instructions ? "\n\n⚠️ <b>INSTRUCTIONS D'URGENCE :</b>\n" + user.instructions : ""}`
        await sendTelegramMessage(channel.value, telegramText)
      }
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Test alert error:", error)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

async function sendTelegramMessage(chatId, text) {
  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  })
}
