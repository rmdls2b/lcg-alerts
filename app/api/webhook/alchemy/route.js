import { PrismaClient } from "@prisma/client"
import { Resend } from "resend"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

function alertEmailHtml({ shortFrom, shortTo, value, asset, explorerUrl, ackUrl, instructionsHtml, badge, testBanner, pseudonymLabel }) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;"><div style="background:#ff4444;padding:20px 32px;text-align:center;"><span style="color:#fff;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;">${badge}</span></div><div style="padding:32px;">${testBanner ? '<div style="background:#fff8e6;border:1px solid #ffe0a0;border-radius:6px;padding:10px;margin-bottom:24px;text-align:center;"><span style="color:#b8860b;font-size:12px;font-weight:bold;">THIS IS A TEST — NOT A REAL ALERT</span></div>' : ''}${pseudonymLabel ? '<p style="color:#333;font-size:16px;text-align:center;font-weight:bold;margin:0 0 8px 0;">Alert from ' + pseudonymLabel + '</p>' : ''}<p style="color:#cc0000;font-size:14px;text-align:center;font-weight:bold;margin:0 0 28px 0;">You are receiving this email because you are designated as an emergency contact.</p><div style="background:#fafafa;border:1px solid #eee;border-radius:8px;padding:20px;margin-bottom:24px;"><table style="width:100%;border-collapse:collapse;"><tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Amount</td><td style="padding:8px 0;text-align:right;color:#cc0000;font-size:15px;font-weight:bold;">${value} ${asset}</td></tr><tr><td colspan="2" style="border-bottom:1px solid #eee;"></td></tr><tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">From</td><td style="padding:8px 0;text-align:right;color:#333;font-family:monospace;font-size:12px;">${shortFrom}</td></tr><tr><td colspan="2" style="border-bottom:1px solid #eee;"></td></tr><tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">To</td><td style="padding:8px 0;text-align:right;color:#333;font-family:monospace;font-size:12px;">${shortTo}</td></tr></table>${explorerUrl ? '<div style="text-align:center;margin-top:16px;padding-top:12px;border-top:1px solid #eee;"><a href="' + explorerUrl + '" style="color:#999;font-size:11px;text-decoration:underline;">View on Etherscan</a></div>' : ''}</div>${ackUrl ? '<div style="text-align:center;margin-bottom:8px;"><a href="' + ackUrl + '" style="display:inline-block;background:#00b892;color:#fff;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Confirm receipt</a></div><p style="color:#aaa;font-size:11px;text-align:center;margin:0 0 28px 0;">Alerts resent every 5 min to all emergency contacts until confirmed</p>' : ''}${instructionsHtml}</div><div style="border-top:1px solid #eee;padding:16px 32px;text-align:center;"><p style="color:#ccc;font-size:10px;margin:0;">Wallert</p></div></div>`
}

function instructionsBlock(instructions) {
  if (!instructions) return ""
  return `<div style="border-left:3px solid #cc0000;padding:16px 20px;background:#fff5f5;border-radius:0 6px 6px 0;"><p style="color:#cc0000;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px 0;">Emergency instructions</p><p style="color:#444;font-size:13px;line-height:1.7;margin:0;">${instructions.replace(/\n/g, "<br>")}</p></div>`
}

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

      const pseudonymLabel = watched.user.pseudonym || ""
      const shortFrom = fromAddress.slice(0, 8) + "..." + fromAddress.slice(-6)
      const shortTo = toAddress.slice(0, 8) + "..." + toAddress.slice(-6)
      const explorerUrl = "https://etherscan.io/tx/" + txHash
      const ackUrl = "https://wallert.app/api/acknowledge?id=" + alert.id
      const instructionsHtml = instructionsBlock(watched.user.instructions)
      const emailHtml = alertEmailHtml({ shortFrom, shortTo, value, asset, explorerUrl, ackUrl, instructionsHtml, badge: "&#9888; Emergency signal activated", testBanner: false, pseudonymLabel })
      const subject = pseudonymLabel ? "Wallert — Emergency signal from " + pseudonymLabel + ": immediate action required" : "Wallert — Emergency signal activated: immediate action required"
      const from = "Wallert <" + (process.env.ALERT_FROM_EMAIL || "onboarding@resend.dev") + ">"

      const emails = [watched.user.email, ...watched.user.channels.filter(c => c.type === "email" && c.isActive).map(c => c.value)]
      for (const email of emails) {
        await resend.emails.send({ from, to: email, subject, html: emailHtml })
      }

      for (const channel of watched.user.channels) {
        if (channel.type === "telegram" && channel.isActive && channel.value) {
          const telegramText = pseudonymLabel
            ? `🚨 <b>WALLERT ALERT — ${pseudonymLabel}</b>\n\nOutgoing transfer detected!\n\n Amount: ${value} ${asset}\n From: <code>${shortFrom}</code>\n To: <code>${shortTo}</code>\n\n🔗 <a href="${explorerUrl}">View on Etherscan</a>\n\n✅ <a href="${ackUrl}">Confirm receipt</a>${watched.user.instructions ? "\n\n⚠️ <b>EMERGENCY INSTRUCTIONS:</b>\n" + watched.user.instructions : ""}`
            : `🚨 <b>WALLERT ALERT</b>\n\nOutgoing transfer detected!\n\n Amount: ${value} ${asset}\n From: <code>${shortFrom}</code>\n To: <code>${shortTo}</code>\n\n🔗 <a href="${explorerUrl}">View on Etherscan</a>\n\n✅ <a href="${ackUrl}">Confirm receipt</a>${watched.user.instructions ? "\n\n⚠️ <b>EMERGENCY INSTRUCTIONS:</b>\n" + watched.user.instructions : ""}`
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
