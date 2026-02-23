import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const payload = await request.json()
    const message = payload?.message
    const myChatMember = payload?.my_chat_member

    // Detection ajout du bot a un groupe
    if (myChatMember) {
      const chat = myChatMember.chat
      const newStatus = myChatMember.new_chat_member?.status
      if ((chat.type === "group" || chat.type === "supergroup") && (newStatus === "member" || newStatus === "administrator")) {
        const chatId = String(chat.id)
        const groupName = chat.title || "Groupe"
        // Chercher un canal telegram en attente (value vide) pour cet utilisateur
        // On ne peut pas savoir quel user a ajouté le bot, donc on envoie un message dans le groupe
        await sendTelegramMessage(chatId, "✅ WalleRt Bot ajouté au groupe !\n\nPour lier ce groupe à votre compte, copiez cet identifiant et collez-le dans votre dashboard :\n\n<code>" + chatId + "</code>")
        return NextResponse.json({ status: "ok" })
      }
    }

    if (!message) return NextResponse.json({ status: "ok" })

    const chatId = String(message.chat.id)
    const text = message.text || ""

    if (text.startsWith("/start")) {
      const channelId = text.replace("/start ", "").trim()

      if (channelId && channelId !== "/start") {
        const channel = await prisma.alertChannel.findUnique({
          where: { id: channelId },
        })

        if (channel && channel.type === "telegram") {
          await prisma.alertChannel.update({
            where: { id: channelId },
            data: { value: chatId, isActive: true },
          })

          await sendTelegramMessage(chatId, "✅ Alertes WalleRt activées !\n\nVous recevrez une notification ici en cas de mouvement détecté sur une adresse surveillée.")
          return NextResponse.json({ status: "ok" })
        }
      }

      await sendTelegramMessage(chatId, "Bienvenue sur WalleRt Bot.\n\nPour activer les alertes, utilisez le lien fourni par votre contact.")
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
