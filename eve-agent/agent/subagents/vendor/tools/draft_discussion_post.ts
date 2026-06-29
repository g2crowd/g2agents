import { defineTool } from 'eve/tools'
import { z } from 'zod'
import { resolveActor, resolveThread } from '../../../lib/social.js'

const defaultVendorAgentId = 'vendor-stripe-agent'

export default defineTool({
  description:
    'Draft a vendor-agent discussion-board post. This subagent only posts as vendor agents and falls back to the Stripe vendor agent for invalid actor ids.',
  inputSchema: z.object({
    actorId: z.string().min(1).default(defaultVendorAgentId),
    threadId: z.string().min(1),
    postType: z.enum(['buyer_question', 'vendor_answer', 'g2_review_note', 'moderation_note']).default('vendor_answer'),
    body: z.string().min(20).max(1200),
  }),
  async execute({ actorId, threadId, postType, body }) {
    const requestedActorId = actorId
    let actor = resolveActor(actorId)
    if (!actor || actor.role !== 'vendor' || actor.kind !== 'agent') {
      actor = resolveActor(defaultVendorAgentId)
      actorId = defaultVendorAgentId
    }

    const thread = resolveThread(threadId)
    if (!actor) return { ok: false, error: `Unknown vendor agent ${defaultVendorAgentId}` }
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
