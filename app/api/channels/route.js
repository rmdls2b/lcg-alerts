import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getUserFromRequest } from "../../lib/security"

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)
const APP_URL = process.env.APP_URL || "https://wallert.app"

export async function POST(request) {
  try {
    const userId = getUserFromRequest(request)
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { type, value, label } = await request.json()

    if (type === "email") {
      const emailCount = await prisma.alertChannel.count({ where: { userId, type: "email" } })
      if (emailCount >= 1) return NextResponse.json({ error: "Beta limit: 1 additional email maximum. Self-host for unlimited." }, { status: 400 })
    }

    if (type === "telegram") {
      const tgCount = await prisma.alertChannel.count({ where: { userId, type: "telegram" } })
      if (tgCount >= 1) return NextResponse.json({ error: "Beta limit: 1 Telegram group maximum. Self-host for unlimited." }, { status: 400 })
    }

    const channel = await prisma.alertChannel.create({ data: { userId, type, value, label: label || "" } })

    if (type === "email" && value) {
      const verifyUrl = APP_URL + "/api/verify-email?token=" + channel.verifyToken
      try {
        await resend.emails.send({
          from: "Wallert <" + (process.env.ALERT_FROM_EMAIL || "onboarding@resend.dev") + ">",
          to: value,
          subject: "Verify your email for Wallert alerts",
          html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;"><div style="background:#00b892;padding:20px 32px;text-align:center;"><span style="color:#fff;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;">Email verification</span></div><div style="padding:32px;"><p style="color:#333;font-size:14px;line-height:1.6;margin:0 0 20px 0;">Someone added this email as an emergency alert contact on Wallert. Click below to confirm you accept receiving emergency alerts at this address.</p><div style="text-align:center;margin:28px 0;"><a href="${verifyUrl}" style="display:inline-block;background:#00b892;color:#fff;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Verify this email</a></div><p style="color:#999;font-size:12px;margin:20px 0 0 0;">If you didn't expect this, you can safely ignore this email.</p></div><div style="border-top:1px solid #eee;padding:16px 32px;text-align:center;"><p style="color:#ccc;font-size:10px;margin:0;">Wallert</p></div></div>`,
        })
      } catch (err) {
        console.error("Verification email failed:", err.message)
      }
    }

    return NextResponse.json({ channel }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error: " + error.message }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const userId = getUserFromRequest(request)
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id, isActive } = await request.json()
    const channel = await prisma.alertChannel.findUnique({ where: { id } })
    if (!channel || channel.userId !== userId) return NextResponse.json({ error: "Not found" }, { status: 404 })

    await prisma.alertChannel.update({ where: { id }, data: { isActive } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Error: " + error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const userId = getUserFromRequest(request)
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const channel = await prisma.alertChannel.findUnique({ where: { id } })
    if (!channel || channel.userId !== userId) return NextResponse.json({ error: "Not found" }, { status: 404 })

    await prisma.alertChannel.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Error: " + error.message }, { status: 500 })
  }
}
