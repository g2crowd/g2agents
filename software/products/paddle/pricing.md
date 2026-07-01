---
type: G2 Product Pricing
title: Paddle Pricing
description: Pricing seed for Paddle.
tags: [subscription-billing, billing, software-buying]
timestamp: 2026-06-29T00:00:00+02:00
g2_product_id: paddle
vendor_id: paddle
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
resource: https://www.g2.com/products/paddle/reviews
g2_category_rank: 5
g2_category_source: https://www.g2.com/categories/subscription-billing
g2_category_sort: G2 Score
g2_review_count: 236
source_observed_at: 2026-06-29
---

# Pricing

## Category-page pricing signal

| Field | Value |
| --- | --- |
| Entry-level price signal | Pay As You Go |
| Source | G2 Subscription Billing category page |
| Observed at | 2026-06-29 |
| Freshness | expires 2026-09-27 |

## Notes

The G2 category listing showed an entry-level model of Pay As You Go when observed.

Pricing is freshness-sensitive. Agents should treat this file as stale after expires_at unless refreshed.

<!-- product-research-agent:paddle:pricing.md:start -->

## Product research enrichment

_Research agent: `product-research/paddle`. Reviewed: 2026-07-01. Source tier: public-cited. Recheck by: 2026-08-15._

---

### Live pricing refresh - reviewed 2026-07-01

Paddle publishes a transaction-based pricing model for Paddle Checkout and a sales-led custom tier. Treat the public price as a starting point for checkout transactions, not a complete commercial quote for invoicing, premium support, implementation, or negotiated enterprise terms.

| Public plan / motion | Public price | What Paddle says is included | Public caveats |
| --- | ---: | --- | --- |
| Pay-as-you-go | **5% + $0.50 per Checkout transaction** | Global payments and billing, cross-border sales tax compliance, fraud/chargeback protection; Paddle also states there are no migration fees, monthly fees, or hidden extras. | Applies to **Checkout transactions**. Public page does not disclose volume breakpoints, payout timing, reserve policies, or any special rates by country/payment method. |
| Custom pricing | Not publicly disclosed | Tailored pricing for larger or fast-scaling businesses; access to optional premium services and success management; custom migration and implementation support. | Requires sales/demo. Buyers should confirm minimums, term, volume commitments, SLA/support scope, and whether invoicing or Retain standalone are covered. |
| Low-order-value / invoicing scenarios | Not publicly disclosed | Paddle says sellers with products under **$10** or those requiring invoicing should contact/book a demo for custom pricing. | Verify if the 5% + $0.50 checkout fee is unsuitable for low ASP, usage-based overages, or invoice-led enterprise deals. |

#### Pricing inclusions and add-on signals

- Paddle's pricing FAQ says the model has **no monthly fee** and no additional cost for managing payments, additional payment methods, subscription migration, or payment-related buyer support.
- Paddle states tax and compliance, unified billing, churn prevention tools, and customer support are included in its all-in-one pricing.
- Premium **Advisory** is described as available for SaaS businesses with large transaction volume; public price and eligibility thresholds are not disclosed.
- The pricing page references implementation service, invoicing, and advisory services, but buyers should confirm whether these are included, optional, or custom-priced in their specific proposal.

#### Contract and commercial caveats to verify

- Paddle says it does **not** use lock-in periods and that seller data can be migrated to another provider, but buyers should verify export format, migration assistance, notice periods, and any reserve/holdback terms in the Master Services Agreement and order form.
- Because Paddle acts as merchant/reseller of record, validate the impact on customer receipts, refund processes, chargebacks, sales-tax liability, buyer support handoff, and product/category approval before committing.
- For financial modeling, ask Paddle for a sample payout calculation by country/payment method, tax-inclusive versus tax-exclusive pricing behavior, FX treatment, refund/chargeback fees or reserves, and any negotiated volume discounts.

Key public references: [Paddle pricing](https://www.paddle.com/pricing), [Paddle Master Services Agreement](https://www.paddle.com/legal/terms), and [Paddle AUP/help article](https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle).

### Research sources

- [All-in-One Pricing, No Hidden Costs | Paddle](https://www.paddle.com/pricing) - Official current public pricing: pay-as-you-go price, custom pricing, inclusions, FAQ, low-order-value and invoicing caveats.
- [Paddle Master Services Agreement](https://www.paddle.com/legal/terms) - Official contract terms relevant to seller agreement, PCI-maintenance language, support, termination, and merchant/reseller model.
- [Understanding Paddle's Acceptable Use Policy (AUP): What Am I Not Allowed To Sell?](https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle) - Official product-fit and prohibited-business caveat buyers should verify before assuming eligibility.

<!-- product-research-agent:paddle:pricing.md:end -->
