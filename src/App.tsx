import { useEffect, useMemo, useState, type ReactNode } from 'react'
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
  Maximize2,
  Minimize2,
  Search,
  ShieldCheck,
  Tags,
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
  stats: RegistryData['stats']
}

const registryData = registry as unknown as Registry

const fitOrder = ['all', 'core', 'adjacent', 'partial', 'legacy', 'vendor-claimed', 'disputed'] as const
const fitLabels: Record<string, string> = {
  all: 'All',
  core: 'Core',
  adjacent: 'Adjacent',
  partial: 'Partial',
  legacy: 'Legacy',
  'vendor-claimed': 'Vendor claimed',
  disputed: 'Disputed',
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
  core: 'Primary product for the current category.',
  adjacent: 'Relevant to the category through a broader suite or neighboring workflow.',
  partial: 'Covers part of the category use case, but is not primarily built for it.',
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
  relationship: 'Static category membership: core, adjacent, or partial. This is not based on your current search.',
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
              <HelpLabel label="Relationship" description={columnHelp.relationship} />
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
  const fileTree = useMemo(() => buildFileTree(product.files), [product.files])
  const selectedFile = product.files.find((file) => file.path === selectedPath) || product.files[0]

  useEffect(() => {
    setSelectedPath(defaultPath)
  }, [defaultPath, product.slug])

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
          {viewMode === 'rendered' ? (
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

  return (
    <Tabs defaultValue="overview" className="min-w-0">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="evidence">Evidence</TabsTrigger>
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
              <dt className="mono-label">Relationship</dt>
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
    <div className="rounded-md border border-border bg-muted/20 p-2">
      <div className="mono-label">{label}</div>
      <div className="mt-1 truncate">{value}</div>
    </div>
  )
}

function App() {
  const products = [...registryData.products].sort((a, b) => {
    if (!a.rank && !b.rank) return a.title.localeCompare(b.title)
    if (!a.rank) return 1
    if (!b.rank) return -1
    return a.rank - b.rank
  })
  const [query, setQuery] = useState('')
  const [fit, setFit] = useState<(typeof fitOrder)[number]>('all')
  const [selectedSlug, setSelectedSlug] = useState<string>(products[0]?.slug || '')
  const [detailExpanded, setDetailExpanded] = useState(false)

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return products.filter((product) => {
      const productFit = getFit(product)
      const matchesFit = fit === 'all' || productFit === fit
      const matchesQuery =
        !normalized ||
        [product.title, product.vendorId, product.description, product.profile, product.buyerFit, product.path]
          .join(' ')
          .toLowerCase()
          .includes(normalized)
      return matchesFit && matchesQuery
    })
  }, [fit, products, query])

  const selectedProduct = products.find((product) => product.slug === selectedSlug) || filteredProducts[0] || products[0]
  const selectedVendor = registryData.vendors.find((vendor) => vendor.slug === selectedProduct?.vendorId)

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center border border-foreground text-[10px] font-bold">G2</div>
            <span className="text-base font-semibold">G2 Agents</span>
          </a>
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground sm:flex">
            <a className="transition-colors hover:text-foreground" href="#products">Products</a>
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
          <div className="min-w-0">
            <pre className="select-none overflow-hidden font-mono text-[19px] font-semibold leading-[0.9] text-foreground sm:text-[24px]">
{` ██████╗ ██████╗
██╔════╝ ╚════██╗
██║  ███╗ █████╔╝
██║   ██║██╔═══╝
╚██████╔╝███████╗
 ╚═════╝ ╚══════╝`}
            </pre>
            <div className="mt-2 font-mono text-sm uppercase text-foreground">Agent-readable software buying</div>
          </div>
          <div className="grid min-w-0 content-start gap-4">
            <p className="w-[calc(100vw-3rem)] max-w-3xl text-xl leading-tight text-muted-foreground sm:w-auto sm:text-2xl">
              Browse G2 product knowledge as versioned Markdown: category graph, product dossiers, source tiers, review signals, and vendor claim slots.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="Products" value={registryData.stats.products} />
              <Stat label="Categories" value={registryData.stats.categories} />
              <Stat label="Vendors" value={registryData.stats.vendors} />
              <Stat label="Product files" value={registryData.stats.files} />
            </div>
          </div>
        </section>

        <Tabs defaultValue="products" className="mt-4">
          <div className="flex flex-col gap-3 border-b border-border pb-3 lg:flex-row lg:items-center lg:justify-between">
            <TabsList>
              <TabsTrigger value="products">
                <Boxes className="mr-1.5 h-3.5 w-3.5" />
                Products
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
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products, vendors, files..."
                  className="pl-8 font-mono"
                />
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="mono-label hidden sm:inline">Relationship</span>
                {fitOrder.slice(0, 4).map((option) => (
                  <Button
                    key={option}
                    variant={fit === option ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setFit(option)}
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
                onToggleExpanded={() => setDetailExpanded((value) => !value)}
              />
            ) : (
              <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_520px]">
                <section className="dense-panel min-w-0 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-border px-3 py-2">
                    <div className="mono-label">{filteredProducts.length} products</div>
                    <div className="font-mono text-xs text-muted-foreground">seed order: category page</div>
                  </div>
                  <ProductTable products={filteredProducts} selected={selectedProduct?.slug || ''} onSelect={setSelectedSlug} />
                </section>
                {selectedProduct ? (
                  <ProductDetail
                    product={selectedProduct}
                    vendor={selectedVendor}
                    expanded={detailExpanded}
                    onToggleExpanded={() => setDetailExpanded((value) => !value)}
                  />
                ) : null}
              </div>
            )}
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
