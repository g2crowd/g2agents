---
type: G2 Contract
title: Product Folder Contract
description: Required files and semantics for each product folder in the G2 Agents Registry.
tags: [products, schema, okf, markdown]
timestamp: 2026-06-29T00:00:00+02:00
owner: g2
source_tier: g2-curated
---

# Product Folder Contract

Each product gets one canonical folder:

```text
software/products/{product_slug}/
```

The product slug is the durable product identity inside the registry. Do not encode category into the canonical path.

## Required files

| File | Owner | Purpose |
| --- | --- | --- |
| `index.md` | `g2` | Routing page and product-level metadata. |
| `profile.md` | `g2` | Neutral product description and buyer-fit framing. |
| `vendor-claims.md` | `vendor` | Vendor-attested claims, positioned clearly as vendor claims. |
| `features.md` | `shared` | Capability inventory and evidence quality. |
| `pricing.md` | `shared` | Pricing model, packaging notes, and known caveats. |
| `integrations.md` | `shared` | Ecosystem, APIs, native integrations, and partner fit. |
| `security-compliance.md` | `shared` | Security, privacy, compliance, and procurement risk notes. |
| `reviews-summary.md` | `g2` | Review-derived synthesis and user sentiment. |
| `alternatives.md` | `g2` | Comparison context and neighboring products. |
| `log.md` | `g2` | Product-level changes, disputes, and review notes. |

## Required frontmatter

All product files should include:

```yaml
---
type: G2 Product Profile
title: Product Name
description: Short description for humans and agents.
tags: [crm, sales]
timestamp: 2026-06-29T00:00:00+02:00
g2_product_id: product-slug
vendor_id: vendor-slug
display_category: crm
category_memberships:
  - category_id: crm
    fit: core
    source_tier: g2-curated
    reviewed_at: 2026-06-29
owner: g2
source_tier: g2-curated
claim_policy: cited
reviewed_at: 2026-06-29
expires_at: 2027-06-29
---
```

`display_category` is a UI hint. Durable product identity lives in the product slug, and category truth lives in `category_memberships`.

## File-specific guidance

### `index.md`

Use this as the product router. It should link to every file in the product folder and declare canonical metadata.

### `profile.md`

This is the neutral G2 view. It should avoid vendor marketing language and should clearly state the product's likely buyer fit.

### `vendor-claims.md`

This is where the vendor can say what it believes is true about its product. Agents must attribute this content as vendor-attested.

### `features.md`

Use this for capability tables. Each meaningful capability should include an evidence level.

Suggested evidence levels:

- `verified`
- `vendor-attested`
- `review-derived`
- `public-cited`
- `unknown`

### `pricing.md`

Pricing is highly freshness-sensitive. Agents should treat expired pricing files as stale.

### `security-compliance.md`

Security and compliance claims should require dates and citations where possible.

### `reviews-summary.md`

This file should be generated or maintained from G2 review evidence. It should not include vendor-authored positioning unless clearly labeled as contrast.

### `alternatives.md`

This file should help buyers understand the choice set. It should not be pay-to-play placement.

### `log.md`

Record material product knowledge changes, stale sections, disputes, and major vendor PRs.
