import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import YAML from 'yaml'

const root = process.cwd()
const productsDir = path.join(root, 'software', 'products')
const today = new Date().toISOString().slice(0, 10)

const DEFAULT_FILES = [
  'pricing.md',
  'features.md',
  'integrations.md',
  'security-compliance.md',
  'vendor-claims.md',
]

const ALLOWED_FILES = [...DEFAULT_FILES, 'news.md']

const DEFAULT_MODEL = process.env.OPENAI_RESEARCH_MODEL || process.env.OPENAI_MODEL || 'gpt-5.5'
const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses'

function loadDotEnv() {
  const envPath = path.join(root, '.env')
  if (!fs.existsSync(envPath)) return

  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
    if (!match) continue
    const [, key, rawValue] = match
    if (process.env[key]) continue
    process.env[key] = rawValue.replace(/^['"]|['"]$/g, '')
  }
}

function usage() {
  return `Usage:
  npm run research:products -- --product chargebee --apply
  npm run research:products -- --limit 3 --apply
  npm run research:products -- --product chargebee --files pricing.md,integrations.md --dry-run

Options:
  --product <slug>       Product slug to research. Repeatable. Defaults to every product folder with index.md.
  --files <list>         Comma-separated target files. Defaults to ${DEFAULT_FILES.join(', ')}.
  --limit <n>            Limit product count after filtering.
  --model <name>         OpenAI model. Defaults to OPENAI_RESEARCH_MODEL, OPENAI_MODEL, or ${DEFAULT_MODEL}.
  --apply                Write Markdown updates. Without this, the script prints a summary only.
  --dry-run              Explicit no-write mode.
`
}

function parseArgs(argv) {
  const options = {
    products: [],
    files: DEFAULT_FILES,
    limit: Number.POSITIVE_INFINITY,
    model: DEFAULT_MODEL,
    apply: false,
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--help' || arg === '-h') {
      console.log(usage())
      process.exit(0)
    }
    if (arg === '--apply') {
      options.apply = true
      continue
    }
    if (arg === '--dry-run') {
      options.apply = false
      continue
    }
    if (arg === '--product') {
      options.products.push(...requiredValue(argv, ++index, arg).split(',').map((value) => value.trim()).filter(Boolean))
      continue
    }
    if (arg === '--files') {
      options.files = requiredValue(argv, ++index, arg)
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
      continue
    }
    if (arg === '--limit') {
      options.limit = Number(requiredValue(argv, ++index, arg))
      if (!Number.isFinite(options.limit) || options.limit < 1) throw new Error('--limit must be a positive number')
      continue
    }
    if (arg === '--model') {
      options.model = requiredValue(argv, ++index, arg)
      continue
    }
    throw new Error(`Unknown argument: ${arg}\n\n${usage()}`)
  }

  const invalidFiles = options.files.filter((file) => !ALLOWED_FILES.includes(file))
  if (invalidFiles.length) {
    throw new Error(`Unsupported target file(s): ${invalidFiles.join(', ')}. Allowed: ${ALLOWED_FILES.join(', ')}`)
  }

  return options
}

function requiredValue(argv, index, flag) {
  const value = argv[index]
  if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value`)
  return value
}

function parseMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  if (!raw.startsWith('---\n')) return { raw, frontmatter: {}, body: raw, frontmatterText: '' }
  const close = raw.indexOf('\n---', 4)
  if (close === -1) throw new Error(`${path.relative(root, filePath)} is missing closing frontmatter fence`)
  const frontmatterText = raw.slice(4, close)
  return {
    raw,
    frontmatter: YAML.parse(frontmatterText) || {},
    frontmatterText,
    body: raw.slice(close + 4).trim(),
  }
}

function listProductSlugs() {
  if (!fs.existsSync(productsDir)) return []
  return fs
    .readdirSync(productsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => fs.existsSync(path.join(productsDir, slug, 'index.md')))
    .sort((a, b) => a.localeCompare(b))
}

function readProduct(slug, files) {
  const dir = path.join(productsDir, slug)
  const indexPath = path.join(dir, 'index.md')
  if (!fs.existsSync(indexPath)) throw new Error(`Unknown product slug: ${slug}`)
  const index = parseMarkdown(indexPath)
  const productFiles = files
    .filter((file) => fs.existsSync(path.join(dir, file)))
    .map((file) => {
      const filePath = path.join(dir, file)
      const markdown = parseMarkdown(filePath)
      return {
        name: file,
        path: filePath,
        relativePath: path.relative(root, filePath),
        frontmatter: markdown.frontmatter,
        body: markdown.body,
        raw: markdown.raw,
      }
    })

  return {
    slug,
    dir,
    title: index.frontmatter.title || slug,
    description: index.frontmatter.description || '',
    vendorId: index.frontmatter.vendor_id || '',
    category: index.frontmatter.display_category || '',
    resource: index.frontmatter.resource || '',
    files: productFiles,
  }
}

function truncate(value, max = 5000) {
  const text = String(value || '').trim()
  if (text.length <= max) return text
  return `${text.slice(0, max)}\n\n[truncated ${text.length - max} chars]`
}

function buildSchema(files) {
  return {
    type: 'object',
    properties: {
      product_slug: { type: 'string' },
      product_title: { type: 'string' },
      reviewed_at: { type: 'string' },
      risk_notes: {
        type: 'array',
        items: { type: 'string' },
      },
      page_updates: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            file: { type: 'string', enum: files },
            source_tier: { type: 'string', enum: ['public-cited', 'vendor-attested', 'mixed', 'unknown'] },
            expires_in_days: { type: 'integer' },
            markdown: { type: 'string' },
            sources: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  url: { type: 'string' },
                  relevance: { type: 'string' },
                },
                required: ['title', 'url', 'relevance'],
                additionalProperties: false,
              },
            },
          },
          required: ['file', 'source_tier', 'expires_in_days', 'markdown', 'sources'],
          additionalProperties: false,
        },
      },
    },
    required: ['product_slug', 'product_title', 'reviewed_at', 'risk_notes', 'page_updates'],
    additionalProperties: false,
  }
}

function buildPrompt(product, files) {
  const currentFiles = product.files
    .map((file) => {
      return [
        `## ${file.name}`,
        `Path: ${file.relativePath}`,
        `Owner: ${file.frontmatter.owner || 'unknown'}`,
        `Source tier: ${file.frontmatter.source_tier || 'unknown'}`,
        '',
        truncate(file.body),
      ].join('\n')
    })
    .join('\n\n---\n\n')

  return [
    `Research product: ${product.title}`,
    `Product slug: ${product.slug}`,
    `Vendor slug: ${product.vendorId}`,
    `Display category: ${product.category}`,
    `Existing product resource: ${product.resource}`,
    `Review date: ${today}`,
    `Target files: ${files.join(', ')}`,
    '',
    'Use live web research. Prefer official vendor pricing pages, product docs, security pages, changelogs, trust centers, developer docs, SEC filings, reputable press releases, and G2/public category context. Competitor blog posts may be used only as weak secondary context and must be labeled as such.',
    '',
    'Write neutral buyer-facing OKF enrichment for each target file. Do not copy marketing language. Do not imply G2 endorsement. Do not invent pricing, certifications, integrations, roadmap, or availability. If a detail is not public, say it is not publicly disclosed or requires sales/vendor confirmation.',
    '',
    'For pricing.md, include concrete current public plan names, public prices, billing thresholds, overage rules, add-ons, contract requirements, buyer caveats, and what a buyer should verify. This is the highest-priority page.',
    'For features.md, separate core capabilities from unverified or edition-dependent capabilities.',
    'For integrations.md, separate native integrations, marketplace/partner integrations, API/developer surfaces, and connector ecosystem signals.',
    'For security-compliance.md, include only public-cited security, privacy, compliance, authentication, audit, data residency, or certification claims.',
    'For vendor-claims.md, list claim candidates as vendor-attested candidates, not neutral G2 truth.',
    'For news.md, add only buyer-relevant recent signals or clear research gaps; do not duplicate existing news rows.',
    '',
    'Return JSON only. In each markdown field, use Markdown suitable for appending inside an existing Markdown file. Use h3/h4 headings, compact tables, and bullets. Keep each markdown field under 1,800 words and each sources array under six sources. Do not include a Sources heading because sources are returned separately. Use inline Markdown links for the most important claims. Do not mention an unnamed page, campaign, report, or documentation page unless it is linked inline or included in sources.',
    '',
    'Current OKF content:',
    currentFiles,
  ].join('\n')
}

async function researchProduct(product, options) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY is missing. Add it to .env or the environment.')

  const files = product.files.map((file) => file.name)
  const body = {
    model: options.model,
    tools: [{ type: 'web_search' }],
    include: ['web_search_call.action.sources'],
    input: [
      {
        role: 'system',
        content: [
          'You are a precise G2 product OKF research agent.',
          'Your job is to research one software product at a time and produce cited, neutral, buyer-useful Markdown enrichments.',
          'You must distinguish public-cited evidence, vendor-attested statements, and unknowns.',
          'Every material product, pricing, security, or integration claim should be traceable to a public source.',
        ].join(' '),
      },
      {
        role: 'user',
        content: buildPrompt(product, files),
      },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'product_okf_research',
        schema: buildSchema(files),
        strict: true,
      },
    },
    max_output_tokens: 18000,
    store: false,
  }

  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const json = await response.json()
  if (!response.ok) {
    const message = json?.error?.message || JSON.stringify(json, null, 2)
    throw new Error(`OpenAI research request failed for ${product.slug}: ${message}`)
  }

  const outputText = extractOutputText(json)
  if (!outputText) throw new Error(`OpenAI research request returned no output text for ${product.slug}`)

  try {
    return JSON.parse(outputText)
  } catch (error) {
    throw new Error(`OpenAI research output was not valid JSON for ${product.slug}: ${error.message}\n${outputText.slice(0, 1000)}`)
  }
}

async function researchProductWithFallback(product, options) {
  try {
    return await researchProduct(product, options)
  } catch (error) {
    if (product.files.length <= 1) throw error

    console.warn(`  batch failed, retrying ${product.files.length} file(s) one at a time: ${error.message.split('\n')[0]}`)
    const combined = {
      product_slug: product.slug,
      product_title: product.title,
      reviewed_at: today,
      risk_notes: [],
      page_updates: [],
    }

    for (const file of product.files) {
      console.log(`  researching ${file.name}...`)
      const singleProduct = { ...product, files: [file] }
      const single = await researchProduct(singleProduct, options)
      combined.risk_notes.push(...(single.risk_notes || []))
      combined.page_updates.push(...(single.page_updates || []))
    }

    return combined
  }
}

function extractOutputText(response) {
  if (typeof response.output_text === 'string') return response.output_text
  const chunks = []
  for (const item of response.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === 'string') chunks.push(content.text)
    }
  }
  return chunks.join('\n').trim()
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00.000Z`)
  date.setUTCDate(date.getUTCDate() + Number(days || 0))
  return date.toISOString().slice(0, 10)
}

function defaultExpiryDays(file) {
  if (file === 'pricing.md' || file === 'vendor-claims.md') return 90
  if (file === 'news.md') return 90
  return 180
}

function normalizeSource(source) {
  const title = asciiText(String(source.title || 'Source').replace(/\s+/g, ' ').trim())
  const url = String(source.url || '').trim()
  const relevance = asciiText(String(source.relevance || '').replace(/\s+/g, ' ').trim())
  return { title, url, relevance }
}

function asciiText(value) {
  return String(value || '')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/\u00A0/g, ' ')
    .replace(/\u00A2/g, 'c')
}

function renderResearchBlock(product, update) {
  const expiresInDays = update.expires_in_days > 0 ? update.expires_in_days : defaultExpiryDays(update.file)
  const expiresAt = addDays(today, expiresInDays)
  const sourceTier = update.source_tier || 'mixed'
  const markdown = asciiText(update.markdown || '')
    .replace(/<!--\s*product-research-agent:[\s\S]*?-->/g, '')
    .trim()
  const sources = (update.sources || [])
    .map(normalizeSource)
    .filter((source) => source.url)
    .map((source) => `- [${source.title}](${source.url}) - ${source.relevance || 'Used as product evidence.'}`)

  return [
    `<!-- product-research-agent:${product.slug}:${update.file}:start -->`,
    '',
    '## Product research enrichment',
    '',
    `_Research agent: \`product-research/${product.slug}\`. Reviewed: ${today}. Source tier: ${sourceTier}. Recheck by: ${expiresAt}._`,
    '',
    markdown || 'No safe public enrichment was found in this pass.',
    '',
    '### Research sources',
    '',
    sources.length ? sources.join('\n') : '- No durable public sources were returned by the research agent.',
    '',
    `<!-- product-research-agent:${product.slug}:${update.file}:end -->`,
    '',
  ].join('\n')
}

function updateFreshness(raw, reviewedAt, expiresAt) {
  if (!raw.startsWith('---\n')) return raw
  const close = raw.indexOf('\n---', 4)
  if (close === -1) return raw
  const frontmatter = raw.slice(0, close + 4)
  const body = raw.slice(close + 4)
  const updated = frontmatter
    .replace(/^reviewed_at:\s*.*$/m, `reviewed_at: ${reviewedAt}`)
    .replace(/^expires_at:\s*.*$/m, `expires_at: ${expiresAt}`)
  return `${updated}${body}`
}

function upsertResearchBlock(product, update) {
  const filePath = path.join(product.dir, update.file)
  if (!fs.existsSync(filePath)) return false

  const start = `<!-- product-research-agent:${product.slug}:${update.file}:start -->`
  const end = `<!-- product-research-agent:${product.slug}:${update.file}:end -->`
  const block = renderResearchBlock(product, update)
  const currentRaw = fs.readFileSync(filePath, 'utf8')
  const expiresInDays = update.expires_in_days > 0 ? update.expires_in_days : defaultExpiryDays(update.file)
  const current = updateFreshness(currentRaw, today, addDays(today, expiresInDays))
  const startIndex = current.indexOf(start)
  const endIndex = current.indexOf(end)

  let next
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    next = `${current.slice(0, startIndex)}${block}${current.slice(endIndex + end.length).replace(/^\n+/, '')}`
  } else {
    next = `${current.replace(/\s*$/, '')}\n\n${block}`
  }

  if (next !== currentRaw) {
    fs.writeFileSync(filePath, next, 'utf8')
    return true
  }

  return false
}

function printResearchSummary(product, research) {
  console.log(`\n${product.slug}: ${research.page_updates.length} page update(s)`)
  if (research.risk_notes?.length) {
    for (const note of research.risk_notes) console.log(`  risk: ${note}`)
  }
  for (const update of research.page_updates) {
    const sourceCount = update.sources?.length || 0
    console.log(`  ${update.file}: ${sourceCount} source(s), ${String(update.markdown || '').length} chars`)
  }
}

async function main() {
  loadDotEnv()
  const options = parseArgs(process.argv.slice(2))
  const slugs = options.products.length ? options.products : listProductSlugs()
  const selectedSlugs = slugs.slice(0, options.limit)
  if (!selectedSlugs.length) throw new Error('No product slugs selected.')

  console.log(`${options.apply ? 'Applying' : 'Dry-running'} product research for ${selectedSlugs.length} product(s).`)
  console.log(`Model: ${options.model}`)
  console.log(`Target files: ${options.files.join(', ')}`)

  let changedFiles = 0
  for (const slug of selectedSlugs) {
    const product = readProduct(slug, options.files)
    if (!product.files.length) {
      console.log(`\n${slug}: no requested files exist, skipping.`)
      continue
    }

    console.log(`\nResearching ${product.title} (${slug})...`)
    const research = await researchProductWithFallback(product, options)
    printResearchSummary(product, research)

    if (!options.apply) continue
    for (const update of research.page_updates) {
      if (!options.files.includes(update.file)) continue
      if (upsertResearchBlock(product, update)) changedFiles += 1
    }
  }

  if (options.apply) console.log(`\nUpdated ${changedFiles} file(s).`)
  else console.log('\nDry run complete. Re-run with --apply to write Markdown files.')
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
