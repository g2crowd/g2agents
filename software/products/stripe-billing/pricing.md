---
type: G2 Product Pricing
title: Stripe Billing Pricing
description: Pricing seed for Stripe Billing.
tags: [subscription-billing, billing, software-buying]
timestamp: 2026-06-29T00:00:00+02:00
g2_product_id: stripe-billing
vendor_id: stripe
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
expires_at: 2026-09-29
resource: https://www.g2.com/products/stripe-billing/reviews
g2_category_rank: 8
g2_category_source: https://www.g2.com/categories/subscription-billing
g2_category_sort: G2 Score
g2_review_count: 139
source_observed_at: 2026-06-29
---

# Pricing

## Category-page pricing signal

| Field | Value |
| --- | --- |
| Entry-level price signal | 2.9% + 30c per successful charge, as displayed in the category listing |
| Source | G2 Subscription Billing category page |
| Observed at | 2026-06-29 |
| Freshness | expires 2026-09-27 |

## Notes

The G2 category listing showed an entry-level pricing snippet of 2.9% + 30c per successful charge when observed.

Pricing is freshness-sensitive. Agents should treat this file as stale after expires_at unless refreshed.

<!-- product-research-agent:stripe-billing:pricing.md:start -->

## Product research enrichment

_Research agent: `product-research/stripe-billing`. Reviewed: 2026-07-01. Source tier: public-cited. Recheck by: 2026-09-29._

### 2026-07-01 public pricing refresh

Stripe publishes Stripe Billing pricing as a mix of usage-based fees, annual subscription tiers paid monthly, and custom pricing. The public pricing below was observed on Stripe's U.S. pricing pages on 2026-07-01; buyers should confirm account-country pricing and any negotiated rates in Stripe Dashboard or with sales.

#### Stripe Billing plans and fees

| Public option | Public price / commitment | Included Billing volume | Public overage / notes |
| --- | ---: | ---: | --- |
| [Pay as you go](https://stripe.com/billing/pricing) | **0.7% of Billing volume** | None stated | Stripe says this includes Billing transactions processed on and off Stripe and excludes one-off invoices. No recurring Billing subscription fee is listed. |
| [Pay monthly](https://stripe.com/billing/pricing) tier 1 | **$620/month**, 1-year contract | Up to **$100,000/month** | **0.67%** for additional Billing volume. |
| Pay monthly tier 2 | **$1,500/month**, 1-year contract | Up to **$250,000/month** | **0.67%** for additional Billing volume. |
| Pay monthly tier 3 | **$2,950/month**, 1-year contract | Up to **$500,000/month** | **0.67%** for additional Billing volume. |
| Pay monthly tier 4 | **$5,750/month**, 1-year contract | Up to **$1,000,000/month** | **0.67%** for additional Billing volume. |
| Custom pricing | Contact sales | $1,000,000+/month or unique models | Stripe states custom pricing is available for large Billing volume or unique business models. |

#### Stacking and add-on cost signals

| Cost item | Public price signal | Buyer caveat |
| --- | ---: | --- |
| Stripe Payments card processing used with Billing | [2.9% + 30c per successful card charge](https://stripe.com/billing/pricing) | Billing fees are separate from payment processing fees. Verify U.S. vs non-U.S. card, international, and currency-conversion charges. |
| ACH Direct Debit used with Billing | [0.8%, capped at $5](https://stripe.com/billing/pricing) | Payment-method availability and return/dispute fees can vary. |
| Custom domain for hosted payment pages / customer portal | [$10/month](https://stripe.com/pricing) | Appears as a separate Stripe pricing item; verify whether needed for Checkout, Payment Links, or Customer Portal branding. |
| Usage-based billing with Metronome | [Contact Metronome](https://stripe.com/billing/pricing) for advanced usage-based billing | Stripe states basic usage-based billing remains available via Stripe Meters API as part of Billing pricing, while advanced usage-based capabilities are tied to Metronome. |
| Stripe Tax, Revenue Recognition, Sigma, Data Pipeline, Invoicing | Separately priced on [Stripe's pricing page](https://stripe.com/pricing) | These products may be commonly paired with Billing but should not be assumed included unless the contract or Dashboard plan states so. |

#### Contract and cancellation terms to verify

Stripe's [Subscription Pricing and Cancellation Policy](https://stripe.com/legal/subscription-policy), last updated April 10, 2026, states that subscription plans require a monthly or annual commitment, automatically renew for one-month or one-year terms as applicable, and that subscription fees are non-refundable with no prorated refunds if canceled before the end of the term. For Stripe Billing specifically, upgrades and downgrades take effect at the start of the next billing period, and downgrades below the initial plan during the plan term are not permitted.

#### Buyer verification checklist

- Confirm whether your account is on pay-as-you-go, a pay-monthly annual tier, or a custom contract.
- Model total effective cost using Billing volume plus card/ACH fees, refunds, international/currency conversion, Tax, and any add-on products.
- Ask how "Billing volume" is calculated for off-Stripe transactions, credits, refunds, trials, migrations, and connected accounts.
- Confirm overage cadence, tax on Stripe fees, renewal date, cancellation mechanics, and whether unused tier entitlement rolls over; public materials do not indicate rollover.

### Research sources

- [Stripe Billing pricing](https://stripe.com/billing/pricing) - Primary public source for Billing pay-as-you-go fee, pay-monthly tiers, included volume, overage rate, and included feature list.
- [Stripe Pricing & Fees](https://stripe.com/pricing) - Primary public source for broader Stripe processing and adjacent product pricing signals that can stack with Billing.
- [Stripe Subscription Pricing and Cancellation Policy](https://stripe.com/legal/subscription-policy) - Primary legal source for subscription-plan commitments, renewals, overage fees, cancellation timing, and refund policy.

<!-- product-research-agent:stripe-billing:pricing.md:end -->
