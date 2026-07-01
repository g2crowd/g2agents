---
type: G2 Product Integrations
title: Agentforce Revenue Management (formerly Salesforce Revenue Cloud) Integrations
description: Integration seed for Agentforce Revenue Management (formerly Salesforce Revenue Cloud).
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

# Integrations

## Initial integration signal

The G2 sentiment excerpt emphasizes integration with other Salesforce products.

## Integration inventory

| System | Integration type | Evidence level | Notes |
| --- | --- | --- | --- |
| Not yet inventoried | Unknown | unknown | Requires a product-page and vendor-doc pass. |

## Agent guidance

Do not infer native integration depth from category presence alone. Separate native integrations, partner integrations, API support, and third-party connector support in the next pass.

<!-- product-research-agent:agentforce-revenue-management-formerly-salesforce-revenue-cloud:integrations.md:start -->

## Product research enrichment

_Research agent: `product-research/agentforce-revenue-management-formerly-salesforce-revenue-cloud`. Reviewed: 2026-07-01. Source tier: public-cited. Recheck by: 2026-09-29._

### Integration evidence refresh - reviewed 2026-07-01

#### Native Salesforce ecosystem signals

| Integration surface | Evidence | Buyer caveat |
| --- | --- | --- |
| Salesforce CRM dependency | The public pricing page says Agentforce Revenue Management requires a Sales Cloud, Service Cloud, or CRM license. | Treat this as a dependency, not a free bundled integration. Confirm required base edition and objects. |
| Salesforce Contracts / Document Builder | Salesforce SPARC states Revenue Cloud Advanced includes access to Salesforce Contracts, Document Builder, and product/quoteline functionality. | Contract/document capabilities may have separate setup, templates, permissions, and infrastructure documentation. |
| Revenue Cloud Billing / Salesforce Payments | Salesforce Help documents Revenue Cloud Billing payment setup, billing schedules, third-party gateways, and Salesforce Payments availability. | Payment pricing is not public; confirm gateway support, transaction fees, and PCI scope. |
| Dynamic Revenue Orchestrator | Release notes describe Dynamic Revenue Orchestrator as natively built on Salesforce and embedded in end-to-end sales processes. | Verify whether DRO is included in the purchased edition/SKU and whether industry-specific fulfillment is needed. |

#### Marketplace / partner integrations

- Salesforce directs buyers to [AgentExchange](https://agentexchange.salesforce.com/) / partners for apps and implementation expertise from the pricing page.
- For payment gateways, Salesforce Help says third-party gateway adapters may come from a gateway provider or AppExchange, and buyers can bring their own gateway by configuring Apex adapter classes, named credentials, trusted URLs, and webhook notifications.
- No definitive public list of supported Revenue Cloud-specific partner integrations was found in this pass; validate any claimed ERP, tax, e-signature, payment, data warehouse, or provisioning connector against Salesforce, the ISV listing, and an implementation design.

#### API and developer surfaces

| Surface | Public signal | Notes |
| --- | --- | --- |
| Subscription Management API | Salesforce developer docs describe endpoints/examples for product-to-cash flows: selecting/pricing products, activating orders, creating assets, generating billing schedules/invoices, charging payment methods, upsells, downsells, renewals, and cancellations. | Useful for custom product-to-cash automation; confirm API limits and license prerequisites. |
| Revenue Management data models | Salesforce Developers lists Revenue Management data-model areas including Product Catalog Management, Salesforce Pricing, Transaction Management for quote/order/asset/contract, Billing Invoice, Payments, Rate Management, Usage Management, and DRO. | Data-model visibility does not guarantee all modules are licensed. |
| Third-party payment gateway extension | Salesforce Help describes Bring Your Own payment gateways with Apex adapter classes, named credentials, trusted URLs, and webhook endpoints. | Requires technical implementation and Payment Admin permissions; transaction costs require Salesforce confirmation. |
| Legacy Salesforce CPQ APIs | Salesforce CPQ Developer Guide notes its docs are for the Salesforce CPQ managed package and points Revenue Cloud users to Revenue Cloud developer resources. | Buyers migrating from legacy CPQ should not assume managed-package API parity. |

### Research sources

- [Revenue Cloud Pricing | Salesforce](https://www.salesforce.com/sales/revenue-lifecycle-management/pricing/) - Official CRM license dependency and partner/professional services signals.
- [Salesforce Services SPARC PDF](https://www.salesforce.com/content/dam/web/en_us/www/documents/legal/misc/salesforce-security-privacy-and-architecture.pdf) - Documents Revenue Cloud Advanced access to Salesforce Contracts, Document Builder, and product/quoteline functionality.
- [Set Up Third-Party Payment Gateways | Salesforce Help](https://help.salesforce.com/s/articleView?id=ind.billing_setup_third_party_payments.htm&language=en_US&type=5) - Official integration details for Bring Your Own payment gateways, adapters, credentials, trusted URLs, and webhooks.
- [Get Started with Subscription Management API | Salesforce Developers](https://developer.salesforce.com/docs/revenue/subscription-management/guide/introduction.html) - Official developer API examples for subscription product-to-cash flows.
- [Revenue Management Data Model Gallery | Salesforce Developers](https://developer.salesforce.com/docs/platform/data-models/guide/revenue-cloud-category.html) - Official list of Revenue Management data-model domains and objects.
- [Get Started with Salesforce CPQ API | Salesforce Developers](https://developer.salesforce.com/docs/revenue/cpq-developer-guide/guide/cpq-api-get-started.html) - Clarifies legacy Salesforce CPQ managed-package APIs versus Revenue Cloud developer resources.

<!-- product-research-agent:agentforce-revenue-management-formerly-salesforce-revenue-cloud:integrations.md:end -->
