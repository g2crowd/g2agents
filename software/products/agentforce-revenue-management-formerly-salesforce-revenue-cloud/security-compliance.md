---
type: G2 Product Security Compliance
title: Agentforce Revenue Management (formerly Salesforce Revenue Cloud) Security and Compliance
description: Security and compliance seed for Agentforce Revenue Management (formerly Salesforce Revenue Cloud).
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

# Security and Compliance

## Initial security signal

No security or compliance claims were captured in this initial category-page seed.

## Compliance posture

Unknown in this seed.

## Agent guidance

Security, privacy, compliance, data residency, audit, and procurement claims need direct citations and review dates. Agents should not infer certification coverage from product category or vendor brand.

<!-- product-research-agent:agentforce-revenue-management-formerly-salesforce-revenue-cloud:security-compliance.md:start -->

## Product research enrichment

_Research agent: `product-research/agentforce-revenue-management-formerly-salesforce-revenue-cloud`. Reviewed: 2026-07-01. Source tier: public-cited. Recheck by: 2026-09-29._

### Security and compliance refresh - reviewed 2026-07-01

Salesforce publishes security evidence for Revenue Cloud through its Trust and Compliance documentation rather than a standalone product trust page. Buyers should match these documents to the exact order-form SKU, infrastructure, and region.

#### Publicly documented coverage

| Area | Public evidence | Buyer interpretation |
| --- | --- | --- |
| Product coverage | Salesforce's Trust page lists **Revenue Cloud Advanced (formerly Revenue Lifecycle Management)** and **Revenue Cloud Billing** under Salesforce Services product documentation. | Use the SPARC/NLI/I&S documents linked from the Trust page for procurement review. |
| SKU mapping | Salesforce SPARC states **Revenue Cloud** includes SKUs branded Revenue Cloud Advanced and Revenue Cloud Growth, and that Revenue Cloud Advanced includes access to Salesforce Contracts, Document Builder, and product/quoteline functionality. | Confirms the trust documentation covers current Growth/Advanced naming, but buyers should confirm any add-on modules. |
| Architecture and segregation | SPARC describes Covered Services as multitenant with logical data separation by customer-specific Organization IDs and role-based access privileges. | Standard Salesforce shared-service model; customers configure roles, permissions, and sharing. |
| Authentication | SPARC references supported access mechanisms including user/password, SAML federation, OpenID Connect, OAuth, social login, and delegated authentication; MFA and SSO details are in the applicable NLI/Security Guide. | Confirm IdP, SSO, MFA enforcement, session controls, and admin policies in your org. |
| Logging and audit | SPARC states user access log entries are maintained and that setup administrative changes are tracked in Setup Audit Trail. | Advanced monitoring such as Event Monitoring or Shield may be separately licensed. |
| Encryption | SPARC states communications use TLS with at least 2048-bit RSA certificates and 128-bit symmetric keys; replication between data centers uses AES-256 encrypted links. | Field-level/platform encryption options and key management should be evaluated separately. |
| Backup / DR | SPARC describes near-real-time replication to a secondary site, backup integrity checks, annual DR testing, RTO target of 12 hours, and RPO target of 4 hours for Covered Services, with exclusions. | Confirm whether these targets apply to all purchased modules, sandboxes, and Hyperforce regions. |

#### Certifications and exclusions to verify

- The Salesforce Services SPARC says the Covered Services' information-security control environment undergoes SOC 1, SOC 2, or SOC 3 audits, with Salesforce reports available from the compliance site; Revenue Cloud is **not listed among the SOC exclusions** in the reviewed SPARC.
- The SPARC says Salesforce has achieved ISO 27001/27017/27018 certification for its ISMS for Covered Services, with exclusions; Revenue Cloud is **not listed among the ISO exclusions** in the reviewed SPARC. Salesforce's compliance site also lists current ISO certificates and updates.
- Do **not** assume all certifications apply: the same SPARC explicitly excludes Revenue Cloud and Revenue Cloud Billing from HITRUST and ENS scope, and excludes Revenue Cloud from HDS scope.
- For PCI, Salesforce's SPARC includes PCI DSS AoC language for Covered Services with exclusions and adds customer obligations for storing payment-card PANs. Buyers handling payment data should confirm whether their use of Revenue Cloud Billing, Salesforce Payments, gateway adapters, and encryption configuration satisfies their PCI responsibilities.

#### Procurement checklist

Ask Salesforce for the current SPARC, NLI, Infrastructure & Sub-processors, SOC report, ISO certificates, PCI AoC if relevant, data-residency/subprocessor mapping for your region, and any Shield/Event Monitoring/Platform Encryption license requirements.

### Research sources

- [Salesforce Trust and Compliance Documentation](https://www.salesforce.com/company/legal/trust-and-compliance-documentation/?bc=OTH) - Official index listing Revenue Cloud Advanced and Revenue Cloud Billing product documentation and explaining SPARC/NLI/I&S usage.
- [Salesforce Services SPARC PDF](https://www.salesforce.com/content/dam/web/en_us/www/documents/legal/misc/salesforce-security-privacy-and-architecture.pdf) - Primary security, privacy, architecture, certification, logging, authentication, encryption, backup, DR, and deletion evidence for covered Salesforce services including Revenue Cloud.
- [ISO 27001 | Salesforce Compliance Site](https://compliance.salesforce.com/en/categories/iso-27001) - Current public compliance-site signal for Salesforce ISO certificates and covered services.
- [General | Salesforce Compliance Site](https://compliance.salesforce.com/en/services/general) - Public compliance-site index showing current SOC, ISO, BCR, and secure development lifecycle documents.
- [Set Up Third-Party Payment Gateways | Salesforce Help](https://help.salesforce.com/s/articleView?id=ind.billing_setup_third_party_payments.htm&language=en_US&type=5) - Payment-gateway setup details relevant to PCI/payment-processing due diligence.

<!-- product-research-agent:agentforce-revenue-management-formerly-salesforce-revenue-cloud:security-compliance.md:end -->
