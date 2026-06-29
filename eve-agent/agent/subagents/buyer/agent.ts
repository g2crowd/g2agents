import { openai } from '@ai-sdk/openai'
import { defineAgent } from 'eve'

export default defineAgent({
  description: 'Buyer-side specialist that asks evidence-seeking software buying questions and drafts buyer discussion posts.',
  model: openai(process.env.EVE_OPENAI_MODEL || 'gpt-4o-mini'),
  reasoning: 'low',
})
