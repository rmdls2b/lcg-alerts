import { NextResponse } from "next/server"

export async function GET() {
  try {
    const res = await fetch("https://dashboard.alchemy.com/api/update-webhook-addresses", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Alchemy-Token": process.env.ALCHEMY_API_KEY,
      },
      body: JSON.stringify({
        webhook_id: "wh_71oaymhjegok01aq",
        addresses_to_add: ["0x1234567890123456789012345678901234567890"],
        addresses_to_remove: [],
      }),
    })
    const data = await res.json()
    return NextResponse.json({ status: res.status, data })
  } catch (error) {
    return NextResponse.json({ error: error.message })
  }
}
