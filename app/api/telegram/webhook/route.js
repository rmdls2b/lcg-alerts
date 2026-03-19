import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    // Verify Telegram secret token
    const secretToken = request.headers.get("x-telegram-bot-api-secret-token")
    if (process.env.TELEGRAM_WEBHOOK_SECRET && secretToken !== process.env.TELEGRAM_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await request.json()
    const message = payload?.message
    const myChatMember = payload?.my_chat_member

    // Detection ajout du bot a un groupe
    if (myChatMember) {
      const chat = myChatMember.chat
      const newStatus = myChatMember.new_chat_member?.status
      if ((chat.type === "group" || chat.type === "supergroup") && (newStatus === "member" || newStatus === "administrator")) {
        const chatId = String(chat.id)
        await sendTelegramMessage(chatId, "✅ Wallert Bot added to the group!\n\nTo link this group to your account, copy this identifier and paste it in your dashboard:\n\n<code>" + chatId + "</code>")
        return NextResponse.json({ status: "ok" })
      }
    }

    if (!message) return NextResponse.json({ status: "ok" })

    const chatId = String(message.chat.id)
    const text = message.text || ""

    if (text.startsWith("/start")) {
      const linkToken = text.replace("/start ", "").trim()

      if (linkToken && linkToken !== "/start") {
        // Find channel by linkToken instead of channelId
        const channel = await prisma.alertChannel.findFirst({
          where: { linkToken, type: "telegram", linkTokenUsed: false },
        })

        if (channel) {
          // Single-use: mark token as used and bind the chat
          await prisma.alertChannel.update({
            where: { id: channel.id },
            data: { value: chatId, isActive: true, linkTokenUsed: true, linkToken: null },
          })

          await sendTelegramMessage(chatId, "✅ Wallert alerts activated!\n\nYou will receive a notification here if a transfer is detected on a monitored address.")
          return NextResponse.json({ status: "ok" })
        }
      }

      await sendTelegramMessage(chatId, "Welcome to Wallert Bot.\n\nTo activate alerts, use the link provided by your contact.")
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Telegram webhook error:", error)
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
