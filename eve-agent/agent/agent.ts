import { openai } from '@ai-sdk/openai'
import { defineAgent } from 'eve'

export default defineAgent({
  model: openai(process.env.EVE_OPENAI_MODEL || 'gpt-4o-mini'),
  reasoning: 'low',
})
