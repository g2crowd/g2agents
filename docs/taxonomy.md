---
type: G2 Taxonomy Guide
title: Taxonomy Model
description: Graph and facet model for categories, subcategories, capabilities, and product memberships.
tags: [taxonomy, categories, graph, facets]
timestamp: 2026-06-29T00:00:00+02:00
owner: g2
source_tier: g2-curated
---

# Taxonomy Model

G2 taxonomy should be modeled as a graph and facet system, not a strict tree.

The registry separates four concepts that are often collapsed into one hierarchy:

| Concept | Meaning | Canonical location |
| --- | --- | --- |
| Product identity | The durable product being represented. | `software/products/{product_slug}/` |
| Category membership | Whether and how a product belongs to a category. | Product frontmatter and category index files |
| Capability coverage | What the product does. | `features.md` and supporting evidence |
| Buyer context | Who the product is likely to fit. | `profile.md`, `reviews-summary.md`, and category guidance |

## Product identity

Product folders should not live under category folders.

Good:

```text
software/products/example-crm/
```

Avoid:

```text
software/categories/crm/products/example-crm/
```

The avoided shape makes category assignment part of product identity. That breaks down when a product is multi-category, categories split, categories merge, or G2 changes market definitions.

## Category graph

Categories are graph nodes. A category can have parents, children, and related categories.

Example:

```yaml
category_id: crm
parents: [sales-software]
children: [enterprise-crm, small-business-crm]
related_categories: [sales-engagement, customer-success, marketing-automation]
status: active
```

Category files should define:

- definition
- inclusion criteria
- exclusion criteria
- child categories
- related categories
- representative products
- common buyer questions

## Product category memberships

Products attach to categories through explicit membership records.

Example:

```yaml
display_category: crm
category_memberships:
  - category_id: crm
    fit: core
    source_tier: g2-curated
    reviewed_at: 2026-06-29
  - category_id: sales-engagement
    fit: adjacent
    source_tier: g2-curated
    reviewed_at: 2026-06-29
  - category_id: marketing-automation
    fit: vendor-claimed
    source_tier: vendor-attested
    reviewed_at: 2026-06-29
```

`display_category` is a UI convenience. It is not the whole truth about the product.

## Membership fit values

| Fit | Meaning |
| --- | --- |
| `core` | The product substantially belongs in the category by G2's definition. |
| `adjacent` | The product is relevant but not primarily in the category. |
| `partial` | The product covers part of the category but lacks important expected capabilities. |
| `legacy` | The product historically belonged, but the category or product has shifted. |
| `vendor-claimed` | The vendor claims membership, but G2 has not endorsed it as core or adjacent. |
| `disputed` | Category membership is actively contested or under review. |

## Agent behavior

Agents should not treat category membership as binary.

When answering category questions, agents should consider:

- whether membership is `core`, `adjacent`, `partial`, `legacy`, `vendor-claimed`, or `disputed`
- whether the category definition matches the buyer's use case
- whether capability evidence supports the category membership
- whether review-derived evidence supports the product's actual buyer fit

## Governance

Vendors may propose category memberships, but G2 should control category definitions and endorsed membership fit.

Vendor-submitted category claims should remain visible as `vendor-claimed` unless G2 reviews and changes the fit.
