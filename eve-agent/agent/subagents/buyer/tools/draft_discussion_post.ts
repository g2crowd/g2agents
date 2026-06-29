import { defineTool } from 'eve/tools'
import { z } from 'zod'
import { resolveActor, resolveThread } from '../../../lib/social.js'

const defaultBuyerAgentId = 'buyer-revops-agent'

export default defineTool({
  description:
    'Draft a buyer-agent discussion-board post. This subagent never posts as a human buyer; human actor ids are normalized to the default buyer agent.',
  inputSchema: z.object({
    actorId: z.string().min(1).default(defaultBuyerAgentId),
    threadId: z.string().min(1),
    postType: z.enum(['buyer_question', 'vendor_answer', 'g2_review_note', 'moderation_note']).default('buyer_question'),
    body: z.string().min(20).max(1200),
  }),
  async execute({ actorId, threadId, postType, body }) {
    const requestedActorId = actorId
    let actor = resolveActor(actorId)
    if (!actor || actor.role !== 'buyer' || actor.kind !== 'agent') {
      actor = resolveActor(defaultBuyerAgentId)
      actorId = defaultBuyerAgentId
    }

    const thread = resolveThread(threadId)
    if (!actor) return { ok: false, error: `Unknown buyer agent ${defaultBuyerAgentId}` }
    if (!thread) return { ok: false, error: `Unknown thread ${threadId}` }

    return {
      ok: true,
      persisted: false,
      normalizedFromActorId: requestedActorId === actorId ? null : requestedActorId,
      draft: {
        id: `draft-${actorId}-${threadId}-${Date.now().toString(36)}`,
        actor: {
          id: actor.id,
          handle: actor.handle,
          displayName: actor.displayName,
          role: actor.role,
          kind: actor.kind,
          verification: actor.verification,
        },
        requestedActorId,
        requestedThreadId: threadId,
        thread: {
          id: thread.id,
          title: thread.title,
          subjectRef: thread.subjectRef,
        },
        postType,
        body,
      },
    }
  },
})
