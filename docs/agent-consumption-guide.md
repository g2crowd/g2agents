---
type: G2 Agent Guide
title: Agent Consumption Guide
description: How buyer agents should read, cite, compare, and reason over the G2 Agents Registry.
tags: [agents, software-buying, trust, provenance]
timestamp: 2026-06-29T00:00:00+02:00
owner: g2
source_tier: g2-curated
---

# Agent Consumption Guide

This guide defines how buyer agents should consume the registry.

The registry is not just content. It is a provenance-aware buying knowledge system. Agents should preserve the distinction between G2-curated content, vendor-attested claims, review-derived signals, and public cited evidence.

## Reading order

For a product question:

1. Resolve the product through `software/products/index.md` or a category index.
2. Read the product folder's `index.md`.
3. Read the most relevant supporting files:
   - `profile.md` for neutral product framing.
   - `features.md` for capabilities.
   - `pricing.md` for packaging and pricing model notes.
   - `integrations.md` for ecosystem fit.
   - `security-compliance.md` for security posture.
   - `reviews-summary.md` for review-derived evidence.
   - `vendor-claims.md` for vendor-maintained claims.
   - `alternatives.md` for comparison context.
4. Check `log.md` for recent changes, disputes, or known stale areas.

For a category question:

1. Start with the category `index.md`.
2. Follow links to the relevant product folders.
3. Compare the same document type across products when possible.

## Source tier rules

Agents must not flatten source tiers into a single undifferentiated answer.

Use this ordering when evidence conflicts:

1. `g2-curated`
2. `review-derived`
3. `public-cited`
4. `vendor-attested`
5. `agent-inferred`

This is not a universal truth ranking. It is a buying-context trust policy. Vendor claims may be accurate and useful, but they should be attributed as vendor claims.

## Attribution language

Use explicit language:

- "G2-curated summary says..."
- "The vendor attests..."
- "Review-derived notes indicate..."
- "Public cited documentation says..."
- "This appears to be inferred and should be verified..."

Avoid:

- presenting vendor claims as neutral G2 facts
- merging review-derived sentiment with vendor claims without labeling
- using stale pricing or compliance claims without noting age

## Comparison behavior

When comparing products, agents should read equivalent files for each product. For example, compare `pricing.md` to `pricing.md`, not one product's `vendor-claims.md` to another product's `reviews-summary.md`.

For buyer-fit questions, agents should separate:

- functional fit
- company-size fit
- implementation risk
- pricing and packaging risk
- ecosystem fit
- security and compliance fit
- evidence quality

## Freshness behavior

Files can include `reviewed_at` and `expires_at` fields. If `expires_at` has passed, agents should treat the file as stale and say so.

Claims about pricing, compliance, security certifications, AI capabilities, and integrations should be treated as freshness-sensitive.

## Citation behavior

When answering a buyer, cite file paths and section names when possible.

Good:

> The registry's `software/products/example-crm/pricing.md` labels pricing as vendor-attested and freshness-sensitive.

Bad:

> The product is affordable.

## Refusal behavior

If the registry does not contain enough evidence, agents should say what is missing rather than fill gaps from implication.

Good:

> This registry does not yet contain verified implementation-duration evidence for this product.

Bad:

> Implementation should be easy.
