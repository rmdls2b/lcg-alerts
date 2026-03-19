import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getUserFromRequest, createRateLimiter } from "../../lib/security"

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)
const deleteLimiter = createRateLimiter(3, 60 * 60 * 1000)
const APP_URL = process.env.APP_URL || "https://wallert.app"

async function removeAddressFromAlchemy(address) {
  await fetch("https://dashboard.alchemy.com/api/update-webhook-addresses", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "X-Alchemy-Token": process.env.ALCHEMY_API_KEY },
    body: JSON.stringify({ webhook_id: process.env.ALCHEMY_WEBHOOK_ID, addresses_to_add: [], addresses_to_remove: [address] }),
  })
}

async function executeDelete(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { addresses: true, channels: true } })
  if (!user) return
  for (const addr of user.addresses) {
    const remaining = await prisma.watchedAddress.count({ where: { address: addr.address, isActive: true, NOT: { id: addr.id } } })
    await prisma.alert.deleteMany({ where: { addressId: addr.id } })
    if (remaining === 0) await removeAddressFromAlchemy(addr.address)
  }
  await prisma.watchedAddress.deleteMany({ where: { userId } })
  await prisma.alertChannel.deleteMany({ where: { userId } })
  await prisma.passwordReset.deleteMany({ where: { userId } })
  await prisma.user.delete({ where: { id: userId } })
  await resend.emails.send({
    from: "Wallert <" + (process.env.ALERT_FROM_EMAIL || "onboarding@resend.dev") + ">",
    to: user.email,
    subject: "Your Wallert account has been deleted",
    html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;"><div style="background:#666;padding:20px 32px;text-align:center;"><span style="color:#fff;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;">Account deleted</span></div><div style="padding:32px;"><p style="color:#333;font-size:14px;line-height:1.6;margin:0 0 20px 0;">Your Wallert account and all your monitored addresses have been deleted.</p><p style="color:#333;font-size:14px;line-height:1.6;margin:0 0 20px 0;">If you didn't initiate this action, please contact us immediately at <a href="mailto:contact@wallert.app">contact@wallert.app</a>.</p></div><div style="border-top:1px solid #eee;padding:16px 32px;text-align:center;"><p style="color:#ccc;font-size:10px;margin:0;">Wallert</p></div></div>`,
  })
}

// POST: request deletion
export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    if (!deleteLimiter.check(ip)) {
      return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 })
    }

    const authHeader = request.headers.get("authorization")
    const isAdmin = authHeader === process.env.DASHBOARD_PASSWORD

    if (isAdmin) {
      // Admin: 72h delayed deletion
      const { userId } = await request.json()
      if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 })

      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

      await prisma.user.update({ where: { id: userId }, data: { deletionRequestedAt: new Date() } })

      // Notify user
      await resend.emails.send({
        from: "Wallert <" + (process.env.ALERT_FROM_EMAIL || "onboarding@resend.dev") + ">",
        to: user.email,
        subject: "Your Wallert account is scheduled for deletion",
        html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;"><div style="background:#f59e0b;padding:20px 32px;text-align:center;"><span style="color:#fff;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;">Account deletion scheduled</span></div><div style="padding:32px;"><p style="color:#333;font-size:14px;line-height:1.6;margin:0 0 20px 0;">Your Wallert account has been scheduled for deletion. It will be permanently deleted in <strong>72 hours</strong>.</p><p style="color:#333;font-size:14px;line-height:1.6;margin:0 0 20px 0;">If you did not request this, please log in immediately to cancel, or contact us at <a href="mailto:contact@wallert.app">contact@wallert.app</a>.</p><div style="text-align:center;margin:28px 0;"><a href="${APP_URL}/login" style="display:inline-block;background:#f59e0b;color:#fff;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Log in to cancel</a></div></div><div style="border-top:1px solid #eee;padding:16px 32px;text-align:center;"><p style="color:#ccc;font-size:10px;margin:0;">Wallert</p></div></div>`,
      })

      return NextResponse.json({ ok: true, delayed: true })
    } else {
      // Self-deletion: immediate
      const userId = getUserFromRequest(request)
      if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      await executeDelete(userId)
      return NextResponse.json({ ok: true })
    }
  } catch (error) {
    console.error("Delete account error:", error)
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}

// PATCH: cancel pending deletion (admin only)
export async function PATCH(request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (authHeader !== process.env.DASHBOARD_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userId } = await request.json()
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 })

    await prisma.user.update({ where: { id: userId }, data: { deletionRequestedAt: null } })

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
