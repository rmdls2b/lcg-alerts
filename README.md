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

## Self-hosting

### Prerequisites
- Node.js 18+
- PostgreSQL
- An [Alchemy](https://www.alchemy.com/) account (blockchain monitoring)
- A [Resend](https://resend.com/) account (email delivery)
- A Telegram bot (via [@BotFather](https://t.me/BotFather))

### Installation
```bash
git clone https://github.com/rmdls2b/lcg-alerts.git
cd lcg-alerts
npm install
```

### Configuration
Copy the example file and fill in your values:
```bash
cp .env.example .env
```

Required variables:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `ALCHEMY_API_KEY` | Alchemy API key |
| `RESEND_API_KEY` | Resend API key |
| `ALERT_FROM_EMAIL` | Sender address for alerts |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token |
| `DASHBOARD_PASSWORD` | Admin dashboard password |

### Admin dashboard
Access the admin dashboard at `/dashboard`. The password is set via the `DASHBOARD_PASSWORD` environment variable.

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

The app runs on `http://localhost:3000`.

### Deploy with Podman/Docker
```bash
podman build -t wallert .
podman run -d --name wallert -p 3000:3000 --env-file .env wallert
```

### Alchemy webhook
Set up an Alchemy **Address Activity** webhook pointing to:
```
https://your-domain.com/api/webhook/alchemy
```

Add the addresses you want to monitor.

### Recurring alerts cron
To enable recurring alerts, set up a cron job (e.g. [cron-job.org](https://cron-job.org)) that calls every 5 minutes:
```
GET https://your-domain.com/api/resend-alerts
```

---

## Privacy

For maximum security, we recommend:

- **Anonymous email** for account creation
- **Isolated wallet** with no link to your main holdings
- **Anonymous Telegram group** with pseudonyms

Even in case of a data breach, there is no direct link between Wallert, your identity, and your funds.

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
- Open an issue to report a bug or suggest an improvement
- Email [contact@wallert.app](mailto:contact@wallert.app)

---

## License

[MIT](LICENSE)
