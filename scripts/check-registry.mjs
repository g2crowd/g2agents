import fs from 'node:fs'
import path from 'node:path'
import YAML from 'yaml'

const root = process.cwd()
const failures = []

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'dist') return []
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return full.endsWith('.md') ? [full] : []
  })
}

const markdownFiles = walk(root)

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

for (const file of markdownFiles) {
  const text = fs.readFileSync(file, 'utf8')
  if (text.startsWith('---\n')) {
    try {
      const close = text.indexOf('\n---', 4)
      if (close === -1) throw new Error('Missing closing frontmatter fence')
      YAML.parse(text.slice(4, close))
    } catch (error) {
      failures.push(`${path.relative(root, file)} has invalid frontmatter: ${error.message}`)
    }
  }

  const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g
  for (const match of text.matchAll(linkPattern)) {
    const target = match[1]
    if (/^(https?:|mailto:|#)/.test(target)) continue
    const withoutAnchor = target.split('#')[0]
    if (!withoutAnchor) continue
    const resolved = path.resolve(path.dirname(file), withoutAnchor)
    if (!fs.existsSync(resolved)) {
      failures.push(`${path.relative(root, file)} links to missing ${target}`)
    }
  }

  if (file.includes(`${path.sep}software${path.sep}products${path.sep}`) && file.endsWith(`${path.sep}news.md`)) {
    const productSlug = path.basename(path.dirname(file))
    const rows = tableRowsFromSection(text, 'News log')
    const details = subsectionsFromSection(text, 'News details')
    for (const row of rows) {
      const key = newsEntryKey(productSlug, row)
      const detail = details[key] || ''
      if (detail.length < 200) {
        failures.push(`${path.relative(root, file)} missing long-form News details section for ${key}`)
      }
    }
  }
}

JSON.parse(fs.readFileSync(path.join(root, 'schemas', 'product-frontmatter.schema.json'), 'utf8'))

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Registry check passed: ${markdownFiles.length} Markdown files checked.`)
