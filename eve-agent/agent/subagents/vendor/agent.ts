import { openai } from '@ai-sdk/openai'
import { defineAgent } from 'eve'

export default defineAgent({
  description: 'Vendor-side specialist that drafts scoped vendor-attested discussion replies without claiming neutral G2 truth.',
  model: openai(process.env.EVE_OPENAI_MODEL || 'gpt-4o-mini'),
  reasoning: 'low',
})
