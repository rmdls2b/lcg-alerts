import { PrismaClient } from '@prisma/client'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const payload = await request.json()
    const activities = payload?.event?.activity || []

    for (const tx of activities) {
      const fromAddress = (tx.fromAddress || '').toLowerCase()
      const toAddress = (tx.toAddress || '').toLowerCase()
      const value = tx.value || 0
      const asset = tx.asset || 'ETH'
      const txHash = tx.hash || ''

      const watched = await prisma.watchedAddress.findFirst({
        where: { address: fromAddress, isActive: true },
        include: { user: true },
      })

      if (!watched) continue

      await prisma.alert.create({
        data: { addressId: watched.id, txHash, fromAddr: fromAddress, toAddr: toAddress, amount: String(value), asset, chain: watched.chain },
      })

      const shortFrom = fromAddress.slice(0, 8) + '...' + fromAddress.slice(-6)
      const shortTo = toAddress.slice(0, 8) + '...' + toAddress.slice(-6)
      const explorerUrl = 'https://etherscan.io/tx/' + txHash
      const instructionsHtml = watched.instructions ? '<div style="background:#1a0000;border-left:3px solid #ff4444;padding:15px;margin:20px 0;border-radius:4px;"><strong style="color:#ff4444;">INSTRUCTIONS D URGENCE :</strong><br><br>' + watched.instructions.replace(/\n/g, '<br>') + '</div>' : ''

      await resend.emails.send({
        from: 'Legacy Crypto Guard <' + (process.env.ALERT_FROM_EMAIL || 'onboarding@resend.dev') + '>',
        to: [watched.user.email],
        subject: 'ALERTE - ' + value + ' ' + asset + ' sortant de ' + (watched.label || shortFrom),
        html: '<div style="font-family:Arial;max-width:600px;margin:0 auto;background:#0a0a0a;color:#e0e0e0;border:1px solid #ff4444;border-radius:12px;padding:40px;"><h1 style="color:#ff4444;text-align:center;">ALERTE TRANSACTION</h1><p style="color:#ff8888;text-align:center;">Mouvement sortant detecte</p><table style="width:100%;margin:20px 0;"><tr style="border-bottom:1px solid #333;"><td style="padding:10px;color:#888;">Compte</td><td style="padding:10px;text-align:right;font-weight:bold;">' + (watched.label || shortFrom) + '</td></tr><tr style="border-bottom:1px solid #333;"><td style="padding:10px;color:#888;">Montant</td><td style="padding:10px;text-align:right;color:#ff4444;font-size:20px;font-weight:bold;">' + value + ' ' + asset + '</td></tr><tr style="border-bottom:1px solid #333;"><td style="padding:10px;color:#888;">De</td><td style="padding:10px;text-align:right;font-family:monospace;">' + shortFrom + '</td></tr><tr style="border-bottom:1px solid #333;"><td style="padding:10px;color:#888;">Vers</td><td style="padding:10px;text-align:right;font-family:monospace;">' + shortTo + '</td></tr></table><div style="text-align:center;margin:20px 0;"><a href="' + explorerUrl + '" style="display:inline-block;background:#00d4aa;color:#000;padding:12px 30px;border-radius:6px;text-decoration:none;font-weight:bold;">Voir sur Etherscan</a></div>' + instructionsHtml + '<p style="color:#666;font-size:12px;margin-top:30px;border-top:1px solid #222;padding-top:15px;">Legacy Crypto Guard - Protegez vos actifs crypto</p></div>',
      })
    }
    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ status: 'ok' })
  }
}
