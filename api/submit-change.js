import crypto from 'node:crypto'

const allowedFileNames = new Set([
  'features.md',
  'integrations.md',
  'news.md',
  'pricing.md',
  'security-compliance.md',
  'vendor-claims.md',
])

const editablePathPattern = /^software\/products\/[a-z0-9-]+\/[a-z0-9-]+\.md$/
const submissionWindows = new Map()

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

function safeString(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength)
}

function slugSegment(value) {
  return safeString(value, 120)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'change'
}

function validatePath(filePath) {
  const normalized = safeString(filePath, 240)
  if (!editablePathPattern.test(normalized)) {
    throw new PublicError(400, 'This file path is not editable through the public contribution flow.')
  }

  const fileName = normalized.split('/').pop()
  if (!allowedFileNames.has(fileName)) {
    throw new PublicError(400, 'This file is not open for public edit proposals.')
  }

  return normalized
}

function validateContent(content) {
  const text = String(content || '')
  if (text.length < 20) throw new PublicError(400, 'Markdown content is too short.')
  if (text.length > 250_000) throw new PublicError(400, 'Markdown content is too large.')
  if (text.includes('\0')) throw new PublicError(400, 'Markdown content contains an invalid character.')
  if (!text.startsWith('---\n') || !text.includes('\n---')) {
    throw new PublicError(400, 'Editable Markdown must keep valid frontmatter fences.')
  }
  return text
}

function validateContributor(raw) {
  const contributor = raw && typeof raw === 'object' ? raw : {}
  const name = safeString(contributor.name, 80)
  const email = safeString(contributor.email, 120)
  const organization = safeString(contributor.organization, 120)
  const summary = safeString(contributor.summary, 240)

  if (name.length < 2) throw new PublicError(400, 'Contributor name is required.')
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new PublicError(400, 'A valid email is required for reviewer follow-up.')
  if (summary.length < 8) throw new PublicError(400, 'Change summary is required.')

  return { name, email, organization, summary }
}

function checkRateLimit(request) {
  const forwardedFor = String(request.headers['x-forwarded-for'] || '')
  const ip = forwardedFor.split(',')[0].trim() || request.socket?.remoteAddress || 'unknown'
  const now = Date.now()
  const hour = 60 * 60 * 1000
  const current = submissionWindows.get(ip) || []
  const recent = current.filter((timestamp) => now - timestamp < hour)
  if (recent.length >= 8) throw new PublicError(429, 'Too many submissions from this network. Try again later.')
  recent.push(now)
  submissionWindows.set(ip, recent)
}

function githubConfig() {
  const repo = process.env.GITHUB_REPOSITORY || process.env.G2AGENTS_GITHUB_REPOSITORY || 'g2crowd/g2agents'
  const [owner, name] = repo.split('/')
  const baseBranch = process.env.GITHUB_BASE_BRANCH || process.env.G2AGENTS_BASE_BRANCH || 'main'

  if (!owner || !name) throw new PublicError(500, 'GitHub repository configuration is invalid.')

  return { owner, name, baseBranch }
}

function base64Url(value) {
  return Buffer.from(value).toString('base64url')
}

async function githubAppToken() {
  const appId = process.env.GITHUB_APP_ID || process.env.G2AGENTS_GITHUB_APP_ID
  const installationId = process.env.GITHUB_APP_INSTALLATION_ID || process.env.G2AGENTS_GITHUB_APP_INSTALLATION_ID
  const privateKeyRaw = process.env.GITHUB_APP_PRIVATE_KEY || process.env.G2AGENTS_GITHUB_APP_PRIVATE_KEY

  if (!appId || !installationId || !privateKeyRaw) return ''

  const now = Math.floor(Date.now() / 1000)
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const payload = base64Url(JSON.stringify({ iat: now - 60, exp: now + 9 * 60, iss: appId }))
  const unsigned = `${header}.${payload}`
  const signer = crypto.createSign('RSA-SHA256')
  signer.update(unsigned)
  signer.end()
  const privateKey = privateKeyRaw.replace(/\\n/g, '\n')
  const signature = signer.sign(privateKey).toString('base64url')
  const jwt = `${unsigned}.${signature}`

  const response = await fetch(`https://api.github.com/app/installations/${installationId}/access_tokens`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${jwt}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  if (!response.ok) {
    throw new PublicError(500, 'GitHub App credential could not create an installation token.')
  }

  const data = await response.json()
  return data.token || ''
}

async function githubToken() {
  const direct = process.env.GITHUB_PR_TOKEN || process.env.G2AGENTS_GITHUB_PR_TOKEN
  if (direct) return direct

  const appToken = await githubAppToken()
  if (appToken) return appToken

  throw new PublicError(501, 'Review bot is not configured. Set GITHUB_PR_TOKEN or GitHub App env vars on Vercel.')
}

async function githubRequest(token, path, options = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {}),
    },
  })
  const text = await response.text()
  const data = text ? JSON.parse(text) : {}

  if (!response.ok) {
    const message = data.message || `GitHub request failed with ${response.status}`
    throw new PublicError(response.status >= 500 ? 502 : response.status, message)
  }

  return data
}

function encodedPath(filePath) {
  return filePath.split('/').map(encodeURIComponent).join('/')
}

function prBody({ contributor, filePath, branchName }) {
  return [
    'Public edit proposal submitted through g2agents.vercel.app.',
    '',
    `File: \`${filePath}\``,
    `Branch: \`${branchName}\``,
    '',
    'Submitter:',
    `- Name: ${contributor.name}`,
    `- Email: ${contributor.email}`,
    contributor.organization ? `- Organization: ${contributor.organization}` : '- Organization: not provided',
    '',
    'Summary:',
    contributor.summary,
    '',
    'Reviewer checklist:',
    '- Confirm the changed file is allowed for vendor/shared contributions.',
    '- Verify cited sources and neutral buyer framing.',
    '- Run `npm run check` before merge.',
  ].join('\n')
}

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    response.setHeader('Allow', 'POST, OPTIONS')
    return response.status(204).end()
  }

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST, OPTIONS')
    return json(response, 405, { error: 'Method not allowed' })
  }

  try {
    checkRateLimit(request)
    const body = await readBody(request)
    if (safeString(body.website, 200)) return json(response, 202, { ok: true })

    const filePath = validatePath(body.path)
    const content = validateContent(body.content)
    const contributor = validateContributor(body.contributor)
    const token = await githubToken()
    const { owner, name, baseBranch } = githubConfig()
    const fileName = filePath.split('/').pop()
    const productSlug = filePath.split('/')[2]
    const branchName = `proposals/${slugSegment(productSlug)}-${slugSegment(fileName)}-${Date.now().toString(36)}-${crypto.randomBytes(3).toString('hex')}`

    const baseRef = await githubRequest(token, `/repos/${owner}/${name}/git/ref/heads/${encodeURIComponent(baseBranch)}`)
    const file = await githubRequest(token, `/repos/${owner}/${name}/contents/${encodedPath(filePath)}?ref=${encodeURIComponent(baseBranch)}`)
    const currentContent = Buffer.from(String(file.content || '').replace(/\n/g, ''), 'base64').toString('utf8')

    if (currentContent === content) throw new PublicError(400, 'No file changes were submitted.')

    await githubRequest(token, `/repos/${owner}/${name}/git/refs`, {
      method: 'POST',
      body: JSON.stringify({
        ref: `refs/heads/${branchName}`,
        sha: baseRef.object.sha,
      }),
    })

    await githubRequest(token, `/repos/${owner}/${name}/contents/${encodedPath(filePath)}`, {
      method: 'PUT',
      body: JSON.stringify({
        message: `docs: propose update to ${fileName}`,
        content: Buffer.from(content, 'utf8').toString('base64'),
        branch: branchName,
        sha: file.sha,
        committer: {
          name: process.env.GITHUB_COMMITTER_NAME || 'G2 Agents Review Bot',
          email: process.env.GITHUB_COMMITTER_EMAIL || 'g2agents@g2.com',
        },
      }),
    })

    const pull = await githubRequest(token, `/repos/${owner}/${name}/pulls`, {
      method: 'POST',
      body: JSON.stringify({
        title: `docs: update ${productSlug} ${fileName}`,
        head: branchName,
        base: baseBranch,
        body: prBody({ contributor, filePath, branchName }),
        draft: false,
      }),
    })

    return json(response, 201, {
      ok: true,
      branch: branchName,
      prNumber: pull.number,
      prUrl: pull.html_url,
    })
  } catch (error) {
    const status = error instanceof PublicError ? error.status : 500
    const message = error instanceof PublicError ? error.message : 'Could not submit change for review.'
    if (!(error instanceof PublicError)) console.error(error)
    return json(response, status, { error: message })
  }
}
