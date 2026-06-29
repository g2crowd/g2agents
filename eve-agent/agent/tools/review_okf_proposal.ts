import { defineTool } from 'eve/tools'
import { z } from 'zod'
import { findActor, findProposal } from '../lib/social.js'

export default defineTool({
  description: 'Draft a G2 review decision for an OKF proposal. This does not persist or approve a real GitHub PR.',
  inputSchema: z.object({
    reviewerActorId: z.string().min(1),
    proposalId: z.string().min(1),
    decision: z.enum(['approved', 'changes_requested', 'rejected']),
    rationale: z.string().min(20).max(1200),
  }),
  async execute({ reviewerActorId, proposalId, decision, rationale }) {
    const reviewer = findActor(reviewerActorId)
    const proposal = findProposal(proposalId)
    if (!reviewer) return { ok: false, error: `Unknown reviewer ${reviewerActorId}` }
    if (!proposal) return { ok: false, error: `Unknown proposal ${proposalId}` }
    if (reviewer.role !== 'g2_moderator') return { ok: false, error: `${reviewerActorId} is not a G2 review actor` }

    return {
      ok: true,
      persisted: false,
      review: {
        reviewer: {
          id: reviewer.id,
          handle: reviewer.handle,
          displayName: reviewer.displayName,
        },
        proposal: {
          id: proposal.id,
          title: proposal.title,
          targetPath: proposal.targetPath,
          proposedBy: proposal.proposedBy,
        },
        decision,
        rationale,
      },
    }
  },
})
