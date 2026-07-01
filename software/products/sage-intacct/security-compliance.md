---
type: G2 Product Security Compliance
title: Sage Intacct Security and Compliance
description: Security and compliance seed for Sage Intacct.
tags: [subscription-billing, billing, software-buying]
timestamp: 2026-06-29T00:00:00+02:00
g2_product_id: sage-intacct
vendor_id: sage-software
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
resource: https://www.g2.com/products/sage-intacct/reviews
g2_category_rank: 3
g2_category_source: https://www.g2.com/categories/subscription-billing
g2_category_sort: G2 Score
g2_review_count: 4118
source_observed_at: 2026-06-29
---

# Security and Compliance

## Initial security signal

No security or compliance claims were captured in this initial category-page seed.

## Compliance posture

Unknown in this seed.

## Agent guidance

Security, privacy, compliance, data residency, audit, and procurement claims need direct citations and review dates. Agents should not infer certification coverage from product category or vendor brand.

<!-- product-research-agent:sage-intacct:security-compliance.md:start -->

## Product research enrichment

_Research agent: `product-research/sage-intacct`. Reviewed: 2026-07-01. Source tier: public-cited. Recheck by: 2026-09-29._

### Live security and compliance research - reviewed 2026-07-01

This section summarizes public Sage-published security, privacy, compliance, authentication, audit, residency, and availability evidence. Certification and audit claims should be validated with current reports under NDA during procurement.

#### Publicly stated security and compliance posture

| Area | Public evidence | Buyer notes |
| --- | --- | --- |
| Security program | Sage publishes a Sage Intacct Information Security Management Program for Sage Intacct core ERP production environments, effective October 2023. | Treat as a vendor security statement; request current SOC reports, ISO certificate, and security whitepaper/bridge letter. |
| SOC 1 / SOC 2 | Sage says Sage Intacct U.S. production environments are in scope for SSAE 18 SOC 1 Type II and SOC 2 Type II opinions from independent third-party audit firms; reports are available under NDA to relevant customers/prospects. | Confirm report period, trust-service criteria, included products/modules, data centers, complementary user-entity controls, and exceptions. |
| ISAE 3402 / ISAE 3000 | Sage states it maintains ISAE 3402 and ISAE 3000 opinions mapped to SSAE 18 and SOC 2 respectively, available under NDA. | Relevant for international assurance needs; request the actual reports. |
| PCI | Sage states it maintains Level 1 PCI status with QSA audit, Report on Compliance, and attestations as both merchant and service provider, available under NDA. | The public page labels this "PCI-DCC Level 1"; buyers should verify whether the current attestation is PCI DSS, scope, and payment workflows covered. |
| HIPAA | Sage states the product is periodically assessed by an independent third party to help customers fulfill U.S. HIPAA obligations. | This is not the same as a blanket HIPAA certification; request BAA availability and covered-service scope. |
| GDPR | Sage states the product meets GDPR requirements. | Validate data-processing addendum, subprocessors, transfer mechanisms, and region-specific privacy notices. |
| ISO 27001 | Sage states Sage Intacct maintains ISO27001; Sage's FY25 non-financial statement separately says Sage products are managed under an ISMS aligned and certified to ISO 27001 and identifies Intacct Financials as having SOC 2 Type 1 and Type 2 reports. | Request certificate, statement of applicability, product scope, issuing body, and expiry date. |
| Penetration testing | Sage states it conducts regular internal and external third-party risk assessments and penetration tests, with independent summary reports available under NDA. | Request latest executive summary and remediation status. |

#### Authentication, access, and audit controls

- Sage Intacct supports SAML 2.0 SSO; the help page lists verified identity providers including Assure Bridge, OneLogin, Centrify, and AD FS, and says other SAML 2.0 identity providers can be used if they support the protocol.
- Sage documents 2-step verification alongside SSO; it notes SSO users authenticating via the identity provider bypass Intacct 2-step verification, while direct-login users can be forced through 2-step verification.
- Sage Intacct supports passwordless authentication using Microsoft Entra ID when SSO is enabled.
- Sage's security program states security-related audit logs are generated, reviewed regularly, and maintained for at least one year.
- For the REST API, Sage developer documentation states OAuth 2.0 is used and HTTPS is required for all requests.

#### Availability, backup, and data residency

| Area | Public evidence | Buyer notes |
| --- | --- | --- |
| SLA | Sage's Buy with Confidence Program targets 24x7 availability for Sage Intacct Core Financials and offers subscription credits when availability falls below 99.8%, subject to exclusions and a claim deadline. | Credits require a request within 15 days after the month of the outage; scheduled maintenance and exclusions apply. |
| Maintenance | Sage says it publishes a weekly 4-hour scheduled maintenance window and will try to keep extended maintenance to nights/weekends and no more than 8 hours per week whenever possible. | Confirm region/product maintenance windows and status-page notification setup. |
| DR objectives | Sage's security program states customer-data RPO of no more than 4 hours and RTO of no more than 24 hours. | Confirm whether all purchased modules and regions are included. |
| Data residency | Sage's Intacct privacy policy states U.S. customer data is stored in the U.S.; Australia in Australia; Canada in Canada; France, South Africa, and U.K. customer data in the EU, with exceptions for support/debugging, AI/ML modules, Planning, and Systems Integration Group/custom marketplace work. | Confirm chosen operating country, module exceptions, support access, and subprocessors before signing. |

### Research sources

- [Sage Intacct Information Security Management Program](https://www.sage.com/en-us/legal/terms-and-conditions/product-and-service-terms-and-conditions/sage-intacct/information-security-management-program/) - Official security program covering audits, compliance, logging, encryption, access control, pen testing, DR, and RPO/RTO.
- [Privacy Policy for the Sage Intacct Services](https://www.sage.com/en-us/legal/terms-and-conditions/product-and-service-terms-and-conditions/sage-intacct/privacy-policy-full/) - Official privacy and data location details for Customer Data, Administrative Data, third-party disclosures, and module exceptions.
- [Sage Intacct Buy with Confidence Program (SLA) - United States](https://www.sage.com/en-us/legal/terms-and-conditions/product-and-service-terms-and-conditions/sage-intacct/sla/) - Official availability target, subscription-credit mechanics, maintenance window, and exclusions.
- [Set up single sign-on (SSO) | Sage Intacct Help](https://www.intacct.com/ia/docs/en_ZA/help_action/Administration/Sign-in/Single_sign_on/set-up-single-sign-on-sso.htm) - Official SSO, SAML 2.0, 2-step verification, and identity-provider setup details.
- [Application security | Sage Intacct Developer Portal](https://developer.sage.com/intacct/docs/1/sage-intacct-rest-api/authorization-and-security/security) - Official API security documentation for OAuth 2.0 and HTTPS requirements.
- [Sage FY25 Non-Financial Statement](https://www.sage.com/en-us/-/media/files/company/documents/pdf/sustainability-and-society/2025-reports/non-financial-statement.pdf) - Corporate-level current statement referencing ISO 27001 ISMS and Intacct Financials SOC 2 reports.

<!-- product-research-agent:sage-intacct:security-compliance.md:end -->
