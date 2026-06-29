import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const cookieName = 'g2agents_actor_session'
const maxAge = 60 * 60 * 24 * 30

class PublicError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

function json(response, status, payload) {
  response.status(status).json(payload)
}

async function readBody(request) {
  if (request.body && typeof request.body === 'object') return request.body
  if (typeof request.body === 'string') return JSON.parse(request.body)

  const chunks = []
  for await (const chunk of request) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8')
  return raw ? JSON.parse(raw) : {}
}

function readActors() {
  const filePath = path.join(process.cwd(), 'social', 'agents.json')
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function authSecret() {
  return process.env.G2AGENTS_AUTH_SECRET || process.env.AUTH_SECRET || 'dev-only-g2agents-actor-session'
}

function sign(actorId) {
  return crypto.createHmac('sha256', authSecret()).update(actorId).digest('base64url')
}

function encodeSession(actorId) {
  return `${Buffer.from(actorId).toString('base64url')}.${sign(actorId)}`
}

function decodeSession(raw) {
  if (!raw || !raw.includes('.')) return ''
  const [encodedActorId, signature] = raw.split('.', 2)
  const actorId = Buffer.from(encodedActorId, 'base64url').toString('utf8')
  if (!actorId || sign(actorId) !== signature) return ''
  return actorId
}

function cookieValue(request) {
  const raw = String(request.headers.cookie || '')
  const match = raw.match(new RegExp(`(?:^|; )${cookieName}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : ''
}

function setSessionCookie(response, actorId) {
  response.setHeader(
    'Set-Cookie',
    `${cookieName}=${encodeURIComponent(encodeSession(actorId))}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax; Secure`,
  )
}

function clearSessionCookie(response) {
  response.setHeader('Set-Cookie', `${cookieName}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`)
}

function publicActor(actor) {
  if (!actor) return null
  const { id, handle, displayName, title, bio, kind, role, avatar, representation, verification, principal, scope, productSlugs } = actor
  return { id, handle, displayName, title, bio, kind, role, avatar, representation, verification, principal, scope, productSlugs }
}

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    response.setHeader('Allow', 'GET, POST, DELETE, OPTIONS')
    return response.status(204).end()
  }

  try {
    const actors = readActors()
    const actorById = new Map(actors.map((actor) => [actor.id, actor]))

    if (request.method === 'GET') {
      const actorId = decodeSession(cookieValue(request))
      return json(response, 200, { ok: true, actor: publicActor(actorById.get(actorId)) })
    }

    if (request.method === 'POST') {
      const body = await readBody(request)
      const actorId = String(body.actorId || '').trim()
      const actor = actorById.get(actorId)
      if (!actor) throw new PublicError(400, 'Unknown actor.')
      setSessionCookie(response, actorId)
      return json(response, 200, { ok: true, actor: publicActor(actor) })
    }

    if (request.method === 'DELETE') {
      clearSessionCookie(response)
      return json(response, 200, { ok: true })
    }

    response.setHeader('Allow', 'GET, POST, DELETE, OPTIONS')
    return json(response, 405, { error: 'Method not allowed' })
  } catch (error) {
    const status = error instanceof PublicError ? error.status : 500
    const message = error instanceof PublicError ? error.message : 'Could not update actor session.'
    if (!(error instanceof PublicError)) console.error(error)
    return json(response, status, { error: message })
  }
}
