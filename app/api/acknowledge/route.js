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
        <div style="text-align:center;"><h1 style="color:#00d4aa;">✓ Déjà confirmé</h1><p>Cette alerte a déjà été prise en charge.</p></div>
      </body></html>`, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } })
    }

    await prisma.alert.update({
      where: { id: alertId },
      data: { acknowledgedAt: new Date(), status: "acknowledged" },
    })

    return new Response(`<html><body style="background:#0a0a0a;color:#e0e0e0;font-family:Arial;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;">
      <div style="text-align:center;"><h1 style="color:#00d4aa;">✓ Alerte confirmée</h1><p>L'alerte a été prise en charge. Les rappels vont s'arrêter.</p></div>
    </body></html>`, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } })
  } catch (error) {
    console.error("Acknowledge error:", error)
    return new Response("Erreur.", { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } })
  }
}
