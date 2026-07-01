---
type: G2 Vendor Claims
title: Chargebee Vendor Claims
description: Vendor-claim workspace for Chargebee.
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
owner: vendor
source_tier: vendor-attested
claim_policy: attested
reviewed_at: 2026-07-01
expires_at: 2026-09-29
resource: https://www.g2.com/products/chargebee/reviews
g2_category_rank: 1
g2_category_source: https://www.g2.com/categories/subscription-billing
g2_category_sort: G2 Score
g2_review_count: 961
source_observed_at: 2026-06-29
---

# Vendor Claims

No vendor-submitted registry claims have been accepted for Chargebee yet.

## Initial status

This file is reserved for future claims from Chargebee. Until a verified vendor PR updates this file, agents should not treat this page as an active vendor-maintained source.

## Suggested vendor claim format

> Claim status: vendor-attested
> Evidence: Vendor-provided documentation or statement.
> Freshness: expires 2026-09-27.

## Agent guidance

Agents should prefer [Profile](profile.md), [Reviews Summary](reviews-summary.md), and cited product evidence over this placeholder.

<!-- product-research-agent:chargebee:vendor-claims.md:start -->

## Product research enrichment

_Research agent: `product-research/chargebee`. Reviewed: 2026-07-01. Source tier: vendor-attested. Recheck by: 2026-09-29._

### Vendor-attested claim candidates - researched 2026-07-01

The following are **claim candidates from Chargebee-controlled public sources**. They should not be rewritten as neutral G2 truth unless independently validated or accepted through a vendor evidence workflow.

| Claim candidate | Public vendor-attested basis | Buyer-useful validation step |
| --- | --- | --- |
| Chargebee Billing supports subscription, usage-based, and hybrid billing models. | Pricing page lists flexible Billing for usage-based, subscriptions, and hybrid models. | Validate specific usage event volume, aggregation, proration, re-rating, and contract-amendment scenarios. |
| Starter is $0/month for the first USD 250K cumulative billing, then 0.75% monthly overage on billing after that limit. | Public pricing page. | Confirm the contractual definition of billing and how the cumulative threshold is calculated. |
| Performance is USD 7,188/year, billed monthly, for up to USD 100K billing/month. | Public pricing page. | Confirm overage rate, annual commitment terms, and included support/implementation. |
| Chargebee lists 30+ or 35+ payment gateway support depending on page context. | Pricing page says 35+ gateway integrations; marketplace/docs say over 30+ gateways. | Confirm exact gateways, countries, payment methods, and plan limits for the buyer's region. |
| Chargebee provides REST APIs, webhooks/events, SDKs, OpenAPI, API Explorer, and Time Machine testing. | Official API docs. | Confirm API limits, webhook retry behavior, SDK support window, and sandbox/live promotion process. |
| Chargebee has SOC 1 Type 2, SOC 2 Type 2, PCI DSS Level 1, and ISO/IEC 27001:2022 evidence available. | Compliance docs and PCI validation PDF; full SOC reports require in-app download/terms. | Request current reports/certificates, scope, dates, auditor details, and complementary controls. |
| SAML 2.0 is supported with Okta, OneLogin, and Microsoft Entra ID; only one IdP can be configured per site. | SAML documentation. | Validate SSO/SCIM availability by plan, emergency access, and offboarding controls. |
| CPQ, RevRec, and Growth are adjacent Chargebee SKUs with separate packaging and custom or sales-assisted pricing for many tiers. | Public pricing page. | Require line-item quote detail and avoid assuming these capabilities are included in Billing. |

#### Vendor evidence gaps to request

- Current SOC 1/SOC 2 reports and ISO certificate, including scope and dates.
- Complete order form with add-ons, overages, gateways, implementation, support, and renewal language.
- Connector-specific implementation guides for the buyer's required ERP/CRM/tax/payment stack.
- Security questionnaire responses for data residency, subprocessors, incident notification, backup/DR, and audit-log retention.

### Research sources

- [Chargebee Plans and Pricing](https://www.chargebee.com/pricing/) - Vendor-controlled public source for pricing and packaging claim candidates.
- [Chargebee Billing product page](https://www.chargebee.com/billing/) - Vendor-controlled public source for Billing capability claim candidates.
- [Chargebee Marketplace](https://marketplace.chargebee.com/) - Vendor-controlled public source for integration and gateway ecosystem claim candidates.
- [Chargebee API Getting Started](https://apidocs.chargebee.com/docs/api/getting-started) - Vendor-controlled public source for developer-surface claim candidates.
- [Chargebee Compliance Certificates documentation](https://www.chargebee.com/docs/billing/2.0/data-privacy-security/compliance-certificates) - Vendor-controlled public source for SOC, PCI, and ISO claim candidates.
- [Chargebee SAML Single Sign-On documentation](https://www.chargebee.com/docs/billing/2.0/data-privacy-security/saml) - Vendor-controlled public source for SAML and IdP support claim candidates.

<!-- product-research-agent:chargebee:vendor-claims.md:end -->
