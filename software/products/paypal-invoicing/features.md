---
type: G2 Product Features
title: PayPal Invoicing Features
description: Feature seed for PayPal Invoicing.
tags: [subscription-billing, billing, software-buying]
timestamp: 2026-06-29T00:00:00+02:00
g2_product_id: paypal-invoicing
vendor_id: paypal
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
resource: https://www.g2.com/products/paypal-invoicing/reviews
g2_category_rank: 6
g2_category_source: https://www.g2.com/categories/subscription-billing
g2_category_sort: G2 Score
g2_review_count: 175
source_observed_at: 2026-06-29
---

# Features

This is an initial capability seed. It should be verified against product documentation and user-review evidence before being used for high-confidence buying recommendations.

| Capability | Status | Evidence level | Notes |
| --- | --- | --- | --- |
| invoicing | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |
| payment processing | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |
| invoice tracking | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |
| payment collection | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |

## Evidence note

The capability list is intentionally conservative and derived from the G2 category listing, product page context, and review-summary signals available during the seed pass.

<!-- product-research-agent:paypal-invoicing:features.md:start -->

## Product research enrichment

_Research agent: `product-research/paypal-invoicing`. Reviewed: 2026-07-01. Source tier: public-cited. Recheck by: 2026-09-29._

### Public feature evidence refresh - reviewed 2026-07-01

#### Core capabilities supported by public PayPal pages

| Capability | Public evidence | Buyer notes |
| --- | --- | --- |
| Create, send, and track invoices | PayPal's [Invoicing page](https://www.paypal.com/us/business/accept-payments/invoice?gh_jid=4602865) says merchants can create, send, and track invoices from desktop or mobile. | A PayPal account is required; feature availability may vary by market. |
| Customer payment options | PayPal lists PayPal, Venmo, Apple Pay, credit/debit cards, Pay Later, and Pay by Bank (ACH) as invoice payment options. | Payment options may vary by recipient location, payer eligibility, account configuration, and current PayPal availability. |
| Guest payment | PayPal says customers do not need a PayPal account to pay an invoice. | Buyers should test the payer experience in target geographies. |
| Invoice customization | Public page states merchants can add company name, brand colors, logo, taxes, discounts, shipping details, and notes. | Tax calculation/remittance responsibility remains with the merchant under PayPal's Invoicing Terms. |
| Sharing channels | PayPal says invoices can be sent by email, SMS, messaging apps, social media, shareable link, or QR code. | Mobile and QR workflows may require stable internet and, in some cases, device capabilities. |
| Status tracking and reminders | PayPal describes tracking when invoices are sent, opened, and paid, plus automatic reminders. Developer docs also expose invoice status and reminder APIs. | Confirm reminder controls, localization, and audit needs during implementation. |
| Recurring invoices | PayPal states merchants can set up recurring invoices automatically for subscriptions or retainers. | Do not confuse this with full subscription-billing platforms; verify proration, dunning, upgrades/downgrades, tax, and contract workflows. |
| Offline payment tracking | PayPal developer docs describe recording offline payments such as cash/check and refund records via API. | Useful for A/R tracking, but accounting reconciliation depth should be tested. |

#### Developer-supported capabilities

PayPal's [Invoicing API documentation](https://developer.paypal.com/docs/invoicing/invoicing/) says the APIs can create customized invoices, send them to customers, verify online payment status, record offline payments, refund recorded payments, send reminders, search/list invoices, view details, update, cancel, and delete invoices. PayPal recommends the REST Invoicing API for new integrations and also documents older NVP/SOAP APIs.

#### Edition-, account-, or region-dependent / verify before buying

- **Invoice Subscription Service:** PayPal lists a monthly fee for this service on the U.S. fee page, but the public pricing table does not fully describe the included feature set.
- **ACH / Pay by Bank, Venmo, Pay Later, Apple Pay:** PayPal publicly lists these as payment options, but availability can vary by market, payer, and account configuration.
- **Enterprise subscription billing features:** Public PayPal Invoicing materials support recurring invoices, but advanced subscription-management capabilities such as contract lifecycle management, metered billing, complex proration, revenue recognition, or subscription analytics are not publicly documented as PayPal Invoicing-specific capabilities.

### Research sources

- [PayPal Invoicing product page](https://www.paypal.com/us/business/accept-payments/invoice?gh_jid=4602865) - Primary product evidence for invoice creation, payment options, customization, sharing, tracking, recurring invoices, and mobile usage.
- [PayPal Invoicing API documentation](https://developer.paypal.com/docs/invoicing/invoicing/) - Developer evidence for invoice creation, automation, offline payment recording, reminders, status checks, and supported API families.
- [PayPal Invoicing API reference](https://developer.paypal.com/docs/invoicing/reference/) - API reference evidence for programmatic invoice search, refunds, templates, reminders, and webhook-related tasks.
- [PayPal Invoicing Terms and Conditions](https://www.paypal.com/us/legalhub/paypal/invoicing-tnc?locale.x=en_US) - Legal source for merchant responsibilities, tax accuracy/remittance responsibility, ACH terms, and third-party accounting sync responsibility.

<!-- product-research-agent:paypal-invoicing:features.md:end -->
