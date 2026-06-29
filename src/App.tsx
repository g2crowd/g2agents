import { useEffect, useMemo, useState, type FormEvent, type MouseEvent, type ReactNode } from 'react'
import {
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Building2,
  ChevronRight,
  CircleDot,
  Copy,
  File,
  FileText,
  Filter,
  Folder,
  GitBranch,
  Loader2,
  Maximize2,
  Minimize2,
  Newspaper,
  PencilLine,
  Search,
  Send,
  ShieldCheck,
  Tags,
  X,
} from 'lucide-react'
import { registry } from '@/data/registry'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

type RegistryData = typeof registry
type CategoryMembership = {
  category_id: string
  fit: string
  source_tier: string
  reviewed_at?: string
}
type ProductFeature = {
  capability: string
  status: string
  evidence: string
  notes: string
}
type ProductNewsEntry = {
  key: string
  date: string
  type: string
  headline: string
  buyerRelevance: string
  sourceLabel: string
  sourceUrl: string
  submitter: string
  status: string
  sourceNote: string
  article: string
}
type NewsFeedEntry = ProductNewsEntry & {
  productSlug: string
  productTitle: string
  productPath: string
  vendorId: string
  category: string
}
type ProductFile = {
  name: string
  path: string
  frontmatter: Record<string, unknown>
  raw: string
  content: string
}
type Product = {
  slug: string
  path: string
  title: string
  description: string
  vendorId: string
  displayCategory: string
  categoryMemberships: CategoryMembership[]
  sourceTier: string
  owner: string
  claimPolicy: string
  resource: string
  rank: number
  reviewCount: number
  observedAt: string
  expiresAt: string
  profile: string
  buyerFit: string
  strengths: string[]
  cautions: string[]
  features: ProductFeature[]
  news: ProductNewsEntry[]
  pricingSignal: string
  files: ProductFile[]
}
type Category = {
  slug: string
  path: string
  title: string
  description: string
  sourceTier: string
  parents: string[]
  children: string[]
  relatedCategories: string[]
  status: string
  resource: string
  reviewedAt: string
  expiresAt: string
  productRows: Array<{
    rank: string
    product: string
    vendor: string
    fit: string
    reviewCount: string
    segment: string
  }>
}
type Vendor = {
  slug: string
  path: string
  title: string
  description: string
  sourceTier: string
  resource: string
  products: Array<{ product: string; category: string; fit: string }>
}
type Registry = {
  products: Product[]
  categories: Category[]
  vendors: Vendor[]
  news: NewsFeedEntry[]
  stats: RegistryData['stats']
}

const registryData = registry as unknown as Registry

const fitOrder = ['all', 'core', 'adjacent', 'partial', 'legacy', 'vendor-claimed', 'disputed'] as const
type FitFilter = (typeof fitOrder)[number]
type AppTab = 'products' | 'news' | 'categories' | 'vendors' | 'docs'
type AppHashState = {
  tab: AppTab
  product?: string
  news?: string
  query: string
  fit: FitFilter
  expanded: boolean
}
const appTabs = ['products', 'news', 'categories', 'vendors', 'docs'] as const
const fitLabels: Record<string, string> = {
  all: 'All',
  core: 'Primary',
  adjacent: 'Related suite',
  partial: 'Limited slice',
  legacy: 'Legacy',
  'vendor-claimed': 'Vendor claimed',
  disputed: 'Under review',
}

const sourceTierLabels: Record<string, string> = {
  'g2-curated': 'G2 curated',
  'vendor-attested': 'Vendor',
  'review-derived': 'Reviews',
  'public-cited': 'Public cited',
  'agent-inferred': 'Agent inferred',
  mixed: 'Mixed',
}

const relationshipDescriptions: Record<string, string> = {
  core: 'Mainly built for this category and a direct match for the buyer use case.',
  adjacent: 'Relevant through a broader suite or neighboring workflow, but not mainly this category.',
  partial: 'Covers one slice of the category, but not the full expected workflow.',
  legacy: 'Previously associated or retained for historical continuity.',
  'vendor-claimed': 'Vendor says this belongs here; G2 has not curated it yet.',
  disputed: 'Category relationship needs review.',
}

const sourceTierDescriptions: Record<string, string> = {
  'g2-curated': 'Written or verified by G2 registry maintainers.',
  'vendor-attested': 'Supplied by a vendor and subject to review.',
  'review-derived': 'Extracted from patterns in review content.',
  'public-cited': 'Captured from public sources with citations.',
  'agent-inferred': 'Inferred by an agent and needs stronger evidence.',
  mixed: 'Combines multiple source types.',
}

const columnHelp = {
  rank: 'Seed order from the category source page. This is not a recommendation or score.',
  product: 'Canonical product folder in the registry.',
  relationship: 'G2 category fit for the selected category. This is not a search score.',
  reviews: 'Review count captured from the source snapshot.',
  source: 'Where the registry claim came from, such as public-cited or G2-curated.',
}

function cleanMarkdownLink(value: string) {
  return value.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
}

function getFit(product: Product) {
  return product.categoryMemberships[0]?.fit || 'unknown'
}

function fitVariant(fit: string) {
  if (fit === 'core') return 'core'
  if (fit === 'adjacent') return 'adjacent'
  if (fit === 'partial') return 'partial'
  return 'muted'
}

const genericSearchTerms = new Set([
  'a',
  'an',
  'and',
  'app',
  'apps',
  'for',
  'g2',
  'of',
  'platform',
  'platforms',
  'product',
  'products',
  'software',
  'solution',
  'solutions',
  'system',
  'systems',
  'the',
  'to',
  'tool',
  'tools',
  'with',
])

const searchConcepts = [
  {
    marker: 'concept-billing',
    terms: ['billing', 'bill', 'bills', 'invoice', 'invoicing', 'monetization', 'plan', 'plans', 'prebilling', 'recurring', 'renewal', 'renewals', 'subscription', 'subscriptions', 'usage'],
  },
  {
    marker: 'concept-revenue',
    terms: ['arpu', 'cash', 'charge', 'charges', 'finance', 'financial', 'monetization', 'pricing', 'quote', 'quoting', 'revenue', 'revenuecloud', 'revops', 'salesforce'],
  },
  {
    marker: 'concept-payments',
    terms: ['autopay', 'card', 'cards', 'checkout', 'gateway', 'merchant', 'payment', 'payments', 'paypal', 'pix', 'stripe', 'surcharge', 'upi'],
  },
  {
    marker: 'concept-erp',
    terms: ['accounting', 'ap', 'ar', 'close', 'controller', 'erp', 'finance', 'financial', 'netsuite', 'reconciliation', 'sage'],
  },
  {
    marker: 'concept-ai',
    terms: ['agentforce', 'agentic', 'ai', 'assistant', 'assistants', 'automation', 'mcp'],
  },
  {
    marker: 'concept-pos',
    terms: ['checkout', 'handheld', 'pos', 'retail', 'restaurant', 'square', 'store', 'terminal'],
  },
]

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function hasSearchTerm(text: string, term: string) {
  const normalized = normalizeSearchText(term)
  if (!normalized) return false
  if (normalized.includes(' ')) return text.includes(normalized)
  return new RegExp(`(^| )${normalized}( |$)`).test(text)
}

function searchTokens(query: string) {
  const normalized = normalizeSearchText(query)
  const tokens = normalized.split(' ').filter((token) => token.length > 1 && !genericSearchTerms.has(token))
  return tokens.length ? tokens : normalized.split(' ').filter((token) => token.length > 1)
}

function enrichSearchText(text: string) {
  const normalized = normalizeSearchText(text)
  const markers = searchConcepts
    .filter((concept) => concept.terms.some((term) => hasSearchTerm(normalized, term)))
    .flatMap((concept) => [concept.marker, ...concept.terms])
  return `${normalized} ${markers.map(normalizeSearchText).join(' ')}`
}

function productSearchText(product: Product, vendor?: Vendor) {
  const categoryLabels = product.categoryMemberships.map((membership) => [membership.category_id, fitLabels[membership.fit], relationshipDescriptions[membership.fit]].join(' '))
  const newsText = product.news.map((item) => [item.type, item.headline, item.buyerRelevance, item.sourceLabel, item.sourceNote].join(' '))
  const featureText = product.features.map((feature) => [feature.capability, feature.status, feature.evidence, feature.notes].join(' '))
  const fileText = product.files.filter((file) => file.name !== 'alternatives.md').map((file) => [file.name, file.path, file.content].join(' '))
  return enrichSearchText(
    [
      product.title,
      product.slug,
      product.vendorId,
      vendor?.title || '',
      product.displayCategory,
      product.description,
      product.profile,
      product.buyerFit,
      product.path,
      product.resource,
      product.pricingSignal,
      product.strengths.join(' '),
      product.cautions.join(' '),
      categoryLabels.join(' '),
      featureText.join(' '),
      newsText.join(' '),
      fileText.join(' '),
    ].join(' '),
  )
}

function newsSearchText(item: NewsFeedEntry) {
  return enrichSearchText(
    [
      item.date,
      item.type,
      item.headline,
      item.buyerRelevance,
      item.article,
      item.sourceLabel,
      item.sourceNote,
      item.productTitle,
      item.productSlug,
      item.vendorId,
      item.category,
      item.submitter,
      item.status,
    ].join(' '),
  )
}

function searchScore(text: string, query: string) {
  const normalizedQuery = normalizeSearchText(query)
  if (!normalizedQuery) return 1
  const tokens = searchTokens(query)
  if (!tokens.length) return 1

  let score = hasSearchTerm(text, normalizedQuery) ? 8 : 0
  let matched = 0

  for (const token of tokens) {
    if (hasSearchTerm(text, token)) {
      matched += 1
      score += token.length > 4 ? 3 : 2
      continue
    }

    const concept = searchConcepts.find((item) => item.terms.includes(token))
    if (concept && hasSearchTerm(text, concept.marker)) {
      matched += 1
      score += 1.5
    }
  }

  if (matched === tokens.length) return score + matched
  if (matched > 0 && tokens.length > 2) return score * (matched / tokens.length)
  return 0
}

function validTab(value: string): value is AppTab {
  return (appTabs as readonly string[]).includes(value)
}

function validFit(value: string | null): value is FitFilter {
  return Boolean(value && (fitOrder as readonly string[]).includes(value))
}

function readAppHash(): AppHashState {
  if (typeof window === 'undefined') {
    return { tab: 'products', query: '', fit: 'all', expanded: false }
  }

  const raw = window.location.hash.replace(/^#/, '')
  const [pathPart = '', queryPart = ''] = raw.split('?')
  const segments = pathPart.split('/').map(decodeURIComponent).filter(Boolean)
  const tabCandidate = segments[0] || ''
  const tab: AppTab = validTab(tabCandidate) ? tabCandidate : 'products'
  const params = new URLSearchParams(queryPart)
  const fit = params.get('fit')

  return {
    tab,
    product: tab === 'products' ? segments[1] : undefined,
    news: tab === 'news' ? segments[1] : undefined,
    query: params.get('q') || '',
    fit: validFit(fit) ? fit : 'all',
    expanded: tab === 'products' && params.get('view') === 'full',
  }
}

function buildAppHash(state: Partial<AppHashState>) {
  const tab = state.tab && validTab(state.tab) ? state.tab : 'products'
  const segments: string[] = [tab]
  if (tab === 'products' && state.product) segments.push(encodeURIComponent(state.product))
  if (tab === 'news' && state.news) segments.push(encodeURIComponent(state.news))

  const params = new URLSearchParams()
  if (state.query?.trim()) params.set('q', state.query.trim())
  if (state.fit && state.fit !== 'all') params.set('fit', state.fit)
  if (tab === 'products' && state.expanded) params.set('view', 'full')

  const query = params.toString()
  return `#${segments.join('/')}${query ? `?${query}` : ''}`
}

function slugSegment(value: string) {
  return normalizeSearchText(value).replace(/\s+/g, '-').replace(/^-|-$/g, '') || 'news'
}

function newsEntryKey(item: NewsFeedEntry) {
  return item.key || `${item.productSlug}-${item.date || 'undated'}-${slugSegment(item.headline || 'news')}`
}

function formatCount(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border-l border-border pl-3">
      <div className="mono-label">{label}</div>
      <div className="mt-1 text-xl font-semibold leading-none">{value}</div>
    </div>
  )
}

function HelpLabel({ label, description, align = 'left' }: { label: string; description: string; align?: 'left' | 'right' }) {
  return (
    <span className="group relative inline-flex cursor-help items-center" tabIndex={0} title={description}>
      <span>{label}</span>
      <span
        className={cn(
          'pointer-events-none absolute bottom-full z-30 mb-2 w-64 rounded-md border border-border bg-card px-2.5 py-2 text-left font-sans text-xs font-normal normal-case leading-4 text-foreground opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus:opacity-100',
          align === 'right' ? 'right-0' : 'left-0',
        )}
      >
        {description}
      </span>
    </span>
  )
}

function SourceBadge({ tier }: { tier: string }) {
  const label = sourceTierLabels[tier] || tier || 'Unknown'
  const description = sourceTierDescriptions[tier] || 'Source provenance has not been classified yet.'

  return (
    <span className="group relative inline-flex cursor-help" tabIndex={0} title={description}>
      <Badge variant="outline">{label}</Badge>
      <span className="pointer-events-none absolute bottom-full left-0 z-30 mb-2 w-56 rounded-md border border-border bg-card px-2.5 py-2 text-left text-xs leading-4 text-foreground opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus:opacity-100">
        {description}
      </span>
    </span>
  )
}

function CategoryFitLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border px-3 py-2 text-xs text-muted-foreground">
      <span className="mono-label">Category match</span>
      <span>
        <span className="text-foreground">Primary</span> direct match
      </span>
      <span>
        <span className="text-foreground">Related suite</span> broader product suite
      </span>
      <span>
        <span className="text-foreground">Limited slice</span> partial workflow coverage
      </span>
    </div>
  )
}

function ProductTable({
  products,
  selected,
  onSelect,
}: {
  products: Product[]
  selected: string
  onSelect: (slug: string) => void
}) {
  return (
    <div className="overflow-auto">
      <table className="w-full table-fixed border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left mono-label">
            <th className="w-12 py-2 pr-3 font-medium">
              <HelpLabel label="#" description={columnHelp.rank} />
            </th>
            <th className="py-2 pr-3 font-medium">
              <HelpLabel label="Product" description={columnHelp.product} />
            </th>
            <th className="hidden w-36 py-2 pr-3 font-medium md:table-cell">
              <HelpLabel label="Category match" description={columnHelp.relationship} />
            </th>
            <th className="hidden w-24 py-2 pr-3 text-right font-medium md:table-cell">
              <HelpLabel label="Reviews" description={columnHelp.reviews} align="right" />
            </th>
            <th className="hidden w-32 py-2 pr-3 font-medium lg:table-cell">
              <HelpLabel label="Source" description={columnHelp.source} align="right" />
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const active = product.slug === selected
            const fit = getFit(product)
            return (
              <tr
                key={product.slug}
                className={cn(
                  'cursor-pointer border-b border-border/80 transition-colors hover:bg-muted/35',
                  active && 'bg-muted/55',
                )}
                onClick={() => onSelect(product.slug)}
              >
                <td className="py-2.5 pr-3 font-mono text-muted-foreground">{product.rank || '-'}</td>
                <td className="py-2.5 pr-3">
                  <div className="flex min-w-0 max-w-[calc(100vw-8rem)] items-center gap-2 md:max-w-none">
                    <div className="truncate font-medium leading-tight">{product.title}</div>
                    <Badge className="md:hidden" variant={fitVariant(fit)} title={relationshipDescriptions[fit]}>
                      {fitLabels[fit] || fit}
                    </Badge>
                  </div>
                  <div className="mt-0.5 max-w-[calc(100vw-8rem)] truncate font-mono text-xs text-muted-foreground md:max-w-none">
                    {product.vendorId} / {product.path}
                  </div>
                </td>
                <td className="hidden py-2.5 pr-3 md:table-cell">
                  <Badge variant={fitVariant(fit)} title={relationshipDescriptions[fit]}>
                    {fitLabels[fit] || fit}
                  </Badge>
                </td>
                <td className="hidden py-2.5 pr-3 text-right font-mono text-muted-foreground md:table-cell">
                  {product.reviewCount ? formatCount(product.reviewCount) : '-'}
                </td>
                <td className="hidden py-2.5 pr-3 lg:table-cell">
                  <SourceBadge tier={product.sourceTier} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

type FileTreeNode = {
  name: string
  path: string
  type: 'folder' | 'file'
  children: FileTreeNode[]
  file?: ProductFile
}

function sortFileTree(nodes: FileTreeNode[]) {
  nodes.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
    return a.name.localeCompare(b.name)
  })
  nodes.forEach((node) => sortFileTree(node.children))
}

function buildFileTree(files: ProductFile[]) {
  const root: FileTreeNode = { name: 'root', path: '', type: 'folder', children: [] }

  files.forEach((file) => {
    const parts = file.path.split('/').slice(3)
    let current = root

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1
      const nodePath = current.path ? `${current.path}/${part}` : part
      let next = current.children.find((child) => child.name === part && child.type === (isFile ? 'file' : 'folder'))

      if (!next) {
        next = {
          name: part,
          path: nodePath,
          type: isFile ? 'file' : 'folder',
          children: [],
          file: isFile ? file : undefined,
        }
        current.children.push(next)
      }

      if (isFile) {
        next.file = file
      } else {
        current = next
      }
    })
  })

  sortFileTree(root.children)
  return root.children
}

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

function isTableSeparator(line: string) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim())
}

function isMarkdownBoundary(line: string) {
  const trimmed = line.trim()
  return (
    !trimmed ||
    /^#{1,6}\s/.test(trimmed) ||
    /^[-*]\s+/.test(trimmed) ||
    /^\d+\.\s+/.test(trimmed) ||
    /^>\s?/.test(trimmed) ||
    /^```/.test(trimmed) ||
    /^\|/.test(trimmed) ||
    /^-{3,}$/.test(trimmed)
  )
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*)/g
  let cursor = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text))) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index))
    }

    if (match[2] && match[3]) {
      const href = match[3]
      const isExternal = /^https?:\/\//.test(href)
      nodes.push(
        isExternal ? (
          <a key={`${match.index}-link`} href={href} target="_blank" rel="noreferrer">
            {match[2]}
          </a>
        ) : (
          <span key={`${match.index}-link`} title={href}>
            {match[2]}
          </span>
        ),
      )
    } else if (match[4]) {
      nodes.push(<code key={`${match.index}-code`}>{match[4]}</code>)
    } else if (match[5]) {
      nodes.push(<strong key={`${match.index}-strong`}>{match[5]}</strong>)
    }

    cursor = match.index + match[0].length
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor))
  }

  return nodes
}

function MarkdownDocument({ markdown }: { markdown: string }) {
  const blocks = useMemo(() => {
    const lines = markdown.replace(/\r\n/g, '\n').split('\n')
    const rendered: ReactNode[] = []
    let index = 0

    while (index < lines.length) {
      const line = lines[index]
      const trimmed = line.trim()

      if (!trimmed) {
        index += 1
        continue
      }

      if (/^```/.test(trimmed)) {
        const language = trimmed.replace(/^```/, '').trim()
        const code: string[] = []
        index += 1
        while (index < lines.length && !/^```/.test(lines[index].trim())) {
          code.push(lines[index])
          index += 1
        }
        index += 1
        rendered.push(
          <pre key={`code-${index}`}>
            <code>{language ? `// ${language}\n${code.join('\n')}` : code.join('\n')}</code>
          </pre>,
        )
        continue
      }

      const heading = trimmed.match(/^(#{1,6})\s+(.*)$/)
      if (heading) {
        const level = heading[1].length
        const content = renderInline(heading[2])
        if (level === 1) rendered.push(<h1 key={`h-${index}`}>{content}</h1>)
        else if (level === 2) rendered.push(<h2 key={`h-${index}`}>{content}</h2>)
        else rendered.push(<h3 key={`h-${index}`}>{content}</h3>)
        index += 1
        continue
      }

      if (/^-{3,}$/.test(trimmed)) {
        rendered.push(<hr key={`hr-${index}`} />)
        index += 1
        continue
      }

      if (/^\|/.test(trimmed) && index + 1 < lines.length && isTableSeparator(lines[index + 1])) {
        const headers = splitTableRow(trimmed)
        const rows: string[][] = []
        index += 2
        while (index < lines.length && /^\|/.test(lines[index].trim())) {
          rows.push(splitTableRow(lines[index]))
          index += 1
        }
        rendered.push(
          <div key={`table-${index}`} className="markdown-table-wrap">
            <table>
              <thead>
                <tr>
                  {headers.map((header, headerIndex) => (
                    <th key={`${header}-${headerIndex}`}>{renderInline(header)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={`row-${rowIndex}`}>
                    {headers.map((_, cellIndex) => (
                      <td key={`${rowIndex}-${cellIndex}`}>{renderInline(row[cellIndex] || '')}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        )
        continue
      }

      if (/^[-*]\s+/.test(trimmed)) {
        const items: string[] = []
        while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
          items.push(lines[index].trim().replace(/^[-*]\s+/, ''))
          index += 1
        }
        rendered.push(
          <ul key={`ul-${index}`}>
            {items.map((item, itemIndex) => (
              <li key={`${item}-${itemIndex}`}>{renderInline(item)}</li>
            ))}
          </ul>,
        )
        continue
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        const items: string[] = []
        while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
          items.push(lines[index].trim().replace(/^\d+\.\s+/, ''))
          index += 1
        }
        rendered.push(
          <ol key={`ol-${index}`}>
            {items.map((item, itemIndex) => (
              <li key={`${item}-${itemIndex}`}>{renderInline(item)}</li>
            ))}
          </ol>,
        )
        continue
      }

      if (/^>\s?/.test(trimmed)) {
        const quote: string[] = []
        while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
          quote.push(lines[index].trim().replace(/^>\s?/, ''))
          index += 1
        }
        rendered.push(<blockquote key={`quote-${index}`}>{renderInline(quote.join(' '))}</blockquote>)
        continue
      }

      const paragraph: string[] = [trimmed]
      index += 1
      while (index < lines.length && !isMarkdownBoundary(lines[index])) {
        paragraph.push(lines[index].trim())
        index += 1
      }
      rendered.push(<p key={`p-${index}`}>{renderInline(paragraph.join(' '))}</p>)
    }

    return rendered
  }, [markdown])

  return <article className="markdown-doc">{blocks.length ? blocks : <p>No Markdown content captured.</p>}</article>
}

const editableProductFiles = new Set(['features.md', 'integrations.md', 'news.md', 'pricing.md', 'security-compliance.md', 'vendor-claims.md'])
const editableOwners = new Set(['shared', 'vendor'])

type ReviewSubmitResult = {
  prUrl?: string
  prNumber?: number
  branch?: string
}

function fileOwner(file?: ProductFile) {
  return String(file?.frontmatter?.owner || '').toLowerCase()
}

function canEditFile(file?: ProductFile) {
  if (!file) return false
  return editableProductFiles.has(file.name) && editableOwners.has(fileOwner(file))
}

function MarkdownEditPanel({
  file,
  initialContent,
  onCancel,
}: {
  file: ProductFile
  initialContent: string
  onCancel: () => void
}) {
  const [draft, setDraft] = useState(initialContent)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [organization, setOrganization] = useState('')
  const [summary, setSummary] = useState('')
  const [website, setWebsite] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReviewSubmitResult | null>(null)

  useEffect(() => {
    setDraft(initialContent)
    setResult(null)
    setError('')
  }, [file.path, initialContent])

  const changed = draft !== initialContent
  const canSubmit = changed && name.trim().length > 1 && email.includes('@') && summary.trim().length > 7 && !submitting

  const submitChange = async (event: FormEvent) => {
    event.preventDefault()
    if (!canSubmit) return

    setSubmitting(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/submit-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: file.path,
          content: draft,
          website,
          contributor: {
            name,
            email,
            organization,
            summary,
          },
        }),
      })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(payload.error || 'Could not submit change for review.')
      setResult(payload)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Could not submit change for review.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="grid min-h-[520px] gap-0 lg:grid-cols-[minmax(0,1fr)_300px]" onSubmit={submitChange}>
      <div className="min-w-0 border-b border-border lg:border-b-0 lg:border-r">
        <div className="border-b border-border px-3 py-2">
          <div className="mono-label">Markdown editor</div>
          <div className="mt-0.5 break-words font-mono text-xs text-muted-foreground">{file.path}</div>
        </div>
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          spellCheck={false}
          className="min-h-[640px] w-full resize-y bg-transparent p-3 font-mono text-xs leading-5 text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="grid content-start gap-3 p-3">
        <div>
          <div className="mono-label">Submitter</div>
          <div className="mt-2 grid gap-2">
            <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" />
            <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Work email" type="email" />
            <Input value={organization} onChange={(event) => setOrganization(event.target.value)} placeholder="Organization" />
            <input className="hidden" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} aria-hidden="true" />
          </div>
        </div>

        <div>
          <div className="mono-label">Change summary</div>
          <textarea
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            placeholder="What changed and why should a reviewer accept it?"
            className="mt-2 min-h-24 w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-sm leading-5 outline-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        <div className="rounded-md border border-border bg-muted/20 p-2 text-xs leading-5 text-muted-foreground">
          Editable scope: vendor and shared product files. G2-owned editorial files stay review-only here.
        </div>

        {error ? <div className="rounded-md border border-amber-500/30 bg-amber-500/10 p-2 text-xs leading-5 text-amber-300">{error}</div> : null}

        {result ? (
          <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-2 text-xs leading-5 text-emerald-300">
            PR created{result.prNumber ? ` #${result.prNumber}` : ''}.
            {result.prUrl ? (
              <a className="ml-1 underline underline-offset-4" href={result.prUrl} target="_blank" rel="noreferrer">
                Open review
              </a>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <Button type="submit" size="sm" disabled={!canSubmit}>
            {submitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            Submit change for review
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={onCancel}>
            <X className="h-3.5 w-3.5" />
            Close
          </Button>
        </div>
      </div>
    </form>
  )
}

function FileTreeList({
  nodes,
  selectedPath,
  onSelect,
  depth = 0,
}: {
  nodes: FileTreeNode[]
  selectedPath: string
  onSelect: (path: string) => void
  depth?: number
}) {
  return (
    <div className={cn(depth === 0 ? 'space-y-1' : 'mt-1 space-y-1')}>
      {nodes.map((node) => {
        if (node.type === 'folder') {
          return (
            <div key={node.path}>
              <div className="flex items-center gap-1 rounded px-1.5 py-1 font-mono text-xs text-muted-foreground" style={{ paddingLeft: `${0.375 + depth * 0.75}rem` }}>
                <ChevronRight className="h-3 w-3 rotate-90" />
                <Folder className="h-3.5 w-3.5" />
                <span className="truncate">{node.name}</span>
              </div>
              <FileTreeList nodes={node.children} selectedPath={selectedPath} onSelect={onSelect} depth={depth + 1} />
            </div>
          )
        }

        const active = node.file?.path === selectedPath
        return (
          <button
            key={node.path}
            type="button"
            className={cn(
              'flex w-full items-center gap-1.5 rounded px-1.5 py-1 text-left font-mono text-xs text-muted-foreground transition-colors hover:bg-muted/45 hover:text-foreground',
              active && 'bg-muted text-foreground',
            )}
            style={{ paddingLeft: `${0.625 + depth * 0.75}rem` }}
            onClick={() => node.file && onSelect(node.file.path)}
          >
            <File className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{node.name}</span>
          </button>
        )
      })}
    </div>
  )
}

function FileBrowser({ product, mode = 'compact' }: { product: Product; mode?: 'compact' | 'reader' }) {
  const defaultPath = product.files.find((file) => file.name === 'index.md')?.path || product.files[0]?.path || ''
  const [selectedPath, setSelectedPath] = useState(defaultPath)
  const [viewMode, setViewMode] = useState<'rendered' | 'raw'>('rendered')
  const [editorOpen, setEditorOpen] = useState(false)
  const fileTree = useMemo(() => buildFileTree(product.files), [product.files])
  const selectedFile = product.files.find((file) => file.path === selectedPath) || product.files[0]
  const selectedEditable = canEditFile(selectedFile)

  useEffect(() => {
    setSelectedPath(defaultPath)
    setEditorOpen(false)
  }, [defaultPath, product.slug])

  useEffect(() => {
    setEditorOpen(false)
  }, [selectedPath])

  return (
    <div
      className={cn(
        'grid overflow-hidden rounded-md border border-border bg-muted/10',
        mode === 'reader'
          ? 'min-h-[680px] lg:grid-cols-[280px_minmax(0,1fr)]'
          : 'min-h-[360px] lg:grid-cols-[260px_minmax(0,1fr)]',
      )}
    >
      <div className="min-w-0 border-b border-border lg:border-b-0 lg:border-r">
        <div className="border-b border-border px-3 py-2">
          <div className="mono-label">Files</div>
          <div className="mt-0.5 font-mono text-xs text-muted-foreground">{product.files.length} Markdown files</div>
        </div>
        <div className={cn('overflow-auto p-2', mode === 'reader' ? 'max-h-[680px]' : 'max-h-[520px]')}>
          {fileTree.length ? <FileTreeList nodes={fileTree} selectedPath={selectedFile?.path || ''} onSelect={setSelectedPath} /> : <div className="p-2 text-sm text-muted-foreground">No files captured.</div>}
        </div>
      </div>
      <div className="min-w-0">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2">
          <div className="min-w-0">
            <div className="min-w-0 truncate font-mono text-xs text-muted-foreground">{selectedFile?.path || 'No file selected'}</div>
            {mode === 'reader' ? <div className="mt-1 mono-label">Rendered Markdown</div> : null}
          </div>
          <div className="flex items-center gap-1.5">
            {selectedFile ? (
              <Button
                variant={editorOpen ? 'secondary' : 'outline'}
                size="sm"
                disabled={!selectedEditable}
                title={selectedEditable ? 'Edit this Markdown file' : `${fileOwner(selectedFile) || 'G2'}-owned file is review-only here`}
                onClick={() => {
                  setEditorOpen((value) => !value)
                  setViewMode('raw')
                }}
              >
                <PencilLine className="h-3.5 w-3.5" />
                Edit
              </Button>
            ) : null}
            <Button variant={viewMode === 'rendered' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('rendered')}>
              Rendered
            </Button>
            <Button variant={viewMode === 'raw' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('raw')}>
              Raw
            </Button>
            {selectedFile ? (
              <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(selectedFile.path)}>
                <Copy className="h-3.5 w-3.5" />
              </Button>
            ) : null}
          </div>
        </div>
        <div className={cn('overflow-auto', mode === 'reader' ? 'max-h-[680px]' : 'max-h-[520px]')}>
          {selectedFile && editorOpen ? (
            <MarkdownEditPanel file={selectedFile} initialContent={selectedFile.raw || selectedFile.content || ''} onCancel={() => setEditorOpen(false)} />
          ) : viewMode === 'rendered' ? (
            <MarkdownDocument markdown={selectedFile?.content || ''} />
          ) : (
            <pre className="whitespace-pre-wrap break-words p-3 font-mono text-[11px] leading-5 text-muted-foreground">
              {selectedFile?.raw || selectedFile?.content || 'No file content captured.'}
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}

function ProductTabs({ product, vendor, includeFiles = true }: { product: Product; vendor?: Vendor; includeFiles?: boolean }) {
  const fit = getFit(product)
  const productNews = useMemo(
    () =>
      product.news.map((item) => ({
        ...item,
        productSlug: product.slug,
        productTitle: product.title,
        productPath: product.path,
        vendorId: product.vendorId,
        category: product.displayCategory,
      })),
    [product],
  )

  return (
    <Tabs defaultValue="overview" className="min-w-0">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="evidence">Evidence</TabsTrigger>
        <TabsTrigger value="news">News</TabsTrigger>
        {includeFiles ? <TabsTrigger value="files">Files</TabsTrigger> : null}
      </TabsList>

      <TabsContent value="overview">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
          <div className="space-y-3">
            <div>
              <div className="mono-label">Profile</div>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{product.profile || product.description}</p>
            </div>
            <div>
              <div className="mono-label">Buyer fit</div>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{product.buyerFit || 'Not captured yet.'}</p>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-md border border-border bg-muted/20 p-3 text-sm lg:grid-cols-1">
            <div>
              <dt className="mono-label">Vendor</dt>
              <dd className="mt-1">{vendor?.title || product.vendorId}</dd>
            </div>
            <div>
              <dt className="mono-label">Category match</dt>
              <dd className="mt-1">
                <Badge variant={fitVariant(fit)}>{fitLabels[fit] || fit}</Badge>
                <div className="mt-1 text-xs leading-4 text-muted-foreground">{relationshipDescriptions[fit] || 'Category relationship is not classified yet.'}</div>
              </dd>
            </div>
            <div>
              <dt className="mono-label">Reviews</dt>
              <dd className="mt-1 font-mono">{product.reviewCount ? formatCount(product.reviewCount) : '-'}</dd>
            </div>
            <div>
              <dt className="mono-label">Observed</dt>
              <dd className="mt-1 font-mono">{product.observedAt || '-'}</dd>
            </div>
          </dl>
        </div>
      </TabsContent>

      <TabsContent value="evidence">
        <div className="grid gap-4 lg:grid-cols-2">
          <SignalList title="Review-derived strengths" items={product.strengths} icon="good" />
          <SignalList title="Review-derived cautions" items={product.cautions} icon="warn" />
        </div>
        <div className="mt-4 overflow-hidden rounded-md border border-border">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20 text-left mono-label">
                <th className="px-3 py-2 font-medium">Capability</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Evidence</th>
              </tr>
            </thead>
            <tbody>
              {product.features.slice(0, 7).map((feature) => (
                <tr key={`${product.slug}-${feature.capability}`} className="border-b border-border/80 last:border-0">
                  <td className="px-3 py-2">{feature.capability}</td>
                  <td className="px-3 py-2 text-muted-foreground">{feature.status}</td>
                  <td className="px-3 py-2">
                    <Badge variant="muted">{feature.evidence}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>

      <TabsContent value="news">
        <NewsItems items={productNews} />
      </TabsContent>

      {includeFiles ? (
        <TabsContent value="files">
          <FileBrowser product={product} />
        </TabsContent>
      ) : null}
    </Tabs>
  )
}

function ProductDetail({
  product,
  vendor,
  expanded,
  onToggleExpanded,
}: {
  product: Product
  vendor?: Vendor
  expanded: boolean
  onToggleExpanded: () => void
}) {
  const fit = getFit(product)

  return (
    <section className={cn('dense-panel self-start overflow-hidden', expanded && 'min-w-0')}>
      <div className="border-b border-border px-4 py-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold leading-tight">{product.title}</h2>
              <Badge variant={fitVariant(fit)} title={relationshipDescriptions[fit]}>
                {fitLabels[fit] || fit}
              </Badge>
              <SourceBadge tier={product.sourceTier} />
            </div>
            <div className="mt-1 truncate font-mono text-xs text-muted-foreground">{product.path}</div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={onToggleExpanded}>
              {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              {expanded ? 'Collapse' : 'Expand'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(product.path)}>
              <Copy className="h-3.5 w-3.5" />
              Path
            </Button>
            {product.resource ? (
              <Button variant="outline" size="sm" asChild>
                <a href={product.resource} target="_blank" rel="noreferrer">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  G2
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {expanded ? (
        <div className="min-w-0 p-4">
          <FileBrowser product={product} mode="reader" />
        </div>
      ) : (
        <div className="px-4 py-3">
          <ProductTabs product={product} vendor={vendor} />
        </div>
      )}
    </section>
  )
}

function SignalList({ title, items, icon }: { title: string; items: readonly string[]; icon: 'good' | 'warn' }) {
  return (
    <div className="rounded-md border border-border bg-muted/20 p-3">
      <div className="flex items-center gap-2 mono-label">
        {icon === 'good' ? <BadgeCheck className="h-3.5 w-3.5 text-emerald-300" /> : <CircleDot className="h-3.5 w-3.5 text-amber-300" />}
        {title}
      </div>
      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
        {(items.length ? items : ['Not captured yet.']).map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function NewsItems({
  items,
  onOpenNews,
  onOpenProduct,
}: {
  items: readonly NewsFeedEntry[]
  onOpenNews?: (item: NewsFeedEntry) => void
  onOpenProduct?: (slug: string) => void
}) {
  if (!items.length) {
    return (
      <div className="dense-panel p-4 text-sm text-muted-foreground">
        No product news entries match the current filter.
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      {items.map((item, index) => {
        const sourceUrl = item.sourceUrl || ''
        const hasPrimaryAction = Boolean(onOpenNews || sourceUrl)
        const openNews = () => {
          if (onOpenNews) onOpenNews(item)
          else if (sourceUrl) window.open(sourceUrl, '_blank', 'noopener,noreferrer')
        }

        return (
          <article
            key={`${item.productSlug}-${item.date}-${item.headline}-${index}`}
            className={cn('dense-panel p-4', hasPrimaryAction && 'cursor-pointer transition-colors hover:border-foreground/40')}
            role={hasPrimaryAction ? 'link' : undefined}
            tabIndex={hasPrimaryAction ? 0 : undefined}
            onClick={(event) => {
              if (!hasPrimaryAction || (event.target as HTMLElement).closest('a,button')) return
              openNews()
            }}
            onKeyDown={(event) => {
              if (!hasPrimaryAction || (event.target as HTMLElement).closest('a,button')) return
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                openNews()
              }
            }}
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="font-mono text-xs text-muted-foreground">{item.date || 'undated'}</div>
                  <Badge variant="muted">{item.type || 'news'}</Badge>
                  <Badge variant={item.status === 'accepted' ? 'core' : 'outline'}>{item.status || 'proposed'}</Badge>
                </div>
                <h2 className="mt-2 text-lg font-semibold leading-tight">
                  {onOpenNews ? (
                    <button type="button" className="text-left transition-colors hover:text-foreground hover:underline" onClick={() => openNews()}>
                      {item.headline || 'Untitled news item'}
                    </button>
                  ) : sourceUrl ? (
                    <a className="transition-colors hover:text-foreground hover:underline" href={sourceUrl} target="_blank" rel="noreferrer">
                      {item.headline || 'Untitled news item'}
                    </a>
                  ) : (
                    item.headline || 'Untitled news item'
                  )}
                </h2>
                <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">{item.buyerRelevance || 'No buyer relevance summary captured yet.'}</p>
                {item.sourceNote ? <p className="mt-2 max-w-4xl text-xs leading-5 text-muted-foreground">Source: {item.sourceNote}</p> : null}
                <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                  <span>{item.productTitle}</span>
                  <span>/</span>
                  <span>{item.vendorId}</span>
                  <span>/</span>
                  <span>{item.category}</span>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {sourceUrl ? (
                  <Button variant="outline" size="sm" asChild>
                    <a href={sourceUrl} target="_blank" rel="noreferrer">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      {item.sourceLabel || 'Source'}
                    </a>
                  </Button>
                ) : null}
                {onOpenProduct ? (
                  <Button variant="outline" size="sm" onClick={() => onOpenProduct(item.productSlug)}>
                    <FileText className="h-3.5 w-3.5" />
                    Product
                  </Button>
                ) : null}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function InlineMarkdown({ text }: { text: string }) {
  const parts: ReactNode[] = []
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g
  let lastIndex = 0

  for (const match of text.matchAll(linkPattern)) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    parts.push(
      <a key={`${match[2]}-${match.index}`} className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground" href={match[2]} target="_blank" rel="noreferrer">
        {match[1]}
      </a>,
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return <>{parts}</>
}

function NewsArticle({ markdown }: { markdown: string }) {
  const blocks = markdown.trim().split(/\n{2,}/).map((block) => block.trim()).filter(Boolean)

  if (!blocks.length) {
    return <p className="text-sm leading-6 text-muted-foreground">No long-form brief captured yet.</p>
  }

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        const lines = block.split('\n').map((line) => line.trim()).filter(Boolean)
        const bulletLines = lines.filter((line) => line.startsWith('- '))

        if (bulletLines.length === lines.length) {
          return (
            <ul key={`${block}-${index}`} className="space-y-2 text-sm leading-6 text-muted-foreground">
              {bulletLines.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                  <span><InlineMarkdown text={line.slice(2)} /></span>
                </li>
              ))}
            </ul>
          )
        }

        return (
          <p key={`${block}-${index}`} className="max-w-4xl text-base leading-7 text-foreground">
            <InlineMarkdown text={lines.join(' ')} />
          </p>
        )
      })}
    </div>
  )
}

function NewsDetail({
  item,
  onBack,
  onOpenProduct,
}: {
  item: NewsFeedEntry
  onBack: () => void
  onOpenProduct: (slug: string) => void
}) {
  return (
    <section className="dense-panel overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground" onClick={onBack}>
              News feed
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground">{item.date || 'undated'}</span>
            <Badge variant="muted">{item.type || 'news'}</Badge>
            <Badge variant={item.status === 'accepted' ? 'core' : 'outline'}>{item.status || 'proposed'}</Badge>
          </div>
          <h2 className="mt-3 max-w-5xl text-2xl font-semibold leading-tight">{item.headline || 'Untitled news item'}</h2>
          <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
            <span>{item.productTitle}</span>
            <span>/</span>
            <span>{item.vendorId}</span>
            <span>/</span>
            <span>{item.category}</span>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {item.sourceUrl ? (
            <Button variant="outline" size="sm" asChild>
              <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                <ArrowUpRight className="h-3.5 w-3.5" />
                {item.sourceLabel || 'Source'}
              </a>
            </Button>
          ) : null}
          <Button variant="outline" size="sm" onClick={() => onOpenProduct(item.productSlug)}>
            <FileText className="h-3.5 w-3.5" />
            Product
          </Button>
        </div>
      </div>
      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-4">
          <div>
            <div className="mono-label">Brief</div>
            <div className="mt-3">
              <NewsArticle markdown={item.article || item.buyerRelevance} />
            </div>
          </div>
          <div>
            <div className="mono-label">Source and buyer signal</div>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">{item.sourceNote || 'No source note captured yet.'}</p>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">{item.buyerRelevance || 'No buyer relevance summary captured yet.'}</p>
          </div>
        </div>
        <div className="grid content-start gap-3 rounded-md border border-border bg-muted/10 p-3 text-sm">
          <MetaBlock label="Product" value={item.productTitle} />
          <MetaBlock label="Vendor" value={item.vendorId} />
          <MetaBlock label="Category" value={item.category} />
          <MetaBlock label="Status" value={item.status || 'proposed'} />
          <MetaBlock label="Registry key" value={newsEntryKey(item)} />
        </div>
      </div>
    </section>
  )
}

function NewsView({
  news,
  query,
  selectedNewsKey,
  onOpenNews,
  onCloseNews,
  onOpenProduct,
}: {
  news: readonly NewsFeedEntry[]
  query: string
  selectedNewsKey: string
  onOpenNews: (item: NewsFeedEntry) => void
  onCloseNews: () => void
  onOpenProduct: (slug: string) => void
}) {
  const filteredNews = useMemo(() => {
    const normalized = normalizeSearchText(query)
    if (!normalized) return [...news]
    return news
      .map((item) => ({
        item,
        score: searchScore(newsSearchText(item), query),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || String(b.item.date).localeCompare(String(a.item.date)))
      .map(({ item }) => item)
  }, [news, query])
  const selectedNews = selectedNewsKey ? news.find((item) => newsEntryKey(item) === selectedNewsKey) : undefined

  if (selectedNews) {
    return <NewsDetail item={selectedNews} onBack={onCloseNews} onOpenProduct={onOpenProduct} />
  }

  return (
    <section className="grid gap-3">
      <div className="dense-panel p-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mono-label">Product news feed</div>
            <h2 className="mt-1 text-xl font-semibold">Buyer-relevant product updates</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Product launches, feature releases, acquisitions, partnerships, and other sourced updates from each product folder's <span className="font-mono">news.md</span>. Vendor PR teams can propose rows, and G2 reviews source quality and neutral buyer framing before merge.
            </p>
          </div>
          <div className="font-mono text-xs text-muted-foreground">{filteredNews.length} entries</div>
        </div>
      </div>
      <NewsItems items={filteredNews} onOpenNews={onOpenNews} onOpenProduct={onOpenProduct} />
    </section>
  )
}

function CategoryView({ categories }: { categories: readonly Category[] }) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {categories.map((category) => (
        <section key={category.slug} className="dense-panel p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Tags className="h-4 w-4 text-muted-foreground" />
                <h2 className="font-semibold">{category.title}</h2>
                <SourceBadge tier={category.sourceTier} />
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{category.description}</p>
            </div>
            <Badge variant="muted">{category.status || 'draft'}</Badge>
          </div>
          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
            <MetaBlock label="Parents" value={category.parents.join(', ') || '-'} />
            <MetaBlock label="Children" value={category.children.join(', ') || '-'} />
            <MetaBlock label="Products" value={String(category.productRows.length)} />
          </div>
        </section>
      ))}
    </div>
  )
}

function VendorView({ vendors }: { vendors: readonly Vendor[] }) {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full min-w-[680px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/20 text-left mono-label">
            <th className="px-3 py-2 font-medium">Vendor</th>
            <th className="px-3 py-2 font-medium">Source</th>
            <th className="px-3 py-2 font-medium">Products</th>
            <th className="px-3 py-2 font-medium">Path</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.slug} className="border-b border-border/80 last:border-0">
              <td className="px-3 py-2 font-medium">{vendor.title}</td>
              <td className="px-3 py-2">
                <SourceBadge tier={vendor.sourceTier} />
              </td>
              <td className="px-3 py-2 text-muted-foreground">{vendor.products.map((product) => cleanMarkdownLink(product.product)).join(', ')}</td>
              <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{vendor.path}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function DocsView() {
  const docs = [
    ['Agent Consumption Guide', 'docs/agent-consumption-guide.md', 'How buyer agents read source tiers, freshness, comparisons, and refusals.'],
    ['Taxonomy Model', 'docs/taxonomy.md', 'Graph and facet model for categories, capabilities, and buyer context.'],
    ['Product Folder Contract', 'docs/product-folder-contract.md', 'Required files, ownership, and frontmatter for each product folder.'],
    ['Governance Model', 'docs/governance.md', 'Vendor PR flow, dispute handling, freshness policy, and CI checks.'],
    ['Source Tiers', 'docs/source-tiers.md', 'Registry-wide provenance vocabulary for agent-readable claims.'],
  ] as const

  return (
    <div className="grid gap-2">
      {docs.map(([title, path, description]) => (
        <div key={path} className="flex flex-col gap-2 rounded-md border border-border bg-muted/20 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-medium">{title}</div>
            <div className="mt-0.5 text-sm text-muted-foreground">{description}</div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            {path}
          </div>
        </div>
      ))}
    </div>
  )
}

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-md border border-border bg-muted/20 p-2">
      <div className="mono-label">{label}</div>
      <div className="mt-1 min-w-0 break-words [overflow-wrap:anywhere]">{value}</div>
    </div>
  )
}

function App() {
  const initialHashState = useMemo(() => readAppHash(), [])
  const products = useMemo(() => [...registryData.products].sort((a, b) => {
    if (!a.rank && !b.rank) return a.title.localeCompare(b.title)
    if (!a.rank) return 1
    if (!b.rank) return -1
    return a.rank - b.rank
  }), [])
  const [query, setQuery] = useState(initialHashState.query)
  const [fit, setFit] = useState<FitFilter>(initialHashState.fit)
  const [selectedSlug, setSelectedSlug] = useState<string>(initialHashState.product || products[0]?.slug || '')
  const [selectedNewsKey, setSelectedNewsKey] = useState<string>(initialHashState.news || '')
  const [detailExpanded, setDetailExpanded] = useState(initialHashState.expanded)
  const [activeTab, setActiveTab] = useState<AppTab>(initialHashState.tab)
  const vendorBySlug = useMemo(() => new Map(registryData.vendors.map((vendor) => [vendor.slug, vendor])), [])
  const productSearchIndex = useMemo(
    () => new Map(products.map((product) => [product.slug, productSearchText(product, vendorBySlug.get(product.vendorId))])),
    [products, vendorBySlug],
  )

  const writeHash = (overrides: Partial<AppHashState>, mode: 'push' | 'replace' = 'push') => {
    if (typeof window === 'undefined') return
    const hash = buildAppHash({
      tab: activeTab,
      product: selectedSlug,
      news: selectedNewsKey,
      query,
      fit,
      expanded: detailExpanded,
      ...overrides,
    })
    if (window.location.hash === hash) return
    const url = `${window.location.pathname}${window.location.search}${hash}`
    if (mode === 'replace') window.history.replaceState(null, '', url)
    else window.history.pushState(null, '', url)
  }

  useEffect(() => {
    const applyHash = () => {
      const state = readAppHash()
      setActiveTab(state.tab)
      setQuery(state.query)
      setFit(state.fit)
      setDetailExpanded(state.expanded)
      setSelectedNewsKey(state.news || '')
      if (state.product) setSelectedSlug(state.product)
      else if (state.tab === 'products') setSelectedSlug(products[0]?.slug || '')
    }

    window.addEventListener('hashchange', applyHash)
    window.addEventListener('popstate', applyHash)
    return () => {
      window.removeEventListener('hashchange', applyHash)
      window.removeEventListener('popstate', applyHash)
    }
  }, [products])

  const filteredProducts = useMemo(() => {
    const normalized = normalizeSearchText(query)
    return products
      .map((product) => ({
        product,
        score: searchScore(productSearchIndex.get(product.slug) || '', query),
      }))
      .filter(({ product, score }) => {
        const productFit = getFit(product)
        const matchesFit = fit === 'all' || productFit === fit
        const matchesQuery = !normalized || score > 0
        return matchesFit && matchesQuery
      })
      .sort((a, b) => {
        if (!normalized) return 0
        return b.score - a.score || a.product.rank - b.product.rank || a.product.title.localeCompare(b.product.title)
      })
      .map(({ product }) => product)
  }, [fit, productSearchIndex, products, query])

  const selectedProduct = filteredProducts.find((product) => product.slug === selectedSlug) || filteredProducts[0] || products.find((product) => product.slug === selectedSlug) || products[0]
  const selectedVendor = selectedProduct ? vendorBySlug.get(selectedProduct.vendorId) : undefined
  const selectProduct = (slug: string, expanded = detailExpanded) => {
    setSelectedSlug(slug)
    setActiveTab('products')
    setDetailExpanded(expanded)
    setSelectedNewsKey('')
    writeHash({ tab: 'products', product: slug, expanded }, 'push')
  }
  const openProduct = (slug: string) => {
    selectProduct(slug, true)
  }
  const openNews = (item: NewsFeedEntry) => {
    const key = newsEntryKey(item)
    setSelectedNewsKey(key)
    setActiveTab('news')
    setDetailExpanded(false)
    writeHash({ tab: 'news', news: key, expanded: false }, 'push')
  }
  const closeNews = () => {
    setSelectedNewsKey('')
    setActiveTab('news')
    setDetailExpanded(false)
    writeHash({ tab: 'news', news: undefined, expanded: false }, 'push')
  }
  const changeTab = (value: string) => {
    if (!validTab(value)) return
    setActiveTab(value)
    setSelectedNewsKey('')
    if (value !== 'products') setDetailExpanded(false)
    writeHash({ tab: value, news: undefined, expanded: value === 'products' ? detailExpanded : false }, 'push')
  }
  const changeQuery = (value: string) => {
    setQuery(value)
    if (activeTab === 'news') setSelectedNewsKey('')
    writeHash({ query: value, product: activeTab === 'products' ? undefined : selectedSlug, news: activeTab === 'news' ? undefined : selectedNewsKey }, 'replace')
  }
  const changeFit = (value: FitFilter) => {
    setFit(value)
    if (activeTab === 'news') setSelectedNewsKey('')
    writeHash({ fit: value, product: activeTab === 'products' ? undefined : selectedSlug, news: activeTab === 'news' ? undefined : selectedNewsKey }, 'replace')
  }
  const toggleDetailExpanded = () => {
    const nextExpanded = !detailExpanded
    setDetailExpanded(nextExpanded)
    setActiveTab('products')
    setSelectedNewsKey('')
    writeHash({ tab: 'products', product: selectedProduct?.slug || selectedSlug, expanded: nextExpanded }, 'push')
  }
  const goHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setActiveTab('products')
    setQuery('')
    setFit('all')
    setSelectedSlug(products[0]?.slug || '')
    setSelectedNewsKey('')
    setDetailExpanded(false)
    writeHash({ tab: 'products', product: undefined, news: undefined, query: '', fit: 'all', expanded: false }, 'push')
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
          <a href="#products" className="flex items-center gap-3" onClick={goHome}>
            <div className="flex h-6 w-6 items-center justify-center border border-foreground text-[10px] font-bold">G2</div>
            <span className="text-base font-semibold">G2 Agents</span>
          </a>
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground sm:flex">
            <a className="transition-colors hover:text-foreground" href="#products">Products</a>
            <a className="transition-colors hover:text-foreground" href="#news">News</a>
            <a className="transition-colors hover:text-foreground" href="#categories">Categories</a>
            <a className="transition-colors hover:text-foreground" href="#docs">Docs</a>
            <a className="transition-colors hover:text-foreground" href="https://github.com/g2crowd/g2agents" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className={cn('mx-auto overflow-x-hidden px-4 py-4', detailExpanded ? 'max-w-[1680px]' : 'max-w-7xl')}>
        <section className="grid min-w-0 gap-5 border-b border-border pb-4 lg:grid-cols-[360px_1fr]">
          <a
            href="#products"
            className="block min-w-0 rounded-md transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onClick={goHome}
            aria-label="Return to G2 Agents home"
          >
            <pre className="select-none overflow-hidden font-mono text-[19px] font-semibold leading-[0.9] text-foreground sm:text-[24px]">
{` ██████╗ ██████╗
██╔════╝ ╚════██╗
██║  ███╗ █████╔╝
██║   ██║██╔═══╝
╚██████╔╝███████╗
 ╚═════╝ ╚══════╝`}
            </pre>
            <div className="mt-2 font-mono text-sm uppercase text-foreground">Agent-readable software buying</div>
          </a>
          <div className="grid min-w-0 content-start gap-4">
            <p className="w-[calc(100vw-3rem)] max-w-3xl text-xl leading-tight text-muted-foreground sm:w-auto sm:text-2xl">
              Browse G2 product knowledge as versioned Markdown: category graph, product dossiers, source tiers, review signals, and vendor claim slots.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              <Stat label="Products" value={registryData.stats.products} />
              <Stat label="Categories" value={registryData.stats.categories} />
              <Stat label="Vendors" value={registryData.stats.vendors} />
              <Stat label="News" value={registryData.stats.newsItems} />
              <Stat label="Product files" value={registryData.stats.files} />
            </div>
          </div>
        </section>

        <Tabs value={activeTab} onValueChange={changeTab} className="mt-4">
          <div className="flex flex-col gap-3 border-b border-border pb-3 lg:flex-row lg:items-center lg:justify-between">
            <TabsList>
              <TabsTrigger value="products">
                <Boxes className="mr-1.5 h-3.5 w-3.5" />
                Products
              </TabsTrigger>
              <TabsTrigger value="news">
                <Newspaper className="mr-1.5 h-3.5 w-3.5" />
                News
              </TabsTrigger>
              <TabsTrigger value="categories">
                <GitBranch className="mr-1.5 h-3.5 w-3.5" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="vendors">
                <Building2 className="mr-1.5 h-3.5 w-3.5" />
                Vendors
              </TabsTrigger>
              <TabsTrigger value="docs">
                <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                Docs
              </TabsTrigger>
            </TabsList>

            <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative min-w-0 sm:min-w-[260px]">
                <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => changeQuery(event.target.value)}
                  placeholder="Search products, vendors, files..."
                  className="pl-8 font-mono"
                />
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="mono-label hidden sm:inline">Category match</span>
                {fitOrder.slice(0, 4).map((option) => (
                  <Button
                    key={option}
                    variant={fit === option ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => changeFit(option)}
                  >
                    {fitLabels[option]}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <TabsContent value="products" id="products">
            {selectedProduct && detailExpanded ? (
              <ProductDetail
                product={selectedProduct}
                vendor={selectedVendor}
                expanded={detailExpanded}
                onToggleExpanded={toggleDetailExpanded}
              />
            ) : (
              <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_520px]">
                <section className="dense-panel min-w-0 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-border px-3 py-2">
                    <div className="mono-label">{filteredProducts.length} products</div>
                    <div className="font-mono text-xs text-muted-foreground">seed order: category page</div>
                  </div>
                  <CategoryFitLegend />
                  <ProductTable products={filteredProducts} selected={selectedProduct?.slug || ''} onSelect={(slug) => selectProduct(slug, false)} />
                </section>
                {selectedProduct ? (
                  <ProductDetail
                    product={selectedProduct}
                    vendor={selectedVendor}
                    expanded={detailExpanded}
                    onToggleExpanded={toggleDetailExpanded}
                  />
                ) : null}
              </div>
            )}
          </TabsContent>

          <TabsContent value="news" id="news">
            <NewsView
              news={registryData.news}
              query={query}
              selectedNewsKey={selectedNewsKey}
              onOpenNews={openNews}
              onCloseNews={closeNews}
              onOpenProduct={openProduct}
            />
          </TabsContent>

          <TabsContent value="categories" id="categories">
            <CategoryView categories={registryData.categories} />
          </TabsContent>

          <TabsContent value="vendors">
            <VendorView vendors={registryData.vendors} />
          </TabsContent>

          <TabsContent value="docs" id="docs">
            <DocsView />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App
