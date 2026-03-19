# Wallert

**Turn a wallet into a silent alarm.**

Wallert monitors outgoing transactions from a dedicated crypto wallet. If a transfer is made under duress, an alert is instantly sent to your trusted contacts — via email and Telegram — with your emergency instructions.

> Wallert does not prevent attacks or theft. Its purpose is to break the silence as fast as possible.

---

## How it works

1. **Security wallet** — Set aside a credible amount on a dedicated wallet, placed under surveillance.
2. **Trusted circle** — Define your emergency contacts, alert channels (email, Telegram), and instructions.
3. **Silent signal** — Under duress, transfer the funds from this wallet. The alert is triggered instantly.

Alerts are automatically resent every 5 minutes until a recipient confirms they've taken action.

---

## Public instance (wallert.app)

The public instance is free but has beta limits:

| | Limit |
|---|---|
| Monitored wallets | 1 |
| Email channels | Primary + 1 secondary |
| Telegram groups | 1 |
| Reminders (real alert) | 12 (~1 hour) |
| Reminders (test alert) | 3 |

For unlimited usage, self-host your own instance.

---

## Self-hosting

### Prerequisites

- Node.js 18+
- PostgreSQL
- An [Alchemy](https://www.alchemy.com/) account (blockchain monitoring)
- A [Resend](https://resend.com/) account (email delivery)
- A Telegram bot (via [@BotFather](https://t.me/BotFather))

### Installation

```bash
git clone https://github.com/rmdls2b/wallert.git
cd wallert
npm install
```

### Configuration

```bash
cp .env.example .env
```

Required variables:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `ALCHEMY_API_KEY` | Alchemy API key |
| `ALCHEMY_WEBHOOK_ID` | Alchemy webhook ID |
| `ALCHEMY_SIGNING_KEY` | Alchemy webhook signing key (HMAC verification) |
| `RESEND_API_KEY` | Resend API key |
| `ALERT_FROM_EMAIL` | Sender address for alerts |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token |
| `TELEGRAM_WEBHOOK_SECRET` | Secret for Telegram webhook verification |
| `DASHBOARD_PASSWORD` | Admin dashboard password |
| `JWT_SECRET` | Secret key for JWT tokens (`openssl rand -hex 32`) |
| `CRON_SECRET` | Secret key for cron endpoint (`openssl rand -hex 16`) |
| `APP_URL` | Your instance URL (e.g. `https://your-domain.com`) |

### Database

```bash
npx prisma generate
npx prisma db push
```

### Run locally

```bash
npm run build
npm start
```

### Deploy with Podman/Docker

```bash
podman build -t wallert .
podman run -d --name wallert --network host --env-file .env wallert
```

### Alchemy webhook

Set up an Alchemy **Address Activity** webhook pointing to:

```
https://your-domain.com/api/webhook/alchemy
```

Copy the webhook signing key from the Alchemy dashboard and set it as `ALCHEMY_SIGNING_KEY`.

### Telegram webhook

```bash
curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://your-domain.com/api/telegram/webhook&secret_token=<SECRET>"
```

### Recurring alerts cron

```bash
crontab -e
```

```
* * * * * source /path/to/.env && curl -s "http://localhost:3000/api/resend-alerts?key=${CRON_SECRET}" > /dev/null 2>&1
```

The actual resend interval (default: 5 minutes) is controlled by `RESEND_INTERVAL_MS` in the code.

### Removing beta limits

When self-hosting, remove limits by editing:

- `app/api/addresses/route.js` — wallet count check
- `app/api/channels/route.js` — channel count checks
- `app/api/resend-alerts/route.js` — `MAX_RESEND_REAL` and `MAX_RESEND_TEST`

---

## Privacy

For maximum security, we recommend:

- **Anonymous email** for account creation
- **Isolated wallet** with no link to your main holdings
- **Anonymous Telegram group** with pseudonyms

Even in case of a data breach, there is no direct link between Wallert, your identity, and your funds.

---

## Security

**Authentication & access control:**
- JWT authentication on all private API endpoints
- Email verification required at registration and for secondary email channels
- Password policy: minimum 8 characters, uppercase, lowercase, number
- Passwords hashed with bcrypt
- Anti-enumeration on registration
- Password hash excluded from all API responses
- Ownership verification on all resource operations

**Rate limiting & abuse prevention:**
- Rate limiting on login, register, forgot-password, test-alert, delete-account, and admin auth
- Email volume rate limiting per user (30 emails/hour max)
- Cron endpoint protected by secret key

**Webhook security:**
- HMAC signature verification on Alchemy webhooks
- Secret token verification on Telegram webhooks
- Webhook fan-out: all watchers of an address are alerted

**Token security:**
- Cryptographically random tokens (UUID v4) for acknowledge links
- Single-use tokens for Telegram channel linking

**Infrastructure:**
- HTTP/HTTPS restricted to Cloudflare IPs only (direct IP access blocked)
- No hardcoded URLs: APP_URL environment variable for self-hosted instances

**Admin dashboard:**
- Admin cannot acknowledge alerts — only the recipient can via their unique link
- Account deletion by admin triggers a 72-hour delay with email notification to the user
- Self-deletion by the account owner is immediate
- Admin cannot read emergency instructions, secondary contacts, or Telegram chat IDs
- Cross-tenant protection: address deregistration checks for remaining watchers

Found a vulnerability? Open an issue or email [contact@wallert.app](mailto:contact@wallert.app)

---

## Stack

- Next.js 14
- PostgreSQL + Prisma
- Alchemy (blockchain monitoring)
- Resend (email delivery)
- Telegram Bot API
- Podman / Docker

---

## Contributing

Wallert is in beta. Feedback, ideas, and contributions are welcome.

- Open an issue or email [contact@wallert.app](mailto:contact@wallert.app)

---

## License

[MIT](LICENSE)
