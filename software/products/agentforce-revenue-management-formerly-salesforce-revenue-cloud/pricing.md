---
type: G2 Product Pricing
title: Agentforce Revenue Management (formerly Salesforce Revenue Cloud) Pricing
description: Pricing seed for Agentforce Revenue Management (formerly Salesforce Revenue Cloud).
tags: [subscription-billing, billing, software-buying]
timestamp: 2026-06-29T00:00:00+02:00
g2_product_id: agentforce-revenue-management-formerly-salesforce-revenue-cloud
vendor_id: salesforce
display_category: subscription-billing
category_memberships:
  - category_id: subscription-billing
    fit: adjacent
    source_tier: public-cited
    reviewed_at: 2026-06-29
owner: shared
source_tier: public-cited
claim_policy: cited
reviewed_at: 2026-07-01
expires_at: 2026-08-15
resource: https://www.g2.com/products/agentforce-revenue-management-formerly-salesforce-revenue-cloud/reviews
g2_category_rank: 7
g2_category_source: https://www.g2.com/categories/subscription-billing
g2_category_sort: G2 Score
g2_review_count: 1497
source_observed_at: 2026-06-29
---

# Pricing

## Category-page pricing signal

| Field | Value |
| --- | --- |
| Entry-level price signal | Not shown in category listing |
| Source | G2 Subscription Billing category page |
| Observed at | 2026-06-29 |
| Freshness | expires 2026-09-27 |

## Notes

The category listing did not expose an entry-level subscription billing price for this product in this seed.

Pricing is freshness-sensitive. Agents should treat this file as stale after expires_at unless refreshed.

<!-- product-research-agent:agentforce-revenue-management-formerly-salesforce-revenue-cloud:pricing.md:start -->

## Product research enrichment

_Research agent: `product-research/agentforce-revenue-management-formerly-salesforce-revenue-cloud`. Reviewed: 2026-07-01. Source tier: public-cited. Recheck by: 2026-08-15._

### Public pricing refresh - reviewed 2026-07-01

Salesforce now publishes list pricing for Revenue Cloud editions on its [Revenue Cloud Pricing](https://www.salesforce.com/sales/revenue-lifecycle-management/pricing/) page. The page uses Revenue Cloud / Revenue Lifecycle Management naming; Salesforce's Trust documentation maps Revenue Cloud to the SKUs branded **Revenue Cloud Advanced** and **Revenue Cloud Growth**.

| Public edition | Public list price | Billing term shown | Publicly listed scope | Buyer notes |
| --- | ---: | --- | --- | --- |
| Revenue Cloud Growth | **$150 USD/user/month** | Billed annually | Quoting & Configurator, Order Capture, Subscriptions | Salesforce describes this as streamlined CPQ and subscription management. Requires a Sales Cloud, Service Cloud, or CRM license. |
| Revenue Cloud Advanced | **$200 USD/user/month** | Billed annually | Everything in Growth plus Contracts & Orders, Consumption & Invoicing, AI & Analytics | Salesforce describes this as a quote-to-cash platform; public page states the edition requires an annual contract. |

#### Contract and dependency caveats

- Salesforce states Agentforce Revenue Management is a **paid add-on**, not a standard Sales Cloud feature, and the pricing page footnote says it **requires a Sales Cloud, Service Cloud, or CRM license**.
- The page says it is provided for information only, is subject to change, and buyers should contact Salesforce for detailed pricing.
- Salesforce says there is **no current free trial** for Agentforce Revenue Management; the site suggests workshops instead.

#### Success plan and services costs

| Item | Public pricing signal | Caveat |
| --- | --- | --- |
| Standard Success Plan | Included in all licenses | Self-guided resources and community access. |
| Premier Success Plan | **30% of net license fees** | Salesforce says it is bundled with Unlimited Edition; buyers should confirm whether this applies to their base CRM edition and Revenue Cloud add-on. |
| Signature Success Plan | Contact account executive | No public price. |
| Professional services / partner implementation | Not publicly priced | Salesforce directs buyers to Professional Services and certified partners; implementation, migration, and integration costs are likely separate. |

#### Add-ons, overages, and usage-based items to verify

- Public user-license pricing does **not** disclose minimum seats, data/storage entitlements, sandbox requirements, quote/order transaction limits, or overage charges.
- Public docs for Salesforce Payments in Revenue Cloud Billing reference a **cost-per-transaction model** for native and Bring Your Own payment gateways, but no public transaction price, threshold, or included volume was found.
- Buyers should ask Salesforce to itemize: base CRM license dependency, Revenue Cloud edition, Revenue Cloud Billing if separate, Salesforce Payments transaction pricing, Agentforce/AI usage entitlements, environments/sandboxes, storage, premium support, and renewal uplift language.

### Research sources

- [Revenue Cloud Pricing | Salesforce](https://www.salesforce.com/sales/revenue-lifecycle-management/pricing/) - Official public plan names, USD list prices, annual billing, edition feature summaries, support plan pricing, CRM dependency, no-free-trial note, and contact-sales caveats.
- [Salesforce Services SPARC PDF](https://www.salesforce.com/content/dam/web/en_us/www/documents/legal/misc/salesforce-security-privacy-and-architecture.pdf) - Defines Revenue Cloud as including SKUs branded Revenue Cloud Advanced and Revenue Cloud Growth.
- [Payment Schedules and Payment Schedule Items | Salesforce Help](https://help.salesforce.com/s/articleView?id=ind.billing_payment_schedules_and_payment_schedule_items_auto_manual.htm&language=en_US) - Public documentation noting Salesforce Payments for Revenue Cloud Billing uses a cost-per-transaction model and requires account executive confirmation.

<!-- product-research-agent:agentforce-revenue-management-formerly-salesforce-revenue-cloud:pricing.md:end -->
