#!/bin/bash
# Wallert health check — alerts via email if the app is down
# Cron: */5 * * * * /root/wallert/scripts/health-check.sh

set -e

export $(grep -v '^#' /root/wallert/.env | xargs)

URL="https://wallert.app"
REPORT_EMAIL="${REPORT_EMAIL}"
RESEND_KEY="$RESEND_API_KEY"
FROM_EMAIL="Wallert <${ALERT_FROM_EMAIL}>"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$URL" 2>/dev/null || echo "000")

if [ "$HTTP_CODE" != "200" ]; then
  DATE=$(date '+%Y-%m-%d %H:%M UTC')
  SUBJECT="WALLERT DOWN — Health check failed (${HTTP_CODE})"
  HTML="<div style=\"font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:32px;\"><div style=\"background:#cc0000;padding:16px 24px;border-radius:8px 8px 0 0;text-align:center;\"><span style=\"color:#fff;font-size:14px;font-weight:bold;\">WALLERT IS DOWN</span></div><div style=\"background:#fff;border:1px solid #eee;border-radius:0 0 8px 8px;padding:24px;\"><p style=\"color:#333;font-size:14px;\">Health check failed at <b>${DATE}</b></p><p style=\"color:#333;font-size:14px;\">URL: ${URL}</p><p style=\"color:#cc0000;font-size:14px;font-weight:bold;\">HTTP code: ${HTTP_CODE}</p><p style=\"color:#888;font-size:12px;margin-top:20px;\">Check the server immediately: ssh into your server</p></div></div>"

  curl -s -X POST "https://api.resend.com/emails" \
    -H "Authorization: Bearer ${RESEND_KEY}" \
    -H "Content-Type: application/json" \
    -d "{\"from\":\"${FROM_EMAIL}\",\"to\":\"${REPORT_EMAIL}\",\"subject\":\"${SUBJECT}\",\"html\":$(echo "$HTML" | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))')}" > /dev/null 2>&1
fi
