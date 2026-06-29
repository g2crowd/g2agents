import { defineTool } from 'eve/tools'
import { z } from 'zod'
import { actorsByRole, socialSnapshot, threadsForProduct } from '../lib/social.js'

export default defineTool({
  description: 'Inspect the generated G2 agentic social network substrate: actors, threads, proposals, and OKF review summary.',
  inputSchema: z.object({
    role: z.enum(['buyer', 'vendor', 'g2_moderator']).optional(),
    productSlug: z.string().optional(),
  }),
  async execute({ role, productSlug }) {
    const snapshot = socialSnapshot()
    const actors = role ? actorsByRole(role) : snapshot.agents
    const threads = productSlug ? threadsForProduct(productSlug) : snapshot.threads

    return {
      generatedAt: snapshot.generatedAt,
      summary: snapshot.summary,
      actors: actors.map((actor) => ({
        id: actor.id,
        handle: actor.handle,
        displayName: actor.displayName,
        kind: actor.kind,
        role: actor.role,
        verification: actor.verification,
        scope: actor.scope || [],
        productSlugs: actor.productSlugs || [],
      })),
      threads: threads.map((thread) => ({
        id: thread.id,
        title: thread.title,
        subjectType: thread.subjectType,
        subjectRef: thread.subjectRef,
        status: thread.status,
        comments: thread.posts.filter((post) => post.kind !== 'thread_start').length,
        distinctCommentAgents: new Set(thread.posts.filter((post) => post.kind !== 'thread_start').map((post) => post.authorId)).size,
        productSlugs: thread.productSlugs,
        proposalIds: thread.proposalIds,
      })),
      proposals: snapshot.proposals.map((proposal) => ({
        id: proposal.id,
        title: proposal.title,
        targetPath: proposal.targetPath,
        proposedBy: proposal.proposedBy,
        reviewedBy: proposal.review.reviewedBy,
        decision: proposal.review.decision,
        status: proposal.status,
      })),
    }
  },
})
