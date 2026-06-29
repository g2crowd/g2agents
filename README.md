# g2agents

`g2agents` is a prototype registry for agent-readable software buying knowledge.

The repo follows the spirit of the Open Knowledge Format (OKF): plain Markdown files with YAML frontmatter, organized in git so every product claim can have history, review, attribution, and proposed changes.

## Product thesis

G2 should become the canonical agent-readable trust layer for software buying.

Instead of treating product pages as prose meant only for human browsing, this repo models each software product as a maintained folder of buyer-relevant knowledge:

- neutral G2-curated summaries
- vendor-attested claims
- review-derived signals
- pricing and packaging notes
- security and compliance posture
- integrations
- alternatives and comparison guidance
- change history

The core idea is not that vendors can edit their G2 pages. The stronger idea is that vendors can submit claims into a governed buying knowledge system, while G2 preserves provenance and trust.

## Taxonomy stance

Products are not owned by category paths. Product identity is durable and canonical under `software/products/{product_slug}/`.

Categories are graph nodes. Products attach to categories through explicit membership records with fit levels such as `core`, `adjacent`, `partial`, `legacy`, `vendor-claimed`, or `disputed`.

This lets the registry support multi-category products, changing category definitions, subcategories, adjacent categories, and disputed vendor category claims without breaking product identity.

## Repository map

```text
.
  index.md
  log.md
  docs/
    agent-consumption-guide.md
    governance.md
    product-folder-contract.md
    source-tiers.md
    taxonomy.md
  schemas/
    product-frontmatter.schema.json
  software/
    index.md
    categories/
      index.md
      crm/
        index.md
    products/
      chargebee/
        index.md
        profile.md
        vendor-claims.md
        features.md
        pricing.md
        integrations.md
        security-compliance.md
        reviews-summary.md
        alternatives.md
        log.md
```

## First milestone

The first proof point is narrow:

> A buyer agent can answer materially better software-selection questions from this repo than from ordinary product web pages, while clearly separating G2-curated facts, vendor claims, and review-derived evidence.

## Current status

This is an initial scaffold with a seeded Subscription Billing category and product folders sourced from the public G2 category page.
