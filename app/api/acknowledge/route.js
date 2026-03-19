import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const page = (title, subtitle, icon, color, showButton, ackToken) => `<!DOCTYPE html>
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
    ${showButton ? `<form method="POST" action="/api/acknowledge?token=${ackToken}"><button type="submit" class="btn">Confirm receipt</button></form>` : ''}
  </div>
</body>
</html>`

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const ackToken = searchParams.get("token")
    if (!ackToken) return new Response(
      page("Invalid link", "This link does not match any alert.", "⚠️", "#f59e0b", false, null),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
    )
    const alert = await prisma.alert.findUnique({ where: { ackToken } })
    if (!alert) return new Response(
      page("Alert not found", "This alert does not exist or has been deleted.", "⚠️", "#f59e0b", false, null),
      { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
    )
    if (alert.acknowledgedAt) {
      return new Response(
        page("Already confirmed", "This alert has already been acknowledged. Reminders have been stopped.", "✓", "#00d4aa", false, null),
        { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
      )
    }
    return new Response(
      page("Confirm receipt", "Click the button below to confirm you have received this alert and are taking action.", "🔔", "#f97316", true, ackToken),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    )
  } catch (error) {
    console.error("Acknowledge error:", error)
    return new Response(
      page("Error", "Something went wrong. Please try again.", "✕", "#ef4444", false, null),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
    )
  }
}

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url)
    const ackToken = searchParams.get("token")
    if (!ackToken) return new Response(
      page("Invalid link", "This link does not match any alert.", "⚠️", "#f59e0b", false, null),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
    )
    const alert = await prisma.alert.findUnique({ where: { ackToken } })
    if (!alert) return new Response(
      page("Alert not found", "This alert does not exist or has been deleted.", "⚠️", "#f59e0b", false, null),
      { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
    )
    if (alert.acknowledgedAt) {
      return new Response(
        page("Already confirmed", "This alert has already been acknowledged. Reminders have been stopped.", "✓", "#00d4aa", false, null),
        { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
      )
    }
    await prisma.alert.update({
      where: { ackToken },
      data: { acknowledgedAt: new Date(), status: "acknowledged" },
    })
    return new Response(
      page("Alert confirmed", "Your confirmation has been recorded. Reminders will now stop.", "✓", "#00d4aa", false, null),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    )
  } catch (error) {
    console.error("Acknowledge error:", error)
    return new Response(
      page("Error", "Something went wrong. Please try again.", "✕", "#ef4444", false, null),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
    )
  }
}
