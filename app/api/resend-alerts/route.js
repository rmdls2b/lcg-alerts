import { PrismaClient } from "@prisma/client"
import { Resend } from "resend"
import { NextResponse } from "next/server"
import { escapeHtml, checkEmailLimit } from "../../lib/security"

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)
const RESEND_INTERVAL_MS = 4 * 60 * 1000
const MAX_RESEND_REAL = 12
const MAX_RESEND_TEST = 3
const APP_URL = process.env.APP_URL || "https://wallert.app"

function alertEmailHtml({ shortFrom, shortTo, value, asset, explorerUrl, ackUrl, instructionsHtml, badge, testBanner, pseudonymLabel }) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;"><div style="background:#ff4444;padding:20px 32px;text-align:center;"><span style="color:#fff;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;">${badge}</span></div><div style="padding:32px;">${testBanner ? '<div style="background:#fff8e6;border:1px solid #ffe0a0;border-radius:6px;padding:10px;margin-bottom:24px;text-align:center;"><span style="color:#b8860b;font-size:12px;font-weight:bold;">THIS IS A TEST — NOT A REAL ALERT</span></div>' : ''}${pseudonymLabel ? '<p style="color:#333;font-size:16px;text-align:center;font-weight:bold;margin:0 0 8px 0;">Alert from ' + escapeHtml(pseudonymLabel) + '</p>' : ''}<p style="color:#cc0000;font-size:14px;text-align:center;font-weight:bold;margin:0 0 28px 0;">You are receiving this email because you are designated as an emergency contact.</p><div style="background:#fafafa;border:1px solid #eee;border-radius:8px;padding:20px;margin-bottom:24px;"><table style="width:100%;border-collapse:collapse;"><tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Amount</td><td style="padding:8px 0;text-align:right;color:#cc0000;font-size:15px;font-weight:bold;">${value} ${asset}</td></tr><tr><td colspan="2" style="border-bottom:1px solid #eee;"></td></tr><tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">From</td><td style="padding:8px 0;text-align:right;color:#333;font-family:monospace;font-size:12px;">${shortFrom}</td></tr><tr><td colspan="2" style="border-bottom:1px solid #eee;"></td></tr><tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">To</td><td style="padding:8px 0;text-align:right;color:#333;font-family:monospace;font-size:12px;">${shortTo}</td></tr></table>${explorerUrl ? '<div style="text-align:center;margin-top:16px;padding-top:12px;border-top:1px solid #eee;"><a href="' + explorerUrl + '" style="color:#999;font-size:11px;text-decoration:underline;">View on Etherscan</a></div>' : ''}</div>${ackUrl ? '<div style="text-align:center;margin-bottom:8px;"><a href="' + ackUrl + '" style="display:inline-block;background:#00b892;color:#fff;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Confirm receipt</a></div><p style="color:#aaa;font-size:11px;text-align:center;margin:0 0 28px 0;">Alerts resent every 5 min to all emergency contacts until confirmed</p>' : ''}${instructionsHtml}</div><div style="border-top:1px solid #eee;padding:16px 32px;text-align:center;"><p style="color:#ccc;font-size:10px;margin:0;">Wallert</p></div></div>`
}

function instructionsBlock(instructions) {
  if (!instructions) return ""
  return `<div style="border-left:3px solid #cc0000;padding:16px 20px;background:#fff5f5;border-radius:0 6px 6px 0;"><p style="color:#cc0000;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px 0;">Emergency instructions</p><p style="color:#444;font-size:13px;line-height:1.7;margin:0;">${escapeHtml(instructions).replace(/\n/g, "<br>")}</p></div>`
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    if (process.env.CRON_SECRET && searchParams.get("key") !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const cutoff = new Date(Date.now() - RESEND_INTERVAL_MS)

    const pendingAlerts = await prisma.alert.findMany({
      where: {
        status: "pending",
        acknowledgedAt: null,
        lastSentAt: { lt: cutoff },
        address: { user: { recurringAlerts: true } },
        OR: [
          { isTest: false, resendCount: { lt: MAX_RESEND_REAL } },
          { isTest: true, resendCount: { lt: MAX_RESEND_TEST } },
        ],
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
      const pseudonymLabel = user.pseudonym || ""
      const count = alert.resendCount + 1
      const shortFrom = alert.fromAddr.slice(0, 8) + "..." + alert.fromAddr.slice(-6)
      const shortTo = alert.toAddr.slice(0, 8) + "..." + alert.toAddr.slice(-6)
      const explorerUrl = "https://etherscan.io/tx/" + alert.txHash
      const ackUrl = APP_URL + "/api/acknowledge?token=" + alert.ackToken
      const instructionsHtml = instructionsBlock(user.instructions)
      const emailHtml = alertEmailHtml({ shortFrom, shortTo, value: alert.amount, asset: alert.asset, explorerUrl, ackUrl, instructionsHtml, badge: "Reminder #" + count + " &mdash; Alert unconfirmed", testBanner: alert.isTest, pseudonymLabel })
      const subject = pseudonymLabel ? "[REMINDER #" + count + "] Emergency signal from " + escapeHtml(pseudonymLabel) + " still pending" : "[REMINDER #" + count + "] Emergency signal still pending"
      const from = "Wallert <" + (process.env.ALERT_FROM_EMAIL || "onboarding@resend.dev") + ">"

      const emails = [user.email, ...user.channels.filter(c => c.type === "email" && c.isActive && c.verified).map(c => c.value)]
      for (const email of emails) {
        if (!checkEmailLimit(user.id)) { console.log("Email limit reached for user:", user.id); break }
        try {
          const result = await resend.emails.send({ from, to: email, subject, html: emailHtml })
          console.log("Resend OK:", email, JSON.stringify(result))
        } catch (err) {
          console.error("Resend FAIL:", email, err.message)
        }
      }

      for (const channel of user.channels) {
        if (channel.type === "telegram" && channel.isActive && channel.value) {
          const telegramText = pseudonymLabel
            ? `🔁 <b>[REMINDER #${count}] WALLERT ALERT — ${escapeHtml(pseudonymLabel)}</b>\n\nAlert unconfirmed!\n\n Amount: ${alert.amount} ${alert.asset}\n From: <code>${shortFrom}</code>\n To: <code>${shortTo}</code>\n\n✅ <a href="${ackUrl}">Confirm receipt</a>${user.instructions ? "\n\n⚠️ <b>EMERGENCY INSTRUCTIONS:</b>\n" + escapeHtml(user.instructions) : ""}`
            : `🔁 <b>[REMINDER #${count}] WALLERT ALERT</b>\n\nAlert unconfirmed!\n\n Amount: ${alert.amount} ${alert.asset}\n From: <code>${shortFrom}</code>\n To: <code>${shortTo}</code>\n\n✅ <a href="${ackUrl}">Confirm receipt</a>${user.instructions ? "\n\n⚠️ <b>EMERGENCY INSTRUCTIONS:</b>\n" + escapeHtml(user.instructions) : ""}`
          try {
            const tgResult = await sendTelegramMessage(channel.value, telegramText)
            console.log("Telegram OK:", channel.value)
          } catch (err) {
            console.error("Telegram FAIL:", channel.value, err.message)
          }
        }
      }

      await prisma.alert.update({
        where: { id: alert.id },
        data: { lastSentAt: new Date(), resendCount: { increment: 1 } },
      })
    }
// Expire alerts that hit max reminders
    await prisma.alert.updateMany({
      where: {
        status: "pending",
        acknowledgedAt: null,
        OR: [
          { isTest: false, resendCount: { gte: MAX_RESEND_REAL } },
          { isTest: true, resendCount: { gte: MAX_RESEND_TEST } },
        ],
      },
      data: { status: "expired" },
    })

    // Process pending admin deletions (72h delay)
    const deletionCutoff = new Date(Date.now() - 72 * 60 * 60 * 1000)
    const pendingDeletions = await prisma.user.findMany({
      where: { deletionRequestedAt: { lt: deletionCutoff, not: null } },
      include: { addresses: true },
    })
    for (const user of pendingDeletions) {
      for (const addr of user.addresses) {
        const remaining = await prisma.watchedAddress.count({ where: { address: addr.address, isActive: true, NOT: { id: addr.id } } })
        await prisma.alert.deleteMany({ where: { addressId: addr.id } })
        if (remaining === 0) {
          try { await fetch("https://dashboard.alchemy.com/api/update-webhook-addresses", { method: "PATCH", headers: { "Content-Type": "application/json", "X-Alchemy-Token": process.env.ALCHEMY_API_KEY }, body: JSON.stringify({ webhook_id: process.env.ALCHEMY_WEBHOOK_ID, addresses_to_add: [], addresses_to_remove: [addr.address] }) }) } catch {}
        }
      }
      await prisma.watchedAddress.deleteMany({ where: { userId: user.id } })
      await prisma.alertChannel.deleteMany({ where: { userId: user.id } })
      await prisma.passwordReset.deleteMany({ where: { userId: user.id } })
      await prisma.user.delete({ where: { id: user.id } })
      console.log("Deleted user after 72h:", user.id)
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
