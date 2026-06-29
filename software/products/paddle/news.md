---
type: G2 Product News
title: Paddle News
description: Dated product news log for Paddle.
tags:
  - subscription-billing
  - billing
  - software-buying
  - product-news
timestamp: 2026-06-29T00:00:00+02:00
g2_product_id: paddle
vendor_id: paddle
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
resource: https://www.g2.com/products/paddle/reviews
---

# Paddle News

News entries capture dated product, company, pricing, packaging, security, leadership, partnership, funding, acquisition, and other buyer-relevant updates. Registry setup notes and internal maintenance events do not belong in this file.

## Contributor guidance

- Vendor PR teams may propose entries by opening a pull request against this file.
- Each entry should include a date, type, headline, buyer relevance, source URL, submitter, review status, and source note.
- Sources should be public and durable where possible. Press releases, vendor blogs, SEC filings, security advisories, docs changelogs, and reputable news articles are acceptable starting points.
- G2 maintainers should verify the source, classify provenance, and keep promotional language out of the buyer relevance field before merging.

## News log

| Date | Type | Headline | Buyer relevance | Source | Submitter | Status | Source note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-06-23 | reporting | Paddle adds checkout performance reports | Helps SaaS sellers analyze checkout conversion by session and compare checkout configurations by theme, display mode, and country. | [Paddle Changelog](https://developer.paddle.com/changelog/2026/checkouts-report/) | G2 research | accepted | Official Paddle developer changelog with release date and product detail. |
| 2026-06-17 | payment-method | Paddle adds UPI Autopay for recurring payments in India | Expands subscription monetization in India by supporting INR UPI payments for one-time purchases and recurring subscriptions. | [Paddle Changelog](https://developer.paddle.com/changelog/2026/upi-autopay/) | G2 research | accepted | Official Paddle changelog entry with payment behavior and release date. |
| 2026-06-11 | pricing | Paddle launches paid trials for subscriptions | Lets subscription businesses charge reduced-price trials, reduce abuse, and test localized trial pricing. | [Paddle Changelog](https://developer.paddle.com/changelog/2026/paid-trials/) | G2 research | accepted | Official Paddle release note with API and checkout details. |

## News details

### paddle-2026-06-23-paddle-adds-checkout-performance-reports

Paddle's [June 23 changelog](https://developer.paddle.com/changelog/2026/checkouts-report/) adds checkout performance reports, giving sellers a way to analyze checkout conversion by session and compare configurations across checkout theme, display mode, and country.

For a SaaS company, that turns checkout from a payment page into a measurable revenue surface. The buyer signal is that Paddle is investing beyond merchant-of-record operations into the analytics layer teams need when they localize checkout, test payment experiences, or tune conversion by market.

- Buyer signal: Useful for teams that want monetization tooling and checkout optimization in the same platform.
- Follow-up: Ask whether reporting data can be exported or joined with product analytics, CRM, and experimentation systems.

### paddle-2026-06-17-paddle-adds-upi-autopay-for-recurring-payments-in-india

Paddle added [UPI Autopay support](https://developer.paddle.com/changelog/2026/upi-autopay/) for India, extending INR payment support to recurring subscription use cases as well as one-time purchases.

This matters because local payment coverage is often the difference between "can sell globally" and "can actually convert buyers in a market." For companies expanding into India, UPI Autopay gives Paddle a more credible recurring-payment story than card-only checkout.

- Buyer signal: Stronger fit for SaaS sellers that want India localization without building direct local payment integrations.
- Follow-up: Validate mandate behavior, retry handling, refunds, reporting, and whether the flow fits both self-serve and sales-assisted subscriptions.

### paddle-2026-06-11-paddle-launches-paid-trials-for-subscriptions

Paddle's [paid trials release](https://developer.paddle.com/changelog/2026/paid-trials/) lets subscription businesses charge a reduced price for a trial period before the subscription renews at the standard price.

That is a practical packaging feature, not just a pricing tweak. Paid trials can reduce trial abuse, create a stronger buying signal, and let teams test lower-friction offers in different countries or segments without manually stitching together coupons and subscription changes.

- Buyer signal: Relevant for SaaS teams experimenting with product-led growth, localized pricing, or lower-commitment entry offers.
- Follow-up: Compare how Paddle models trial periods in checkout, API objects, invoices, taxes, refunds, and downstream revenue reporting.
