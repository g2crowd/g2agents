import fs from 'node:fs'
import path from 'node:path'
import YAML from 'yaml'

const root = process.cwd()
const softwareDir = path.join(root, 'software')
const outputPath = path.join(root, 'src', 'data', 'registry.ts')

function readMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  const parsed = parseFrontmatter(raw)
  return {
    raw,
    frontmatter: parsed.frontmatter,
    body: parsed.body.trim(),
  }
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---\n')) {
    return { frontmatter: {}, body: raw }
  }

  const close = raw.indexOf('\n---', 4)
  if (close === -1) {
    throw new Error('Missing closing frontmatter fence')
  }

  return {
    frontmatter: YAML.parse(raw.slice(4, close)) || {},
    body: raw.slice(close + 4),
  }
}

function listDirs(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b))
}

function listMarkdown(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b))
}

function excerpt(body) {
  const lines = body
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && !line.startsWith('|') && !line.startsWith('- '))

  return lines[0] || ''
}

function section(body, heading) {
  const lines = body.split('\n')
  const start = lines.findIndex((line) => line.trim().toLowerCase() === `## ${heading}`.toLowerCase())
  if (start === -1) return ''
  const collected = []
  for (let index = start + 1; index < lines.length; index += 1) {
    if (lines[index].startsWith('## ')) break
    collected.push(lines[index])
  }
  return collected.join('\n').trim()
}

function bulletsFromSection(body, heading) {
  return section(body, heading)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
}

function tableRowsFromSection(body, heading) {
  return section(body, heading)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|') && !line.includes('---'))
    .slice(1)
    .map((line) =>
      line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim()),
    )
}

function subsectionsFromSection(body, heading) {
  const result = {}
  const lines = section(body, heading).split('\n')
  let current = ''
  let collected = []

  const flush = () => {
    if (!current) return
    result[current] = collected.join('\n').trim()
  }

  for (const line of lines) {
    if (line.startsWith('### ')) {
      flush()
      current = line.replace(/^###\s+/, '').trim()
      collected = []
    } else if (current) {
      collected.push(line)
    }
  }

  flush()
  return result
}

function markdownLinkParts(value) {
  const match = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
  if (!match) return { label: value, url: '' }
  return { label: match[1], url: match[2] }
}

function slugSegment(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/^-|-$/g, '') || 'news'
}

function newsEntryKey(productSlug, row) {
  return `${productSlug}-${row[0] || 'undated'}-${slugSegment(row[2] || 'news')}`
}

function productRecord(slug) {
  const dir = path.join(softwareDir, 'products', slug)
  const index = readMarkdown(path.join(dir, 'index.md'))
  const profile = readMarkdown(path.join(dir, 'profile.md'))
  const reviews = fs.existsSync(path.join(dir, 'reviews-summary.md'))
    ? readMarkdown(path.join(dir, 'reviews-summary.md'))
    : { frontmatter: {}, body: '' }
  const pricing = fs.existsSync(path.join(dir, 'pricing.md'))
    ? readMarkdown(path.join(dir, 'pricing.md'))
    : { frontmatter: {}, body: '' }
  const features = fs.existsSync(path.join(dir, 'features.md'))
    ? readMarkdown(path.join(dir, 'features.md'))
    : { frontmatter: {}, body: '' }
  const news = fs.existsSync(path.join(dir, 'news.md'))
    ? readMarkdown(path.join(dir, 'news.md'))
    : { frontmatter: {}, body: '' }
  const newsDetails = subsectionsFromSection(news.body, 'News details')
  const files = listMarkdown(dir).map((file) => {
    const markdown = readMarkdown(path.join(dir, file))
    return {
      name: file,
      path: `software/products/${slug}/${file}`,
      frontmatter: markdown.frontmatter,
      raw: markdown.raw,
      content: markdown.body,
    }
  })
  const title = index.frontmatter.title || slug

  return {
    slug,
    path: `software/products/${slug}/index.md`,
    title,
    description: index.frontmatter.description || profile.frontmatter.description || '',
    vendorId: index.frontmatter.vendor_id || '',
    displayCategory: index.frontmatter.display_category || '',
    categoryMemberships: index.frontmatter.category_memberships || [],
    sourceTier: index.frontmatter.source_tier || '',
    owner: index.frontmatter.owner || '',
    claimPolicy: index.frontmatter.claim_policy || '',
    resource: index.frontmatter.resource || '',
    rank: Number(index.frontmatter.g2_category_rank || 0),
    reviewCount: Number(index.frontmatter.g2_review_count || 0),
    observedAt: String(index.frontmatter.source_observed_at || index.frontmatter.reviewed_at || ''),
    expiresAt: String(index.frontmatter.expires_at || ''),
    profile: excerpt(profile.body),
    buyerFit: section(profile.body, 'Buyer fit').replace(/\n+/g, ' '),
    strengths: bulletsFromSection(reviews.body, 'Review-derived strengths'),
    cautions: bulletsFromSection(reviews.body, 'Review-derived cautions'),
    features: tableRowsFromSection(features.body, 'Features').map((row) => ({
      capability: row[0] || '',
      status: row[1] || '',
      evidence: row[2] || '',
      notes: row[3] || '',
    })),
    news: tableRowsFromSection(news.body, 'News log').map((row) => {
      const source = markdownLinkParts(row[4] || '')
      const key = newsEntryKey(slug, row)
      return {
        key,
        date: row[0] || '',
        type: row[1] || '',
        headline: row[2] || '',
        buyerRelevance: row[3] || '',
        sourceLabel: source.label,
        sourceUrl: source.url,
        submitter: row[5] || '',
        status: row[6] || '',
        sourceNote: row[7] || '',
        article: newsDetails[key] || '',
      }
    }),
    pricingSignal: tableRowsFromSection(pricing.body, 'Category-page pricing signal').find((row) => row[0] === 'Entry-level price signal')?.[1] || '',
    files,
  }
}

function categoryRecord(slug) {
  const filePath = path.join(softwareDir, 'categories', slug, 'index.md')
  const file = readMarkdown(filePath)
  return {
    slug,
    path: `software/categories/${slug}/index.md`,
    title: file.frontmatter.title || slug,
    description: file.frontmatter.description || excerpt(file.body),
    sourceTier: file.frontmatter.source_tier || '',
    parents: file.frontmatter.parents || [],
    children: file.frontmatter.children || [],
    relatedCategories: file.frontmatter.related_categories || [],
    status: file.frontmatter.status || '',
    resource: file.frontmatter.resource || '',
    reviewedAt: String(file.frontmatter.reviewed_at || ''),
    expiresAt: String(file.frontmatter.expires_at || ''),
    productRows: tableRowsFromSection(file.body, 'Products').map((row) => ({
      rank: row[0] || '',
      product: row[1] || '',
      vendor: row[2] || '',
      fit: row[3] || '',
      reviewCount: row[4] || '',
      segment: row[5] || '',
    })),
  }
}

function vendorRecord(slug) {
  const filePath = path.join(softwareDir, 'vendors', slug, 'index.md')
  const file = readMarkdown(filePath)
  return {
    slug,
    path: `software/vendors/${slug}/index.md`,
    title: file.frontmatter.title || slug,
    description: file.frontmatter.description || excerpt(file.body),
    sourceTier: file.frontmatter.source_tier || '',
    resource: file.frontmatter.resource || '',
    products: tableRowsFromSection(file.body, 'Products').map((row) => ({
      product: row[0] || '',
      category: row[1] || '',
      fit: row[2] || '',
    })),
  }
}

const productSlugs = listDirs(path.join(softwareDir, 'products')).filter((slug) =>
  fs.existsSync(path.join(softwareDir, 'products', slug, 'index.md')),
)
const categorySlugs = listDirs(path.join(softwareDir, 'categories')).filter((slug) =>
  fs.existsSync(path.join(softwareDir, 'categories', slug, 'index.md')),
)
const vendorSlugs = listDirs(path.join(softwareDir, 'vendors')).filter((slug) =>
  fs.existsSync(path.join(softwareDir, 'vendors', slug, 'index.md')),
)
const products = productSlugs.map(productRecord)
const news = products
  .flatMap((product) =>
    product.news.map((entry) => ({
      ...entry,
      productSlug: product.slug,
      productTitle: product.title,
      productPath: product.path,
      vendorId: product.vendorId,
      category: product.displayCategory,
    })),
  )
  .sort((a, b) => {
    const dateCompare = String(b.date).localeCompare(String(a.date))
    if (dateCompare) return dateCompare
    return String(a.productTitle).localeCompare(String(b.productTitle))
  })

const registry = {
  products,
  categories: categorySlugs.map(categoryRecord),
  vendors: vendorSlugs.map(vendorRecord),
  news,
  stats: {
    products: productSlugs.length,
    categories: categorySlugs.length,
    vendors: vendorSlugs.length,
    newsItems: news.length,
    files: productSlugs.reduce((count, slug) => count + listMarkdown(path.join(softwareDir, 'products', slug)).length, 0),
  },
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(
  outputPath,
  `/* This file is generated by scripts/build-registry-data.mjs. */\nexport const registry = ${JSON.stringify(registry, null, 2)} as const\n`,
  'utf8',
)

console.log(
  `Generated registry data for ${registry.stats.products} products, ${registry.stats.categories} categories, and ${registry.stats.vendors} vendors.`,
)
