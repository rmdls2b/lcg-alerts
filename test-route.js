const { PrismaClient } = require('@prisma/client');
const { Resend } = require('resend');
const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);
async function test() {
  const user = await prisma.user.findFirst({ include: { channels: true, addresses: true } });
  if (!user) { console.log('No user found'); return; }
  console.log('User:', user.email);
  const emails = [user.email, ...user.channels.filter(c => c.type === 'email' && c.isActive).map(c => c.value)];
  console.log('Sending to:', emails);
  const html = '<h1 style="color:red">TEST TEMPLATE COMPLET</h1><p>Montant: 0.42 ETH</p><p>De: 0x1a2b3c...d4e5f6</p>';
  const result = await resend.emails.send({
    from: 'Wallert <' + (process.env.ALERT_FROM_EMAIL || 'onboarding@resend.dev') + '>',
    to: emails,
    subject: '[TEST-DEBUG] Envoi via liste emails',
    html: html
  });
  console.log('Result:', JSON.stringify(result));
}
test().catch(e => console.error(e)).finally(() => prisma.$disconnect());
