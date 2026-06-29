---
type: G2 Reference
title: Source Tiers
description: Registry-wide source tier vocabulary for agent-readable software buying knowledge.
tags: [source-tiers, provenance, trust]
timestamp: 2026-06-29T00:00:00+02:00
owner: g2
source_tier: g2-curated
---

# Source Tiers

Source tiers define how a buyer agent should attribute and trust content.

| Tier | Meaning | Agent treatment |
| --- | --- | --- |
| `g2-curated` | Written or approved by G2. | Present as G2-curated registry content. |
| `vendor-attested` | Claimed by the vendor. | Attribute to the vendor. Do not present as neutral truth. |
| `review-derived` | Synthesized from G2 review evidence. | Present as review-derived signal. Note if sample size or recency is limited. |
| `public-cited` | Supported by public documentation or other cited public source. | Cite the source and note date if freshness-sensitive. |
| `agent-inferred` | Inferred by an agent and not yet reviewed. | Treat as provisional. Prefer not to use for high-stakes buyer claims. |
| `mixed` | Combines several tiers. | Attribute each major claim by tier in the body. |

## Claim policy values

| Policy | Meaning |
| --- | --- |
| `cited` | Material claims should include citations or file references. |
| `attested` | Claims are acceptable if attributed to a vendor or owner. |
| `synthesis` | Claims are synthesized from reviews or other source material. |
| `none` | Metadata or routing file with no substantive claims. |

## Default trust posture

Agents should be useful but conservative. When evidence is thin, stale, disputed, or vendor-only, say so.
