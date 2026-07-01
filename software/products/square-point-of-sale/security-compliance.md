---
type: G2 Product Security Compliance
title: Square Point of Sale Security and Compliance
description: Security and compliance seed for Square Point of Sale.
tags: [subscription-billing, billing, software-buying]
timestamp: 2026-06-29T00:00:00+02:00
g2_product_id: square-point-of-sale
vendor_id: block
display_category: subscription-billing
category_memberships:
  - category_id: subscription-billing
    fit: partial
    source_tier: public-cited
    reviewed_at: 2026-06-29
owner: shared
source_tier: mixed
claim_policy: cited
reviewed_at: 2026-07-01
expires_at: 2026-09-29
resource: https://www.g2.com/products/square-point-of-sale/reviews
g2_category_rank: 10
g2_category_source: https://www.g2.com/categories/subscription-billing
g2_category_sort: G2 Score
g2_review_count: 1196
source_observed_at: 2026-06-29
---

# Security and Compliance

## Initial security signal

No security or compliance claims were captured in this initial category-page seed.

## Compliance posture

Unknown in this seed.

## Agent guidance

Security, privacy, compliance, data residency, audit, and procurement claims need direct citations and review dates. Agents should not infer certification coverage from product category or vendor brand.

<!-- product-research-agent:square-point-of-sale:security-compliance.md:start -->

## Product research enrichment

_Research agent: `product-research/square-point-of-sale`. Reviewed: 2026-07-01. Source tier: public-cited. Recheck by: 2026-09-29._

### Public security and compliance refresh - reviewed 2026-07-01

Square publishes security, encryption, authentication, and compliance information on its U.S. support and security pages. Detailed compliance artifacts are referenced as available through the [Square Trust Center](https://trust.squareup.com), but buyers may need Trust Center access for full reports.

#### Public security/compliance posture

| Area | Public claim | Buyer note |
| --- | --- | --- |
| PCI DSS | Square states its card processing systems meet Level 1 PCI Data Security Standards and that Square complies with PCI DSS on sellers' behalf so sellers do not need to individually validate their state of compliance. | Confirm scope if you use custom integrations, non-Square hardware, ecommerce scripts, or other processors. |
| ISO 27001 | Square's secure payments page lists "ISO 27001 certified" credentials. | Request certificate scope and date from Trust Center for procurement. |
| SOC/compliance documents | Square support says PCI and SOC reports and related documentation are available through Square Trust Center. | SOC report type, period, and product scope are not fully disclosed in the public page; verify under NDA/access. |
| Encryption | Square says card-present payment data is encrypted in the reader at swipe/tap, sensitive data is encrypted at rest/on disk and over public networks, and standard cryptographic protocols/message formats are used. | Confirm scope for keyed payments, API integrations, and offline mode. |
| Card data on seller devices | Square says card numbers, magnetic-stripe data, and security codes are not stored on Square client devices; Square POS does not retain payment card data on the mobile device or in the application. | Important for PCI scope reduction, but buyers should still manage device security and account access. |
| Admin and organizational controls | Square says access to sensitive data is need-to-know, two-factor authentication and strong password controls are required for administrative access to systems, access is logged, audit logs are reviewed, and incident-response plans are documented. | These are Square organizational controls; buyer-side role/permission reviews remain the seller's responsibility. |
| Seller account MFA | Square support describes two-step verification options using SMS, voice call, or an authentication app; sellers can require two-step verification for team members. | Require MFA for owners/admins and validate team-member enforcement before rollout. |
| Fraud and account protection | Square says it monitors login activity, can block suspicious activity, supports employee permissions/passkeys, and uses machine learning plus human expertise for payment fraud monitoring. | Fraud controls do not eliminate chargeback or declined-payment risk. |

#### Public unknowns / needs vendor confirmation

- Data residency, data subprocessor list, retention/deletion SLAs, and backup geography were not clearly disclosed in the reviewed public POS/security pages.
- Public pages do not disclose a full SOC 2 Type II report, ISO certificate PDF, penetration-test summary, or vulnerability-management SLA without using Trust Center materials.
- Buyers with regulated workloads should verify whether the relevant Square services, APIs, hardware, and country/region are covered by the cited compliance artifacts.

### Research sources

- [Review Square's security and data encryption features](https://squareup.com/help/us/en/article/3797-secure-data-encryption) - Official support page for PCI DSS Level 1, encryption, device card-data handling, logging, administrative controls, and Trust Center reference.
- [Secure Payments Systems - Trusted Payment Solutions - Square](https://squareup.com/us/en/payments/secure) - Official Square security page listing PCI, ISO 27001, end-to-end encryption, account protection, fraud monitoring, and Trust Center.
- [Set up two-step verification | Square Support Center](https://squareup.com/help/us/en/article/5593-2-step-verification) - Official MFA/two-step verification options and team-member enforcement documentation.

<!-- product-research-agent:square-point-of-sale:security-compliance.md:end -->
