---
type: G2 Vendor Claims
title: NetSuite Vendor Claims
description: Vendor-claim workspace for NetSuite.
tags: [subscription-billing, billing, software-buying]
timestamp: 2026-06-29T00:00:00+02:00
g2_product_id: netsuite
vendor_id: oracle
display_category: subscription-billing
category_memberships:
  - category_id: subscription-billing
    fit: adjacent
    source_tier: public-cited
    reviewed_at: 2026-06-29
owner: vendor
source_tier: vendor-attested
claim_policy: attested
reviewed_at: 2026-07-01
expires_at: 2026-10-29
resource: https://www.g2.com/products/netsuite/reviews
g2_category_rank: 2
g2_category_source: https://www.g2.com/categories/subscription-billing
g2_category_sort: G2 Score
g2_review_count: 4677
source_observed_at: 2026-06-29
---

# Vendor Claims

No vendor-submitted registry claims have been accepted for NetSuite yet.

## Initial status

This file is reserved for future claims from Oracle. Until a verified vendor PR updates this file, agents should not treat this page as an active vendor-maintained source.

## Suggested vendor claim format

> Claim status: vendor-attested
> Evidence: Vendor-provided documentation or statement.
> Freshness: expires 2026-09-27.

## Agent guidance

Agents should prefer [Profile](profile.md), [Reviews Summary](reviews-summary.md), and cited product evidence over this placeholder.

<!-- product-research-agent:netsuite:vendor-claims.md:start -->

## Product research enrichment

_Research agent: `product-research/netsuite`. Reviewed: 2026-07-01. Source tier: vendor-attested. Recheck by: 2026-10-29._

### 2026-07-01 vendor-attested claim candidates

The following are **vendor-attested candidates** from Oracle/NetSuite public materials. They are not independent G2 findings and should be validated against current contracts, product docs, and customer requirements.

| Claim candidate | Vendor-attested evidence | Buyer verification question |
| --- | --- | --- |
| NetSuite Core Suite includes ERP financials, purchasing, inventory, order entry, AR, expense reporting, CRM/SFA, marketing automation, support, dashboards, center logins, Basic Support, one training pass, and Standard Tier infrastructure. | Oracle NetSuite GBU Cloud Services service description. | Which exact Core Suite/SuiteSuccess edition is on the quote, and which modules are excluded or add-ons? |
| Standard service tier is included with Core Suite and supports up to 100 full licensed users, 100 GB File Cabinet storage, 200k average monthly transaction lines, base integration concurrency up to 5, and up to 1 SuiteCloud Plus license. | Oracle service-tier table. | What are the customer's current and forecast transaction-line, storage, integration, and user metrics? |
| SuiteBilling supports subscription plans, price books, subscriptions, price plans, usage/rating, renewals, change orders, billing accounts, charge records, billing operations, and Revenue Recognition integration. | Oracle SuiteBilling Help Center overview. | Is SuiteBilling included in the subscription, and are revenue recognition and optional SuiteBilling features licensed/configured? |
| SuiteBilling supports flat, volume, and tiered pricing models, recurring and one-time charges, renewals, change orders, customer-specific pricing, and reporting such as MRR/TCV/churn. | Oracle SuiteBilling datasheet. | Do these reports and pricing models match the buyer's accounting definitions and contract edge cases? |
| NetSuite operates geographically distinct data centers and hosts NetSuite from OCI data centers with regional counterpart DR/failover. | Oracle NetSuite data center document. | Where will the tenant be provisioned, what data residency is contractually committed, and what services are excluded from DR? |
| Oracle NetSuite issues SOC 1 Type II and SOC 2 Type II reports and is certified for PCI DSS and ISO 27001:2013. | Oracle NetSuite data center document. | Obtain current reports/certificates, scope, bridge letters, and PCI AOC before relying on the claim. |
| NetSuite supports authentication options including token-based authentication, OAuth 2.0, 2FA, SAML SSO, OIDC SSO, IP rules, SSH keys for SFTP, and secrets management. | Oracle Authentication Help Center. | Which controls are enabled by default vs. customer-configured, and how will privileged/integration roles be governed? |
| SuiteApp.com features hundreds of SuiteCloud-built solutions and a Built for NetSuite program. | SuiteApp.com public marketplace page. | For each selected SuiteApp, verify vendor, BFN status, security documentation, pricing, support SLA, and NetSuite release compatibility. |

#### Claims not publicly confirmed in this pass

- A current Oracle-published NetSuite price list, SuiteBilling list price, add-on-module list price, or per-user public list price was not found.
- Public documentation did not establish that every SuiteBilling feature is included in every NetSuite edition.
- Public documentation did not establish that any specific third-party connector is included in standard NetSuite pricing.

### Research sources

- [Oracle NetSuite GBU Cloud Services - Service Descriptions](https://www.oracle.com/europe/a/ocom/docs/netsuite-cloud-services-sd.pdf) - Vendor contract/service-description evidence for Core Suite, service tiers, SuiteCloud Plus, connector definitions, and contract limits.
- [SuiteBilling Overview | Oracle NetSuite Help Center](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_1520360275.html) - Vendor documentation for SuiteBilling capabilities and Revenue Recognition integration.
- [NetSuite SuiteBilling Datasheet](https://www.netsuite.com/portal/assets/public-pdf/ds-ns-suitebilling.pdf) - Vendor datasheet for SuiteBilling pricing models, rating models, renewals, change orders, and reporting.
- [NetSuite Data Center | Oracle NetSuite](https://www.netsuite.com/portal/collateral/public/ds-netsuite-data-center.pdf) - Vendor-attested security, hosting, DR, certification, privacy, and availability claims.
- [Authentication | Oracle NetSuite Help Center](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/book_4299752196.html) - Vendor documentation for supported authentication and access-control surfaces.
- [SuiteApp.com](https://www.suiteapp.com/) - Vendor ecosystem page for SuiteApps, Built for NetSuite, and partner-provided app caveat.

<!-- product-research-agent:netsuite:vendor-claims.md:end -->
