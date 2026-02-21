import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { password } = await request.json()
    if (password === process.env.DASHBOARD_PASSWORD) {
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 })
  }
}
