---
type: G2 Product News
title: Stripe Billing News
description: Dated product news log for Stripe Billing.
tags:
  - subscription-billing
  - billing
  - software-buying
  - product-news
timestamp: 2026-06-29T00:00:00+02:00
g2_product_id: stripe-billing
vendor_id: stripe
display_category: subscription-billing
category_memberships:
  - category_id: subscription-billing
    fit: core
    source_tier: public-cited
    reviewed_at: 2026-06-29
owner: shared
source_tier: mixed
claim_policy: cited
reviewed_at: 2026-06-29
expires_at: 2026-09-27
resource: https://www.g2.com/products/stripe-billing/reviews
---

# Stripe Billing News

News entries capture dated product, company, pricing, packaging, security, leadership, partnership, funding, acquisition, and other buyer-relevant updates. Registry setup notes and internal maintenance events do not belong in this file.

## Contributor guidance

- Vendor PR teams may propose entries by opening a pull request against this file.
- Each entry should include a date, type, headline, buyer relevance, source URL, submitter, review status, and source note.
- Sources should be public and durable where possible. Press releases, vendor blogs, SEC filings, security advisories, docs changelogs, and reputable news articles are acceptable starting points.
- G2 maintainers should verify the source, classify provenance, and keep promotional language out of the buyer relevance field before merging.

## News log

| Date | Type | Headline | Buyer relevance | Source | Submitter | Status | Source note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-05-27 | subscription-billing | Stripe adds billing schedules for subscription prebilling | Lets billing teams collect payment for future subscription periods before they begin, useful for annual prepay and contract-close workflows. | [Stripe Changelog](https://docs.stripe.com/changelog/dahlia/2026-05-27/subscriptions-billing-schedules) | G2 research | accepted | Official Stripe changelog tied to the Dahlia API release. |
| 2026-04-22 | payment-method | Stripe adds Pix recurring payments for subscriptions in Brazil | Gives subscription businesses a local recurring payment option for Brazilian customers using Pix mandates. | [Stripe Changelog](https://docs.stripe.com/changelog/dahlia/2026-04-22/pix-recurring-payments-support) | G2 research | accepted | Official Stripe changelog with mandate and release details. |
| 2026-01-23 | acquisition | Stripe finalizes Metronome acquisition to expand usage-based billing | Signals deeper Stripe Billing support for complex usage-based pricing, large catalogs, sales-led contracts, and revenue analytics. | [Stripe Blog](https://stripe.com/blog/metronome-stripe-building-the-future-of-billing) | G2 research | accepted | Official Stripe product blog by Stripe Billing and Metronome leadership. |

## News details

### stripe-billing-2026-05-27-stripe-adds-billing-schedules-for-subscription-prebilling

Stripe added [billing schedules for subscription prebilling](https://docs.stripe.com/changelog/dahlia/2026-05-27/subscriptions-billing-schedules), letting companies bill and collect payment for a future subscription period before that period begins.

The buyer relevance is strongest in contract-close and annual-prepay workflows. A finance team can use prebilling when a customer signs before a service period starts, or when cash collection needs to happen ahead of provisioning without creating a brittle manual invoice process.

- Buyer signal: Stripe Billing is adding more contract-aware subscription controls, not only self-serve card billing primitives.
- Follow-up: Verify how prebilling interacts with revenue recognition, subscription changes, credit notes, renewals, and downstream ERP sync.

### stripe-billing-2026-04-22-stripe-adds-pix-recurring-payments-for-subscriptions-in-brazil

Stripe's [Pix recurring payments update](https://docs.stripe.com/changelog/dahlia/2026-04-22/pix-recurring-payments-support) adds support for recurring subscription payments in Brazil using Pix mandates.

For subscription companies entering Brazil, this is a localization signal. Cards may work for some customers, but local payment methods can affect conversion, payment success, and buyer trust. Pix recurring support gives Stripe Billing a more native path for Brazilian subscription revenue.

- Buyer signal: Useful for global SaaS teams that need local recurring payment coverage without adding a separate Brazil-only billing stack.
- Follow-up: Check mandate setup, renewal notification requirements, retry behavior, refunds, and reporting coverage by payment method.

### stripe-billing-2026-01-23-stripe-finalizes-metronome-acquisition-to-expand-usage-based-billing

Stripe and Metronome published a [joint product blog](https://stripe.com/blog/metronome-stripe-building-the-future-of-billing) after Stripe finalized the Metronome acquisition, framing the deal around usage-based billing, large pricing catalogs, sales-led contracts, and revenue analytics.

The strategic read is that Stripe wants to cover more of the modern monetization stack, especially for AI and infrastructure companies where usage events, commitments, credits, and hybrid pricing are core to the business model. For buyers, the question becomes whether Stripe can combine developer-first payments with enterprise-grade usage billing.

- Buyer signal: Strong evidence that Stripe Billing is moving deeper into complex usage-based monetization.
- Follow-up: Ask how Metronome capabilities will integrate with existing Stripe Billing objects, reporting, entitlements, invoicing, and revenue workflows.
