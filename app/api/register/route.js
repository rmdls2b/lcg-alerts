import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { Resend } from "resend"
import { createRateLimiter } from "../../lib/security"

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)
const registerLimiter = createRateLimiter(10, 60 * 60 * 1000)
const APP_URL = process.env.APP_URL || "https://wallert.app"

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    if (!registerLimiter.check(ip)) {
      return NextResponse.json({ error: "Too many registration attempts. Please try again later." }, { status: 429 })
    }

    const { email, password } = await request.json()
    if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 })
    if (!/[a-z]/.test(password)) return NextResponse.json({ error: "Password must contain at least one lowercase letter." }, { status: 400 })
    if (!/[A-Z]/.test(password)) return NextResponse.json({ error: "Password must contain at least one uppercase letter." }, { status: 400 })
    if (!/[0-9]/.test(password)) return NextResponse.json({ error: "Password must contain at least one number." }, { status: 400 })

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return NextResponse.json({ ok: true }, { status: 201 })

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({ data: { email, password: hashed, emailVerified: false } })

    const verifyUrl = APP_URL + "/api/verify-account?token=" + user.emailVerifyToken

    await resend.emails.send({
      from: "Wallert <" + (process.env.ALERT_FROM_EMAIL || "onboarding@resend.dev") + ">",
      to: email,
      subject: "Verify your Wallert account",
      html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;"><div style="background:#00b892;padding:20px 32px;text-align:center;"><span style="color:#fff;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;">Verify your email</span></div><div style="padding:32px;"><p style="color:#333;font-size:14px;line-height:1.6;margin:0 0 20px 0;">Click the button below to verify your email and activate your Wallert account.</p><p style="color:#888;font-size:12px;line-height:1.6;margin:0 0 20px 0;">Your support ID: <strong style="font-family:monospace;color:#333;">ID #${String(user.id).slice(-6).toUpperCase()}</strong><br/>Keep it handy in case you need support.</p><div style="text-align:center;margin:28px 0;"><a href="${verifyUrl}" style="display:inline-block;background:#00b892;color:#fff;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Verify my email</a></div><p style="color:#999;font-size:12px;margin:20px 0 0 0;">If you didn't create this account, you can safely ignore this email.</p></div><div style="border-top:1px solid #eee;padding:16px 32px;text-align:center;"><p style="color:#ccc;font-size:10px;margin:0;">Wallert</p></div></div>`,
    })

    return NextResponse.json({ ok: true, verifyEmail: true }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
