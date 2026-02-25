import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
const prisma = new PrismaClient()

const page = (title, subtitle, icon, color) => `<!DOCTYPE html>
<html lang="fr">
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
    .card {
      text-align: center;
      max-width: 420px;
      width: 100%;
    }
    .icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: ${color}12;
      border: 2px solid ${color}30;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      font-size: 28px;
    }
    .logo {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: rgba(255,255,255,0.2);
      text-transform: uppercase;
      margin-bottom: 32px;
    }
    .logo span { color: #00d4aa; }
    h1 {
      font-size: 1.35rem;
      font-weight: 700;
      margin-bottom: 12px;
      color: ${color};
    }
    p {
      font-size: 0.95rem;
      color: rgba(255,255,255,0.45);
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">Walle<span>r</span>t</div>
    <div class="icon">${icon}</div>
    <h1>${title}</h1>
    <p>${subtitle}</p>
  </div>
</body>
</html>`

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const alertId = searchParams.get("id")

    if (!alertId) return new Response(
      page("Lien invalide", "Ce lien ne correspond à aucune alerte.", "⚠️", "#f59e0b"),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
    )

    const alert = await prisma.alert.findUnique({ where: { id: alertId } })

    if (!alert) return new Response(
      page("Alerte introuvable", "Cette alerte n'existe pas ou a été supprimée.", "⚠️", "#f59e0b"),
      { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
    )

    if (alert.acknowledgedAt) {
      return new Response(
        page("Déjà prise en charge", "Cette alerte a déjà été confirmée. Les rappels sont arrêtés.", "✓", "#00d4aa"),
        { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
      )
    }

    await prisma.alert.update({
      where: { id: alertId },
      data: { acknowledgedAt: new Date(), status: "acknowledged" },
    })

    return new Response(
      page("Alerte prise en charge", "Votre confirmation a été enregistrée. Les rappels vont s'arrêter.", "✓", "#00d4aa"),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    )
  } catch (error) {
    console.error("Acknowledge error:", error)
    return new Response(
      page("Erreur", "Une erreur est survenue. Veuillez réessayer.", "✕", "#ef4444"),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
    )
  }
}



{/*
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const alertId = searchParams.get("id")
    if (!alertId) return new Response("Lien invalide.", { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } })

    const alert = await prisma.alert.findUnique({ where: { id: alertId } })
    if (!alert) return new Response("Alerte introuvable.", { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } })

    if (alert.acknowledgedAt) {
      return new Response(`<html><body style="background:#0a0a0a;color:#e0e0e0;font-family:Arial;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;">
        <div style="text-align:center;"><h1 style="color:#00d4aa;">Déjà confirmé</h1><p>Cette alerte a déjà été prise en charge.</p></div>
      </body></html>`, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } })
    }

    await prisma.alert.update({
      where: { id: alertId },
      data: { acknowledgedAt: new Date(), status: "acknowledged" },
    })

    return new Response(`<html><body style="background:#0a0a0a;color:#e0e0e0;font-family:Arial;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;">
      <div style="text-align:center;"><h1 style="color:#00d4aa;">Alerte confirmée</h1><p>L'alerte a été prise en charge. Les rappels vont s'arrêter.</p></div>
    </body></html>`, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } })
  } catch (error) {
    console.error("Acknowledge error:", error)
    return new Response("Erreur.", { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } })
  }
}
