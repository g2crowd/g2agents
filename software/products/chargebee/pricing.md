---
type: G2 Product Pricing
title: Chargebee Pricing
description: Pricing seed for Chargebee.
tags: [subscription-billing, billing, software-buying]
timestamp: 2026-06-29T00:00:00+02:00
g2_product_id: chargebee
vendor_id: chargebee
display_category: subscription-billing
category_memberships:
  - category_id: subscription-billing
    fit: core
    source_tier: public-cited
    reviewed_at: 2026-06-29
owner: shared
source_tier: public-cited
claim_policy: cited
reviewed_at: 2026-07-01
expires_at: 2026-08-15
resource: https://www.g2.com/products/chargebee/reviews
g2_category_rank: 1
g2_category_source: https://www.g2.com/categories/subscription-billing
g2_category_sort: G2 Score
g2_review_count: 961
source_observed_at: 2026-06-29
---

# Pricing

Pro plan is $600/mo.

## Category-page pricing signal

| Field | Value |
| --- | --- |
| Entry-level price signal | Free |
| Source | G2 Subscription Billing category page |
| Observed at | 2026-06-29 |
| Freshness | expires 2026-09-27 |

## Notes

The G2 category listing showed an entry-level price of Free when observed.

Pricing is freshness-sensitive. Agents should treat this file as stale after expires_at unless refreshed.

<!-- product-research-agent:chargebee:pricing.md:start -->

## Product research enrichment

_Research agent: `product-research/chargebee`. Reviewed: 2026-07-01. Source tier: public-cited. Recheck by: 2026-08-15._

### Public pricing refresh - reviewed 2026-07-01

Chargebee publishes current pricing for **Chargebee Billing**, plus adjacent **CPQ**, **RevRec**, and **Growth** SKUs, on its official [Plans and Pricing](https://www.chargebee.com/pricing/) page. Pricing is volume-sensitive: model both the base subscription and billing-volume thresholds before comparing Chargebee with payment-gateway-native billing or ERP billing modules.

#### Chargebee Billing public plans

| Plan | Public price | Public billing threshold / overage | Contract signal | Buyer caveats |
| --- | ---: | --- | --- | --- |
| Starter | **$0/month** | Free for the first **USD 250K cumulative billing**; after the cumulative limit, Chargebee states a **0.75% monthly overage fee on all billing after that limit**. | Self-serve sign-up shown. | Confirm the contractual definition of "billing," when the cumulative counter starts, whether refunds/credits reduce the counter, and whether payment-gateway, tax, or implementation fees are separate. |
| Performance | **USD 7,188/year**, billed monthly; equivalent public signal is **$599/month**. | Listed for up to **USD 100K billing/month**. The page does **not** expose a specific overage percentage for Performance in the public plan card reviewed. | **Annual commitment / billed monthly**. | Verify overage rate, billing-volume measurement period, cancellation/renewal terms, included support, sandbox/site limits, and migration scope in the order form. |
| Enterprise | **Custom quote** | Not publicly disclosed. | Sales-assisted quote. | Validate minimum annual commitment, included entities/sites, multi-entity limits, account hierarchy, SLA/support tier, professional services, and any committed billing-volume tiers. |

#### Publicly listed adjacent products and add-ons

| SKU / add-on | Public price signal | Public availability / packaging signal | Buyer caveats |
| --- | --- | --- | --- |
| CPQ Lite | **Free for the first 50 quotes** | Available exclusively for Chargebee Billing customers. | Confirm whether the 50-quote limit is monthly, annual, or lifetime, and what pricing applies after the limit. |
| Chargebee CPQ | **Talk to sales** | Available for Billing customers; public page lists quoting controls, multi-product quotes, multi-year/ramped quotes, and approval workflows. | Confirm per-seat vs platform pricing, CRM connector costs, approval-workflow limits, and implementation services. |
| CPQ for Salesforce / HubSpot | Listed as **paid add-ons** | Appears under CPQ packaging. | Confirm whether each CRM connector is separately licensed and whether sandbox, API, or sync-volume limits apply. |
| RevRec Performance | **Book a demo / request pricing** | Available only to Chargebee Billing customers. | Public price is not disclosed; confirm accounting-source limits, revenue-rule coverage, and month-end close support. |
| RevRec Enterprise | **Custom quote** | Public page lists multi-source integration and direct journal-entry posting to GL systems. | Confirm supported source systems, GL posting scope, multi-entity requirements, and audit-export functionality. |
| Growth Starter | **$0**, exclusively for Chargebee Billing customers | Public page positions it for single-brand businesses with hundreds of subscribers. | Confirm active-subscriber limits and whether cancel pages, pricing tables, and portals are production-ready in all Billing plans. |
| Growth Enterprise | **Custom pricing based on active subscribers** | Public page lists multi-brand experiments and trial/upsell/cross-sell experiments. | Ask for subscriber bands, experiment-volume limits, AI feature terms, and data-processing scope. |

#### Pricing verification checklist

- Ask Chargebee to define **billing**, **cumulative billing**, and **monthly billing** in the contract.
- Confirm whether payment processing, tax calculation, e-invoicing, implementation, migration, premium support, additional sites/entities, and CRM/ERP connectors are separately charged.
- For Performance and Enterprise, request the exact **overage percentage**, threshold reset mechanics, and any committed minimums.
- If using CPQ, RevRec, or Growth, require SKU-level line items rather than a single bundled quote.

### Research sources

- [Chargebee Plans and Pricing](https://www.chargebee.com/pricing/) - Official public pricing source for Billing, CPQ, RevRec, Growth plan names, prices, thresholds, and packaging.
- [Chargebee Payment Gateways overview](https://www.chargebee.com/docs/payments/2.0/payment-gateways-and-configuration/gateway_settings) - Official documentation noting gateway configuration and multiple gateway account support, relevant to pricing caveats around payment processing.
- [Which payment gateways does Chargebee support?](https://www.chargebee.com/docs/payments/2.0/kb/billing/what-gateways-does-chargebee-support) - Official support article noting gateway support depends on country and plan, useful for buyer caveats.

<!-- product-research-agent:chargebee:pricing.md:end -->
