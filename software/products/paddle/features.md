---
type: G2 Product Features
title: Paddle Features
description: Feature seed for Paddle.
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
source_tier: mixed
claim_policy: cited
reviewed_at: 2026-07-01
expires_at: 2026-09-29
resource: https://www.g2.com/products/paddle/reviews
g2_category_rank: 5
g2_category_source: https://www.g2.com/categories/subscription-billing
g2_category_sort: G2 Score
g2_review_count: 236
source_observed_at: 2026-06-29
---

# Features

This is an initial capability seed. It should be verified against product documentation and user-review evidence before being used for high-confidence buying recommendations.

| Capability | Status | Evidence level | Notes |
| --- | --- | --- | --- |
| subscription billing | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |
| merchant of record | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |
| payment processing | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |
| tax compliance | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |
| reporting | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |
| failed payment recovery | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |

## Evidence note

The capability list is intentionally conservative and derived from the G2 category listing, product page context, and review-summary signals available during the seed pass.

<!-- product-research-agent:paddle:features.md:start -->

## Product research enrichment

_Research agent: `product-research/paddle`. Reviewed: 2026-07-01. Source tier: public-cited. Recheck by: 2026-09-29._

---

### Product capability refresh - reviewed 2026-07-01

Paddle is positioned as a merchant-of-record billing platform for software, SaaS, apps, games, and digital products. Public documentation supports the following buyer-relevant capabilities, with some functions dependent on checkout/invoicing setup, APIs, or custom commercial terms.

#### Core capabilities supported by public sources

| Capability | Public evidence | Buyer notes |
| --- | --- | --- |
| Merchant of record / authorized reseller | Paddle says it acts as merchant/reseller of record and assumes responsibility for local laws, regulations, and taxes for transactions it processes. | Validate approved product categories, territories, buyer-facing terms, refund handling, and whether the MoR model fits your accounting and customer-contracting needs. |
| Subscription management | Paddle supports recurring billing, trials, discounts, proration, per-use billing, plan changes, cancellations, bundles, seat-based plans, add-ons, pause/reactivation, and a customer portal. | Confirm exact behavior for your pricing catalog, upgrades/downgrades, entitlements, and self-serve cancellation rules. |
| Checkout | Paddle supports overlay and inline checkout via Paddle.js, with localized language/currency/payment-method presentation and automatic subscription creation when checkout completes. | Overlay is lower engineering effort; inline is more embedded but requires more implementation work. |
| Payments and payment methods | Paddle docs list cards, Apple Pay, Google Pay, PayPal, bank transfer, iDEAL/Wero, Pix, UPI, WeChat Pay, and other local methods, with runtime availability based on country, currency, and device. | Availability is not universal for every buyer/currency/device; test target markets in sandbox. |
| Sales tax / VAT / GST handling | Paddle states it registers, charges, files, and remits sales tax in 100+ jurisdictions as merchant of record. | Sellers still need to verify product tax category, B2B VAT handling, invoice language, and edge cases with their tax advisors. |
| Revenue recovery / retention | Pricing and product pages reference automated dunning/failed-payment recovery; Retain adds cancellation flows, term optimization, and reactivation. | Distinguish included churn-prevention features in Paddle Billing from Retain standalone or premium offerings. |
| Reporting / metrics | Paddle lists reporting and ProfitWell Metrics; integrations page says Metrics is included with Paddle Billing. | Confirm metric definitions, data freshness, exports, and reconciliation fields for finance teams. |
| Usage/metered billing | Paddle's metered billing page describes subscription modifiers, charges API, one-off charges, and usage-based billing support. | Public docs do not provide a full rating-engine feature matrix; complex usage rating may require APIs or partner tools. |
| Invoicing / hybrid billing | Checkout docs say customers can transition between self-serve checkout and invoice billing; pricing page says invoicing may require custom pricing. | Confirm invoice workflows, bank-transfer support, payment terms, collections, and custom pricing before procurement. |

#### Edition-dependent, custom, or unverified areas

- **Custom pricing, custom implementation, Advisory, and success management** are public signals but not fully specified; confirm in an order form.
- **Retain standalone** is marketed as working with existing billing stacks; pricing and packaging are not publicly disclosed.
- **Data residency, enterprise SSO, role-based access depth, audit logs, SLA, and support response times** were not fully evidenced in public product pages reviewed here; confirm with Paddle or its trust/security portal.

References: [Paddle Billing](https://www.paddle.com/billing), [Subscriptions](https://www.paddle.com/billing/subscriptions), [Checkout docs](https://developer.paddle.com/concepts/sell/self-serve-checkout/), [Tax compliance](https://www.paddle.com/billing/tax-and-compliance), and [Metered billing](https://www.paddle.com/billing/metered-billing).

### Research sources

- [SaaS Billing Software | Paddle](https://www.paddle.com/billing) - Official overview of billing, payments, subscriptions, tax compliance, reporting, churn prevention, and pricing-model support.
- [SaaS Subscription Management Software | Paddle](https://www.paddle.com/billing/subscriptions) - Official subscription-management feature evidence: proration, pause/reactivation, customer portal, seat-based plans, add-ons.
- [Paddle Checkout | Paddle Developer Docs](https://developer.paddle.com/concepts/sell/self-serve-checkout/) - Official developer evidence for overlay/inline checkout, automatic subscription creation, and hybrid checkout/invoicing.
- [Sales Tax Compliance Software | Paddle](https://www.paddle.com/billing/tax-and-compliance) - Official tax-compliance and merchant-of-record claims, including 100+ jurisdictions.
- [Metered Billing Software | Paddle](https://www.paddle.com/billing/metered-billing) - Official evidence for usage/metered billing, subscription modifiers, and Charges API.

<!-- product-research-agent:paddle:features.md:end -->
