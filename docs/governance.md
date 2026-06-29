---
type: G2 Governance
title: Governance Model
description: Draft contribution and trust model for vendor, G2, and agent-maintained product knowledge.
tags: [governance, vendors, prs, trust]
timestamp: 2026-06-29T00:00:00+02:00
owner: g2
source_tier: g2-curated
---

# Governance Model

The registry should let vendors participate without letting vendors become the source of neutral truth.

## Ownership classes

Each file should have an owner class:

| Owner | Meaning | Example files |
| --- | --- | --- |
| `g2` | G2 controls the editorial judgment. | `profile.md`, `reviews-summary.md`, `alternatives.md` |
| `vendor` | Vendor can propose or maintain claims, subject to G2 review. | `vendor-claims.md` |
| `shared` | Vendor can update facts, but G2 reviews evidence and framing. | `features.md`, `pricing.md`, `integrations.md`, `security-compliance.md`, `news.md` |

## Source tiers

Every content file should declare `source_tier`.

The source tier tells agents how to attribute the claim and how much independent trust to place in it.

See [Source Tiers](source-tiers.md).

## Vendor contribution flow

Vendor contributions should use pull requests.

Minimum policy:

- PR author identity is associated with the vendor.
- Changed files are limited to the vendor's product folders unless explicitly approved.
- Claims include citations or are clearly marked as vendor-attested.
- News entries include date, type, headline, buyer relevance, source, submitter, and review status.
- Pricing, security, compliance, and AI-capability claims include `reviewed_at`.
- G2-owned files require G2 approval.
- Disputed claims are marked rather than silently removed.

## In-app public edit flow

The registry browser can accept edit proposals from people or agents that do not have GitHub accounts.

The browser only exposes editing for product files whose frontmatter owner is `vendor` or `shared`, and the server independently allowlists these file names:

- `vendor-claims.md`
- `features.md`
- `pricing.md`
- `integrations.md`
- `security-compliance.md`
- `news.md`

Submitted changes are posted to `/api/submit-change`. The endpoint creates a branch, commits the proposed Markdown update, and opens a pull request using a G2-controlled GitHub App or bot token. The submitter provides name, email, organization, and a change summary for reviewer follow-up, but does not need GitHub authentication.

Required production configuration:

- Preferred: `GITHUB_APP_ID`, `GITHUB_APP_INSTALLATION_ID`, and `GITHUB_APP_PRIVATE_KEY` for a GitHub App installed on `g2crowd/g2agents` with contents and pull request write access.
- Alternative: `GITHUB_PR_TOKEN` for a narrowly scoped bot token with access to create branches, commits, and pull requests.
- Optional: `GITHUB_REPOSITORY`, `GITHUB_BASE_BRANCH`, `GITHUB_COMMITTER_NAME`, and `GITHUB_COMMITTER_EMAIL`.

G2-owned files remain read-only in the public editor. Changes to those files should be made by G2 maintainers or proposed through a reviewed internal workflow.

## G2 review responsibilities

G2 reviewers should evaluate:

- whether the source tier is accurate
- whether claims are buyer-relevant
- whether language is neutral enough for the file type
- whether citations support the claim
- whether stale or disputed information is clearly labeled
- whether category memberships reflect G2's category definitions
- whether changes improve agent answers

## Disputes

Disputes should be represented in the repo instead of hidden.

Possible dispute fields:

```yaml
dispute_status: open
dispute_reason: Vendor contests review-derived implementation-risk summary.
dispute_opened_at: 2026-06-29
```

Agents should surface open disputes when the disputed topic is relevant to the buyer question.

## Taxonomy governance

G2 owns category definitions and endorsed category memberships.

Vendors may propose category additions or membership changes, but vendor-submitted category claims should default to `vendor-claimed` until G2 reviews them.

Category membership can be disputed without moving the product folder or changing product identity.

## Freshness policy

Recommended default review windows:

| Content | Suggested expiry |
| --- | --- |
| Pricing and packaging | 90 days |
| Security and compliance | 180 days |
| Integrations | 180 days |
| News entries | Review at submission and after material corrections |
| Product profile | 365 days |
| Review summaries | 180 days or after material review-volume change |

These are draft defaults. The repo should tune them based on buyer risk.

## CI policy

The eventual CI checks should validate:

- required frontmatter fields
- valid source tier values
- valid owner values
- links to local files
- expired freshness windows
- missing citations for citation-required file types
- category references that point to missing product folders
- category memberships that point to missing category folders
