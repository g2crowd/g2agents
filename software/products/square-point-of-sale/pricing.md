---
type: G2 Product Pricing
title: Square Point of Sale Pricing
description: Pricing seed for Square Point of Sale.
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
source_tier: public-cited
claim_policy: cited
reviewed_at: 2026-07-01
expires_at: 2026-07-31
resource: https://www.g2.com/products/square-point-of-sale/reviews
g2_category_rank: 10
g2_category_source: https://www.g2.com/categories/subscription-billing
g2_category_sort: G2 Score
g2_review_count: 1196
source_observed_at: 2026-06-29
---

# Pricing

## Category-page pricing signal

| Field | Value |
| --- | --- |
| Entry-level price signal | Free |
| Source | G2 Subscription Billing category page |
| Observed at | 2026-06-29 |
| Freshness | expires 2026-09-27 |

## Notes

The G2 category listing showed an entry-level price of Free when observed.

Pricing is freshness-sensitive. Agents should treat this file as stale after expires_at unless refreshed.

<!-- product-research-agent:square-point-of-sale:pricing.md:start -->

## Product research enrichment

_Research agent: `product-research/square-point-of-sale`. Reviewed: 2026-07-01. Source tier: public-cited. Recheck by: 2026-07-31._

### Public pricing refresh - reviewed 2026-07-01

Square publishes U.S. pricing for a combined Square business toolkit that includes Point of Sale, payment processing, online selling, invoices, booking, staff/customer tools, and optional industry features. The public page states pricing starts at $0, with no hidden fees or locked-in contracts, and that buyers can cancel or switch plans anytime. Square Plus and Square Premium list a 30-day free trial; Square Free has no monthly subscription cost and charges processing fees when payments are taken. See Square's current [pricing page](https://squareup.com/us/en/pricing) and [Point of Sale pricing page](https://squareup.com/us/en/point-of-sale/software/pricing).

#### Public plan and location pricing

| Plan | Public monthly software price | Notes |
| --- | ---: | --- |
| Square Free | $0/mo. per location | Core POS/payment toolkit; pay payment-processing fees when taking payments. |
| Square Plus | $49/mo. per location | Adds advanced POS features for food and beverage, retail, appointments, and invoicing; includes lower in-person/online processing than Free. |
| Square Premium | $149/mo. per location | Adds 24/7 phone support, advanced reporting, lowest listed in-person processing, more included text marketing, and 0% gift-card load fee. |
| Square Pro | Custom pricing | Square says businesses processing over $250,000/year can ask about custom pricing, processing fees, hardware discounts, onboarding/implementation, technical specialists, and account management. |

#### Current public payment-processing fees

| Payment type | Free | Plus | Premium | Buyer note |
| --- | ---: | ---: | ---: | --- |
| Card present: tap, dip, or swipe | 2.6% + 15c | 2.5% + 15c | 2.4% + 15c | Applies when a card is present. |
| Online or invoice card payments | 3.3% + 30c | 2.9% + 30c | 2.9% + 30c | Applies to online card payments or invoice card payments. |
| Online API card payments | 2.9% + 30c | 2.9% + 30c | 2.9% + 30c | Applies to web/mobile app workflows using Square payment APIs. |
| ACH via invoice | 1%, $1 minimum | 1%, $1 minimum, $10 cap | 1%, $1 minimum, $10 cap | Verify invoice workflow and eligibility. |
| ACH via API | 1%, $1 minimum, $5 cap | Same | Same | Applies through Web Payments SDK and Payments API. |
| Manual entry or card on file | 3.5% + 15c | 3.5% + 15c | 3.5% + 15c | Applies when card number is entered manually or saved card is used. |
| Afterpay | 6% + 30c | 6% + 30c | 6% + 30c | Merchant is paid upfront while customer pays over time. |
| Cash/check | Free | Free | Free | No Square processing fee listed. |
| Bitcoin payments | 0% until 2027 | 0% until 2027 | 0% until 2027 | Applies to in-person QR-code bitcoin payments; verify availability and settlement settings. |

#### Public add-ons, overages, and extra fees

| Item | Public price/rule | Notes |
| --- | --- | --- |
| Text message marketing | Plus: 500 texts/month/account included, then 3c/text; Premium: 2,500 texts/month/account included, then 1.5c/text | Not available in Free per pricing table. |
| Gift card load | Free and Plus: 2.5% load fee; Premium: 0% load fee | Square states there are no additional fees when a gift card is redeemed. |
| Square KDS app | Plus: $30/mo. per device; Premium: $20/mo. per device | Not available in Free; in addition to plan cost. |
| Square Kiosk app | Plus: $50/mo. per device; Premium: $30/mo. per device | Not available in Free; in addition to plan cost. |
| International card transaction fee | Additional 1.5% on cards issued outside the U.S. | Applies across listed plans. |
| Instant transfer | Fee applies | Square says next-business-day transfer to an external bank account is free; instant transfer has a fee. |
| Hardware | Options start at $59 | Square says hardware is not required for all payment methods; verify device, reader, stand, register, rental, and financing costs. |

#### Buyer caveats to verify

- Confirm whether your account is on **Square Free, Plus, Premium, or custom Pro pricing**, because existing-customer pricing may change by current plan.
- For multi-location businesses, model software cost per location and KDS/Kiosk cost per device.
- Validate whether your main transaction mix is card-present, online, keyed/card-on-file, invoice, ACH, Afterpay, or API-driven; rates differ materially.
- Confirm offline-payment rules and risk. Square says offline payments are processed when reconnected and may be declined if not reconnected within the required window; the seller is responsible for expired, declined, or disputed offline payments.
- For high-volume sellers over $250,000/year, ask Square for custom processing, hardware discounts, implementation support, and service-level/support details in writing.

### Research sources

- [Square Processing Fees, Plans, and Software Pricing](https://squareup.com/us/en/pricing) - Official U.S. plan, location, processing-fee, add-on, and FAQ pricing source.
- [Point of Sale Pricing & Plans | Square](https://squareup.com/us/en/point-of-sale/software/pricing) - Official Square Point of Sale plan and feature pricing source, including custom-pricing threshold and offline-payment caveat.

<!-- product-research-agent:square-point-of-sale:pricing.md:end -->
