import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const failures = []
const g2ReviewAgentId = 'g2-review-agent'

function readJson(relativePath) {
  const filePath = path.join(root, relativePath)
  if (!fs.existsSync(filePath)) {
    failures.push(`${relativePath} is missing. Run npm run social:simulate.`)
    return []
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function vendorSlugs() {
  const dir = path.join(root, 'software', 'vendors')
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => fs.existsSync(path.join(dir, slug, 'index.md')))
    .sort((a, b) => a.localeCompare(b))
}

function countBy(values) {
  const counts = new Map()
  values.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1))
  return counts
}

const agents = readJson('social/agents.json')
const threads = readJson('social/threads.json')
const proposals = readJson('social/proposals.json')
const events = readJson('social/events.json')
const agentById = new Map(agents.map((agent) => [agent.id, agent]))
const threadById = new Map(threads.map((thread) => [thread.id, thread]))

const buyerAgents = agents.filter((agent) => agent.kind === 'agent' && agent.role === 'buyer')
if (buyerAgents.length < 3) failures.push(`Expected at least 3 buyer/user agents, found ${buyerAgents.length}.`)

for (const agent of agents) {
  if (!agent.avatar?.initials || !agent.avatar?.tone) {
    failures.push(`${agent.id} is missing avatar initials or tone.`)
  }
  if (!agent.handle?.startsWith('@')) failures.push(`${agent.id} is missing a public handle.`)
  if (!agent.title || !agent.bio) failures.push(`${agent.id} is missing public profile title or bio.`)
}

const reviewAgents = agents.filter((agent) => agent.id === g2ReviewAgentId && agent.kind === 'agent' && agent.role === 'g2_moderator')
if (reviewAgents.length < 1) failures.push('Expected one G2 review agent.')

const missingVendorAgents = vendorSlugs().filter((slug) => !agentById.has(`vendor-${slug}-agent`))
if (missingVendorAgents.length) failures.push(`Missing vendor agents for: ${missingVendorAgents.join(', ')}.`)

if (threads.length < 5) failures.push(`Expected at least 5 threads, found ${threads.length}.`)

for (const thread of threads) {
  const comments = thread.posts.filter((post) => post.kind !== 'thread_start')
  const distinctCommentAuthors = new Set(comments.map((post) => post.authorId))
  const multiCommentAuthors = Array.from(countBy(comments.map((post) => post.authorId)).values()).filter((count) => count >= 2).length

  if (comments.length < 10) failures.push(`${thread.id} has ${comments.length} comments; expected at least 10.`)
  if (distinctCommentAuthors.size < 6) failures.push(`${thread.id} has ${distinctCommentAuthors.size} distinct comment agents; expected at least 6.`)
  if (multiCommentAuthors < 3) failures.push(`${thread.id} has ${multiCommentAuthors} agents with multiple comments; expected at least 3.`)

  for (const post of thread.posts) {
    const actor = agentById.get(post.authorId)
    if (!actor) failures.push(`${thread.id}/${post.id} references missing actor ${post.authorId}.`)
    if (actor && actor.kind !== 'agent') failures.push(`${thread.id}/${post.id} is not authored by an agent.`)
  }
}

const approvedApplied = proposals.filter((proposal) => proposal.status === 'approved_and_applied' && proposal.applied)
if (!approvedApplied.some((proposal) => proposal.proposedByRole === 'vendor')) failures.push('Expected at least one approved/applied vendor-agent OKF proposal.')
if (!approvedApplied.some((proposal) => proposal.proposedByRole === 'buyer')) failures.push('Expected at least one approved/applied buyer-agent OKF proposal.')

for (const proposal of approvedApplied) {
  if (!threadById.has(proposal.sourceThreadId)) failures.push(`${proposal.id} references missing thread ${proposal.sourceThreadId}.`)
  if (!agentById.has(proposal.proposedBy)) failures.push(`${proposal.id} references missing proposer ${proposal.proposedBy}.`)
  if (proposal.review?.reviewedBy !== g2ReviewAgentId || proposal.review?.decision !== 'approved') {
    failures.push(`${proposal.id} was not approved by ${g2ReviewAgentId}.`)
  }
  if (proposal.simulatedPullRequest?.state !== 'approved') failures.push(`${proposal.id} does not have an approved simulated PR.`)

  const targetPath = path.join(root, proposal.targetPath)
  if (!fs.existsSync(targetPath)) {
    failures.push(`${proposal.id} target file ${proposal.targetPath} is missing.`)
    continue
  }

  const targetText = fs.readFileSync(targetPath, 'utf8')
  if (!targetText.includes(`agentic-social-simulation:${proposal.id}:start`)) {
    failures.push(`${proposal.id} was not applied to ${proposal.targetPath}.`)
  }
}

const eventTypes = new Set(events.map((event) => event.type))
for (const type of ['discussion.thread.started', 'discussion.post.created', 'proposal.created', 'proposal.review.approved', 'okf.file.modified']) {
  if (!eventTypes.has(type)) failures.push(`Missing event type ${type}.`)
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(
  `Social simulation check passed: ${threads.length} threads, ${threads.reduce((sum, thread) => sum + thread.posts.filter((post) => post.kind !== 'thread_start').length, 0)} comments, ${buyerAgents.length} buyer agents, ${vendorSlugs().length} vendor agents, ${approvedApplied.length} approved simulated PRs.`,
)
