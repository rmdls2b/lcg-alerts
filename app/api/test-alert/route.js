import { PrismaClient } from "@prisma/client"
import { Resend } from "resend"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

function alertEmailHtml({ shortFrom, shortTo, value, asset, explorerUrl, ackUrl, instructionsHtml, badge, testBanner, pseudonymLabel }) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;"><div style="background:#ff4444;padding:20px 32px;text-align:center;"><span style="color:#fff;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;">${badge}</span></div><div style="padding:32px;">${testBanner ? '<div style="background:#fff8e6;border:1px solid #ffe0a0;border-radius:6px;padding:10px;margin-bottom:24px;text-align:center;"><span style="color:#b8860b;font-size:12px;font-weight:bold;">CECI EST UN TEST — PAS UNE VRAIE ALERTE</span></div>' : ''}${pseudonymLabel ? '<p style="color:#333;font-size:16px;text-align:center;font-weight:bold;margin:0 0 8px 0;">Alerte de ' + pseudonymLabel + '</p>' : ''}<p style="color:#cc0000;font-size:14px;text-align:center;font-weight:bold;margin:0 0 28px 0;">Vous recevez cet email car vous &ecirc;tes d&eacute;sign&eacute; comme contact d'urgence.</p><div style="background:#fafafa;border:1px solid #eee;border-radius:8px;padding:20px;margin-bottom:24px;"><table style="width:100%;border-collapse:collapse;"><tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Montant</td><td style="padding:8px 0;text-align:right;color:#cc0000;font-size:15px;font-weight:bold;">${value} ${asset}</td></tr><tr><td colspan="2" style="border-bottom:1px solid #eee;"></td></tr><tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">De</td><td style="padding:8px 0;text-align:right;color:#333;font-family:monospace;font-size:12px;">${shortFrom}</td></tr><tr><td colspan="2" style="border-bottom:1px solid #eee;"></td></tr><tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Vers</td><td style="padding:8px 0;text-align:right;color:#333;font-family:monospace;font-size:12px;">${shortTo}</td></tr></table>${explorerUrl ? '<div style="text-align:center;margin-top:16px;padding-top:12px;border-top:1px solid #eee;"><a href="' + explorerUrl + '" style="color:#999;font-size:11px;text-decoration:underline;">Voir sur Etherscan</a></div>' : ''}</div>${ackUrl ? '<div style="text-align:center;margin-bottom:8px;"><a href="' + ackUrl + '" style="display:inline-block;background:#00b892;color:#fff;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Confirmer la prise en charge</a></div><p style="color:#aaa;font-size:11px;text-align:center;margin:0 0 28px 0;">Rappels envoy&eacute;s toutes les 5 min &agrave; tous les contacts d\'urgence tant que non confirm&eacute;</p>' : ''}${instructionsHtml}</div><div style="border-top:1px solid #eee;padding:16px 32px;text-align:center;"><p style="color:#ccc;font-size:10px;margin:0;">Wallert</p></div></div>`
}

function instructionsBlock(instructions) {
  if (!instructions) return ""
  return `<div style="border-left:3px solid #cc0000;padding:16px 20px;background:#fff5f5;border-radius:0 6px 6px 0;"><p style="color:#cc0000;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px 0;">Instructions d'urgence</p><p style="color:#444;font-size:13px;line-height:1.7;margin:0;">${instructions.replace(/\n/g, "<br>")}</p></div>`
}

export async function POST(request) {
  try {
    const { userId } = await request.json()
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 })

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { channels: true, addresses: true },
    })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const pseudonymLabel = user.pseudonym || ""
    const shortFrom = "0x1a2b3c...d4e5f6"
    const shortTo = "0xaa11bb...cc22dd"
    const value = "0.42"
    const asset = "ETH"

    const firstAddress = user.addresses[0]
    let ackUrl = ""
    if (firstAddress) {
      const alert = await prisma.alert.create({
        data: { addressId: firstAddress.id, txHash: "test_" + Date.now(), fromAddr: "0x1a2b3cd4e5f6", toAddr: "0xaa11bbcc22dd", amount: value, asset, chain: "ethereum", status: "pending", lastSentAt: new Date() },
      })
      ackUrl = "https://wallert.app/api/acknowledge?id=" + alert.id
    }

    const instructionsHtml = instructionsBlock(user.instructions)
    const emailHtml = alertEmailHtml({ shortFrom, shortTo, value, asset, explorerUrl: "", ackUrl, instructionsHtml, badge: "&#9888; Signal d'urgence active", testBanner: true, pseudonymLabel })
    const subject = pseudonymLabel ? "[TEST] Wallert — Signal d'urgence de " + pseudonymLabel + " : action immediate requise" : "[TEST] Wallert — Signal d'urgence active : action immediate requise"
    const from = "Wallert <" + (process.env.ALERT_FROM_EMAIL || "onboarding@resend.dev") + ">"

    const emails = [user.email, ...user.channels.filter(c => c.type === "email" && c.isActive).map(c => c.value)]
    for (const email of emails) {
      await resend.emails.send({ from, to: email, subject, html: emailHtml })
    }

    for (const channel of user.channels) {
      if (channel.type === "telegram" && channel.isActive && channel.value) {
        const telegramText = pseudonymLabel ? `⚠️ <b>[TEST] ALERTE WALLERT — ${pseudonymLabel}</b>\n\nCeci est un TEST — pas une vraie alerte.\n\n Montant : ${value} ${asset}\n De : <code>${shortFrom}</code>\n Vers : <code>${shortTo}</code>${ackUrl ? "\n\n✅ <a href=\"" + ackUrl + "\">Confirmer la prise en charge</a>" : ""}${user.instructions ? "\n\n⚠️ <b>INSTRUCTIONS D'URGENCE :</b>\n" + user.instructions : ""}` : `⚠️ <b>[TEST] ALERTE WALLERT</b>\n\nCeci est un TEST — pas une vraie alerte.\n\n Montant : ${value} ${asset}\n De : <code>${shortFrom}</code>\n Vers : <code>${shortTo}</code>${ackUrl ? "\n\n✅ <a href=\"" + ackUrl + "\">Confirmer la prise en charge</a>" : ""}${user.instructions ? "\n\n⚠️ <b>INSTRUCTIONS D'URGENCE :</b>\n" + user.instructions : ""}`
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
