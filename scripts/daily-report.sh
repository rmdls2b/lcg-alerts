#!/bin/bash
# Wallert daily report — sends a summary email via Resend API
# Cron: 0 8 * * * /root/wallert/scripts/daily-report.sh

set -e

# Load env
export $(grep -v '^#' /root/wallert/.env | xargs)

REPORT_EMAIL="${REPORT_EMAIL}"
RESEND_KEY="$RESEND_API_KEY"
FROM_EMAIL="Wallert <${ALERT_FROM_EMAIL}>"
PG_PASS=$(echo "$DATABASE_URL" | sed 's/.*wallert:\(.*\)@localhost.*/\1/')

# Query stats
TOTAL_USERS=$(PGPASSWORD="$PG_PASS" psql -U wallert -h localhost -d wallert -t -A -c "SELECT COUNT(*) FROM \"User\";")
NEW_USERS_24H=$(PGPASSWORD="$PG_PASS" psql -U wallert -h localhost -d wallert -t -A -c "SELECT COUNT(*) FROM \"User\" WHERE \"createdAt\" > NOW() - INTERVAL '24 hours';")
TOTAL_ALERTS=$(PGPASSWORD="$PG_PASS" psql -U wallert -h localhost -d wallert -t -A -c "SELECT COUNT(*) FROM \"Alert\" WHERE \"isTest\" = false;")
TOTAL_TEST_ALERTS=$(PGPASSWORD="$PG_PASS" psql -U wallert -h localhost -d wallert -t -A -c "SELECT COUNT(*) FROM \"Alert\" WHERE \"isTest\" = true;")
ALERTS_24H=$(PGPASSWORD="$PG_PASS" psql -U wallert -h localhost -d wallert -t -A -c "SELECT COUNT(*) FROM \"Alert\" WHERE \"createdAt\" > NOW() - INTERVAL '24 hours' AND \"isTest\" = false;")
TEST_ALERTS_24H=$(PGPASSWORD="$PG_PASS" psql -U wallert -h localhost -d wallert -t -A -c "SELECT COUNT(*) FROM \"Alert\" WHERE \"createdAt\" > NOW() - INTERVAL '24 hours' AND \"isTest\" = true;")
PENDING_ALERTS=$(PGPASSWORD="$PG_PASS" psql -U wallert -h localhost -d wallert -t -A -c "SELECT COUNT(*) FROM \"Alert\" WHERE status = 'pending';")
ACK_24H=$(PGPASSWORD="$PG_PASS" psql -U wallert -h localhost -d wallert -t -A -c "SELECT COUNT(*) FROM \"Alert\" WHERE \"acknowledgedAt\" > NOW() - INTERVAL '24 hours';")
TOTAL_ADDRESSES=$(PGPASSWORD="$PG_PASS" psql -U wallert -h localhost -d wallert -t -A -c "SELECT COUNT(*) FROM \"WatchedAddress\";")
TOTAL_CHANNELS=$(PGPASSWORD="$PG_PASS" psql -U wallert -h localhost -d wallert -t -A -c "SELECT COUNT(*) FROM \"AlertChannel\";")
DISK_USAGE=$(df -h / | awk 'NR==2 {print $3 "/" $2 " (" $5 ")"}')
CONTAINER_STATUS=$(podman ps --filter name=wallert --format "{{.Status}}" 2>/dev/null || echo "unknown")
DATE=$(date +"%Y-%m-%d %H:%M UTC")

# Build HTML
HTML="<div style=\"font-family:Arial,sans-serif;max-width:520px;margin:0 auto;background:#fff;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;\"><div style=\"background:#111;padding:20px 32px;text-align:center;\"><span style=\"color:#00d4aa;font-size:14px;font-weight:bold;\">Wallert Daily Report</span></div><div style=\"padding:24px 32px;\"><p style=\"color:#888;font-size:12px;margin:0 0 20px 0;\">${DATE}</p><table style=\"width:100%;border-collapse:collapse;\"><tr><td style=\"padding:8px 0;color:#333;font-size:13px;border-bottom:1px solid #eee;\">Total users</td><td style=\"padding:8px 0;text-align:right;font-weight:bold;color:#333;font-size:13px;border-bottom:1px solid #eee;\">${TOTAL_USERS}</td></tr><tr><td style=\"padding:8px 0;color:#333;font-size:13px;border-bottom:1px solid #eee;\">New users (24h)</td><td style=\"padding:8px 0;text-align:right;font-weight:bold;color:#00d4aa;font-size:13px;border-bottom:1px solid #eee;\">${NEW_USERS_24H}</td></tr><tr><td style=\"padding:8px 0;color:#333;font-size:13px;border-bottom:1px solid #eee;\">Monitored wallets</td><td style=\"padding:8px 0;text-align:right;font-weight:bold;color:#333;font-size:13px;border-bottom:1px solid #eee;\">${TOTAL_ADDRESSES}</td></tr><tr><td style=\"padding:8px 0;color:#333;font-size:13px;border-bottom:1px solid #eee;\">Alert channels</td><td style=\"padding:8px 0;text-align:right;font-weight:bold;color:#333;font-size:13px;border-bottom:1px solid #eee;\">${TOTAL_CHANNELS}</td></tr><tr><td colspan=\"2\" style=\"padding:12px 0 4px 0;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px;\">Alerts (last 24h)</td></tr><tr><td style=\"padding:8px 0;color:#333;font-size:13px;border-bottom:1px solid #eee;\">Real alerts</td><td style=\"padding:8px 0;text-align:right;font-weight:bold;color:#cc0000;font-size:13px;border-bottom:1px solid #eee;\">${ALERTS_24H}</td></tr><tr><td style=\"padding:8px 0;color:#333;font-size:13px;border-bottom:1px solid #eee;\">Test alerts</td><td style=\"padding:8px 0;text-align:right;font-weight:bold;color:#b8860b;font-size:13px;border-bottom:1px solid #eee;\">${TEST_ALERTS_24H}</td></tr><tr><td style=\"padding:8px 0;color:#333;font-size:13px;border-bottom:1px solid #eee;\">Acknowledged</td><td style=\"padding:8px 0;text-align:right;font-weight:bold;color:#00b892;font-size:13px;border-bottom:1px solid #eee;\">${ACK_24H}</td></tr><tr><td style=\"padding:8px 0;color:#333;font-size:13px;border-bottom:1px solid #eee;\">Still pending</td><td style=\"padding:8px 0;text-align:right;font-weight:bold;color:${PENDING_ALERTS:-0};font-size:13px;border-bottom:1px solid #eee;\">${PENDING_ALERTS}</td></tr><tr><td colspan=\"2\" style=\"padding:12px 0 4px 0;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px;\">Totals</td></tr><tr><td style=\"padding:8px 0;color:#333;font-size:13px;border-bottom:1px solid #eee;\">Total real alerts</td><td style=\"padding:8px 0;text-align:right;font-weight:bold;color:#333;font-size:13px;border-bottom:1px solid #eee;\">${TOTAL_ALERTS}</td></tr><tr><td style=\"padding:8px 0;color:#333;font-size:13px;border-bottom:1px solid #eee;\">Total test alerts</td><td style=\"padding:8px 0;text-align:right;font-weight:bold;color:#333;font-size:13px;border-bottom:1px solid #eee;\">${TOTAL_TEST_ALERTS}</td></tr><tr><td colspan=\"2\" style=\"padding:12px 0 4px 0;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px;\">Server</td></tr><tr><td style=\"padding:8px 0;color:#333;font-size:13px;border-bottom:1px solid #eee;\">Disk usage</td><td style=\"padding:8px 0;text-align:right;font-weight:bold;color:#333;font-size:13px;border-bottom:1px solid #eee;\">${DISK_USAGE}</td></tr><tr><td style=\"padding:8px 0;color:#333;font-size:13px;\">Container</td><td style=\"padding:8px 0;text-align:right;font-weight:bold;color:#00d4aa;font-size:13px;\">${CONTAINER_STATUS}</td></tr></table></div><div style=\"border-top:1px solid #eee;padding:12px 32px;text-align:center;\"><p style=\"color:#ccc;font-size:10px;margin:0;\">Wallert Admin</p></div></div>"

SUBJECT="Wallert daily report — ${DATE}"

# Send via Resend
curl -s -X POST "https://api.resend.com/emails" \
  -H "Authorization: Bearer ${RESEND_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"from\":\"${FROM_EMAIL}\",\"to\":\"${REPORT_EMAIL}\",\"subject\":\"${SUBJECT}\",\"html\":$(echo "$HTML" | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))')}" > /dev/null 2>&1
