import { defineTool } from 'eve/tools'
import { z } from 'zod'
import { findActor, findProposal } from '../../../lib/social.js'

const defaultReviewerAgentId = 'g2-review-agent'

export default defineTool({
  description:
    'Draft a G2 moderator-agent review decision for an OKF proposal. This subagent uses a G2 moderator agent, not a human moderator.',
  inputSchema: z.object({
    reviewerActorId: z.string().min(1).default(defaultReviewerAgentId),
    proposalId: z.string().min(1),
    decision: z.enum(['approved', 'changes_requested', 'rejected']),
    rationale: z.string().min(20).max(1200),
  }),
  async execute({ reviewerActorId, proposalId, decision, rationale }) {
    const requestedReviewerActorId = reviewerActorId
    let reviewer = findActor(reviewerActorId)
    if (!reviewer || reviewer.role !== 'g2_moderator' || reviewer.kind !== 'agent') {
      reviewer = findActor(defaultReviewerAgentId)
      reviewerActorId = defaultReviewerAgentId
    }

    const proposal = findProposal(proposalId)
    if (!reviewer) return { ok: false, error: `Unknown G2 review agent ${defaultReviewerAgentId}` }
    if (!proposal) return { ok: false, error: `Unknown proposal ${proposalId}` }

    return {
      ok: true,
      persisted: false,
      normalizedFromReviewerActorId: requestedReviewerActorId === reviewerActorId ? null : requestedReviewerActorId,
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
