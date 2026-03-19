import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

// HTML sanitization
export function escapeHtml(str) {
  if (!str) return ""
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

// JWT — sign a token (expires in 30 days)
export function signToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30d" })
}

// JWT — verify token and return userId, or null if invalid
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded.userId
  } catch {
    return null
  }
}

// Extract userId from Authorization header (Bearer token)
export function getUserFromRequest(request) {
  const auth = request.headers.get("authorization")
  if (!auth || !auth.startsWith("Bearer ")) return null
  return verifyToken(auth.slice(7))
}

// Simple in-memory rate limiter
const stores = new Map()

export function createRateLimiter(maxAttempts, windowMs) {
  const id = Math.random().toString(36)
  stores.set(id, new Map())

  setInterval(() => {
    const store = stores.get(id)
    const now = Date.now()
    for (const [key, data] of store) {
      if (now - data.start > windowMs) store.delete(key)
    }
  }, 5 * 60 * 1000)

  return {
    check(key) {
      const store = stores.get(id)
      const now = Date.now()
      const record = store.get(key)

      if (!record || now - record.start > windowMs) {
        store.set(key, { count: 1, start: now })
        return true
      }

      if (record.count >= maxAttempts) return false

      record.count++
      return true
    }
  }
}

// Email volume limiter per user (max 30 emails per hour per user)
const emailStore = new Map()
const MAX_EMAILS_PER_USER_PER_HOUR = 30

setInterval(() => {
  const now = Date.now()
  for (const [key, data] of emailStore) {
    if (now - data.start > 60 * 60 * 1000) emailStore.delete(key)
  }
}, 5 * 60 * 1000)

export function checkEmailLimit(userId) {
  const now = Date.now()
  const record = emailStore.get(userId)

  if (!record || now - record.start > 60 * 60 * 1000) {
    emailStore.set(userId, { count: 1, start: now })
    return true
  }

  if (record.count >= MAX_EMAILS_PER_USER_PER_HOUR) return false

  record.count++
  return true
}
