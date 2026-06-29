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
}

JSON.parse(fs.readFileSync(path.join(root, 'schemas', 'product-frontmatter.schema.json'), 'utf8'))

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Registry check passed: ${markdownFiles.length} Markdown files checked.`)
