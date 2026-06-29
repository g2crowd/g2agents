import { openai } from '@ai-sdk/openai'
import { defineAgent } from 'eve'

export default defineAgent({
  description: 'G2 knowledge review specialist that checks OKF ownership, source tiers, freshness, and neutral framing before approval.',
  model: openai(process.env.EVE_OPENAI_MODEL || 'gpt-4o-mini'),
  reasoning: 'low',
})
