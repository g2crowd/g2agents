---
type: G2 Product Features
title: Agentforce Revenue Management (formerly Salesforce Revenue Cloud) Features
description: Feature seed for Agentforce Revenue Management (formerly Salesforce Revenue Cloud).
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
source_tier: mixed
claim_policy: cited
reviewed_at: 2026-07-01
expires_at: 2026-09-29
resource: https://www.g2.com/products/agentforce-revenue-management-formerly-salesforce-revenue-cloud/reviews
g2_category_rank: 7
g2_category_source: https://www.g2.com/categories/subscription-billing
g2_category_sort: G2 Score
g2_review_count: 1497
source_observed_at: 2026-06-29
---

# Features

This is an initial capability seed. It should be verified against product documentation and user-review evidence before being used for high-confidence buying recommendations.

| Capability | Status | Evidence level | Notes |
| --- | --- | --- | --- |
| CPQ | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |
| pricing | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |
| quoting | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |
| billing automation | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |
| revenue operations | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |
| Salesforce ecosystem integration | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |

## Evidence note

The capability list is intentionally conservative and derived from the G2 category listing, product page context, and review-summary signals available during the seed pass.

<!-- product-research-agent:agentforce-revenue-management-formerly-salesforce-revenue-cloud:features.md:start -->

## Product research enrichment

_Research agent: `product-research/agentforce-revenue-management-formerly-salesforce-revenue-cloud`. Reviewed: 2026-07-01. Source tier: public-cited. Recheck by: 2026-09-29._

### Public feature refresh - reviewed 2026-07-01

Salesforce positions Agentforce Revenue Management / Revenue Cloud as a Salesforce-native revenue lifecycle product. Public evidence supports the following capabilities, with edition and license caveats.

#### Core capabilities with public evidence

| Capability area | Public evidence | Edition / caveat |
| --- | --- | --- |
| Product catalog and price management | Salesforce lists Product Catalog & Price Management in the edition comparison and release notes describe product catalog management, product classifications, bundles, product rules, and pricing capabilities. | Public pricing table lists this as a top feature, but implementation details depend on Salesforce setup and data model. |
| CPQ / quoting | Pricing page says Agentforce Revenue Management includes CPQ features and Growth includes Quoting & Configurator. | Requires underlying Sales Cloud, Service Cloud, or CRM license. |
| Product configuration | Release notes describe Product Configurator capabilities such as compatibility/validation rules and flexible bundles. | Rules and bundle complexity should be validated during a proof of concept. |
| Order capture and order lifecycle | Growth includes Order Capture; edition comparison lists Order and Asset Lifecycle Management and Order Decomposition & Orchestration. | Order orchestration may require Advanced or related Dynamic Revenue Orchestrator capabilities. |
| Subscriptions and amendments | Growth lists Subscriptions; Salesforce developer docs for Subscription Management describe examples for buy-now flows, upsells, downsells, renewals, cancellations, assets, billing schedules, invoices, and payments. | Subscription Management API behavior depends on enabled licenses and configuration. |
| Contracts | Advanced includes Contracts & Orders; Salesforce SPARC notes Revenue Cloud Advanced includes access to Salesforce Contracts, Document Builder, and product/quoteline functionality. | Contract authoring/CLM scope should be mapped to the purchased SKU. |
| Billing schedules, invoicing, and consumption | Advanced includes Consumption & Invoicing; Salesforce Help states billing schedules define when and how an order product is invoiced and are available with Revenue Cloud Advanced or Revenue Cloud Billing licenses. | Billing and payments can have separate license and transaction-cost implications. |
| Revenue analytics / AI | Advanced lists AI & Analytics and the feature comparison lists Revenue Management Intelligence and Agentforce for Revenue. | Public docs do not disclose all AI usage limits or included agent actions; confirm entitlements. |

#### Edition-dependent or unverified items

- **Growth vs. Advanced:** Growth appears focused on quoting/configuration, order capture, and subscriptions; Advanced adds contracts/orders, consumption/invoicing, and AI/analytics on the public pricing page.
- **Billing depth:** Revenue Cloud Billing documentation supports invoice generation, billing schedules, payment features, disputes, taxes, and related billing workflows, but buyers should confirm whether those are included in Revenue Cloud Advanced, require Revenue Cloud Billing, or require additional Salesforce Payments licensing.
- **Roadmap and migration from legacy Salesforce CPQ/Billing:** Public docs distinguish legacy Salesforce CPQ managed-package APIs from Revenue Cloud developer resources; migration scope, parity, and roadmap should be confirmed with Salesforce or an implementation partner.

### Research sources

- [Revenue Cloud Pricing | Salesforce](https://www.salesforce.com/sales/revenue-lifecycle-management/pricing/) - Official edition feature summaries and public comparison list for Growth and Advanced.
- [Learn About Revenue Cloud | Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.revenue_lifecycle_management.htm&language=en_US&type=5) - Official overview of Revenue Cloud scope and required editions.
- [Revenue Lifecycle Management Release Notes | Salesforce Help](https://help.salesforce.com/s/articleView?id=release-notes.rn_revenue_lifecycle_management.htm&language=en_US&release=250&type=5) - Official feature detail for catalog, pricing, configurator, quote/order capture, asset lifecycle, and Dynamic Revenue Orchestrator.
- [Get Started with Subscription Management API | Salesforce Developers](https://developer.salesforce.com/docs/revenue/subscription-management/guide/introduction.html) - Developer evidence for subscription lifecycle examples spanning orders, assets, billing schedules, invoices, and payments.
- [Manage Billing Schedules and Billing Schedule Groups | Salesforce Help](https://help.salesforce.com/s/articleView?id=ind.billing_schedules_and_schedule_groups.htm&language=en_US) - Billing schedule capability and license availability for Revenue Cloud Advanced or Revenue Cloud Billing.

<!-- product-research-agent:agentforce-revenue-management-formerly-salesforce-revenue-cloud:features.md:end -->
