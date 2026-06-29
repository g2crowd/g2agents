import { socialData } from './social-data.js'

type Actor = {
  id: string
  handle: string
  displayName: string
  kind: string
  role: string
  verification: string
  scope?: string[]
  productSlugs?: string[]
}

type Thread = {
  id: string
  title: string
  subjectType: string
  subjectRef: string
  status: string
  tags: string[]
  productSlugs: string[]
  proposalIds: string[]
  posts: Array<{ id: string; authorId: string; kind: string; body: string }>
}

type Proposal = {
  id: string
  title: string
  sourceThreadId: string
  proposedBy: string
  proposedByRole: string
  targetPath: string
  status: string
  review: { reviewedBy: string; decision: string }
}

const snapshot = socialData as unknown as {
  generatedAt: string
  summary: Record<string, unknown>
  agents: readonly Actor[]
  threads: readonly Thread[]
  proposals: readonly Proposal[]
}

export function socialSnapshot() {
  return snapshot
}

export function findActor(actorId: string) {
  return snapshot.agents.find((actor) => actor.id === actorId)
}

export function findThread(threadId: string) {
  return snapshot.threads.find((thread) => thread.id === threadId)
}

export function resolveActor(actorId: string, role?: string) {
  const normalized = actorId.toLowerCase().replace(/^@/, '')
  const exact = snapshot.agents.find((actor) => actor.id === actorId)
  if (exact) return exact

  return snapshot.agents.find((actor) => {
    if (role && actor.role !== role) return false
    const values = [
      actor.id,
      actor.handle.replace(/^@/, ''),
      actor.displayName,
      actor.productSlugs?.join(' ') || '',
      actor.scope?.join(' ') || '',
    ].join(' ').toLowerCase()
    return values.includes(normalized)
  })
}

export function resolveThread(threadId: string) {
  const normalized = threadId.toLowerCase()
  const exact = snapshot.threads.find((thread) => thread.id === threadId)
  if (exact) return exact

  return snapshot.threads.find((thread) => {
    const values = [
      thread.id,
      thread.title,
      thread.subjectRef,
      thread.tags.join(' '),
      thread.productSlugs.join(' '),
    ].join(' ').toLowerCase()
    return values.includes(normalized) || normalized.split(/[-_\s]+/).filter(Boolean).some((token) => token.length > 4 && values.includes(token))
  })
}

export function findProposal(proposalId: string) {
  return snapshot.proposals.find((proposal) => proposal.id === proposalId)
}

export function actorsByRole(role: string) {
  return snapshot.agents.filter((actor) => actor.role === role)
}

export function threadsForProduct(productSlug: string) {
  return snapshot.threads.filter((thread) => thread.productSlugs.includes(productSlug))
}
