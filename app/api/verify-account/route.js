import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'

const page = (title, subtitle, icon, color, showLogin) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wallert — ${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #09090b;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 24px;
    }
    .card { text-align: center; max-width: 420px; width: 100%; }
    .icon {
      width: 64px; height: 64px; border-radius: 50%;
      background: ${color}12; border: 2px solid ${color}30;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 24px; font-size: 28px;
    }
    .logo {
      font-size: 1.5rem; font-weight: 700;
      letter-spacing: 0.08em; color: #fff; margin-bottom: 32px;
    }
    .logo span { color: #00d4aa; }
    h1 { font-size: 1.35rem; font-weight: 700; margin-bottom: 12px; color: ${color}; }
    p { font-size: 0.95rem; color: rgba(255,255,255,0.45); line-height: 1.6; }
    .btn {
      display: inline-block; margin-top: 28px; padding: 14px 40px;
      background: #00b892; color: #fff; border: none; border-radius: 8px;
      font-size: 15px; font-weight: 700; cursor: pointer;
      text-decoration: none; transition: opacity 0.2s;
    }
    .btn:hover { opacity: 0.85; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">Walle<span>r</span>t</div>
    <div class="icon">${icon}</div>
    <h1>${title}</h1>
    <p>${subtitle}</p>
    ${showLogin ? '<a href="/login" class="btn">Log in</a>' : ''}
  </div>
</body>
</html>`

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return new Response(
        page("Invalid link", "This verification link is not valid.", "⚠️", "#f59e0b", false),
        { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
      )
    }

    const user = await prisma.user.findFirst({
      where: { emailVerifyToken: token },
    })

    if (!user) {
      return new Response(
        page("Link expired or invalid", "This verification link has already been used or does not exist.", "⚠️", "#f59e0b", false),
        { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
      )
    }

    if (user.emailVerified) {
      return new Response(
        page("Already verified", "Your email is already verified. You can log in.", "✓", "#00d4aa", true),
        { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
      )
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, emailVerifyToken: null },
    })

    return new Response(
      page("Email verified", "Your account is now active. You can log in.", "✓", "#00d4aa", true),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    )
  } catch (error) {
    console.error("Verify account error:", error)
    return new Response(
      page("Error", "Something went wrong. Please try again.", "✕", "#ef4444", false),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
    )
  }
}
