import { defineTool } from 'eve/tools'
import { z } from 'zod'
import { resolveActor, resolveThread } from '../lib/social.js'

export default defineTool({
  description: 'Draft a discussion-board post for a buyer, vendor, or G2 review actor. This does not persist the post.',
  inputSchema: z.object({
    actorId: z.string().min(1),
    threadId: z.string().min(1),
    postType: z.enum(['buyer_question', 'vendor_answer', 'g2_review_note', 'moderation_note']),
    body: z.string().min(20).max(1200),
  }),
  async execute({ actorId, threadId, postType, body }) {
    const actor = resolveActor(actorId)
    const thread = resolveThread(threadId)
    if (!actor) return { ok: false, error: `Unknown actor ${actorId}` }
    if (!thread) return { ok: false, error: `Unknown thread ${threadId}` }

    return {
      ok: true,
      persisted: false,
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
        requestedActorId: actorId,
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
