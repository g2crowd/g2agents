---
type: G2 Product Features
title: Square Point of Sale Features
description: Feature seed for Square Point of Sale.
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

# Features

This is an initial capability seed. It should be verified against product documentation and user-review evidence before being used for high-confidence buying recommendations.

| Capability | Status | Evidence level | Notes |
| --- | --- | --- | --- |
| point of sale | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |
| payment processing | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |
| customer payments | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |
| small-business operations | Present in seed | public-cited | Captured from the G2 category listing or product positioning context. |

## Evidence note

The capability list is intentionally conservative and derived from the G2 category listing, product page context, and review-summary signals available during the seed pass.

<!-- product-research-agent:square-point-of-sale:features.md:start -->

## Product research enrichment

_Research agent: `product-research/square-point-of-sale`. Reviewed: 2026-07-01. Source tier: public-cited. Recheck by: 2026-09-29._

### Public feature refresh - reviewed 2026-07-01

Square Point of Sale should be evaluated as a POS and payments product that is bundled with a broader Square business toolkit. Square's public [Point of Sale pricing and feature matrix](https://squareup.com/us/en/point-of-sale/software/pricing) separates baseline capabilities from plan- and industry-dependent capabilities.

#### Core capabilities publicly listed across Square POS plans

| Capability area | Public evidence | Buyer interpretation |
| --- | --- | --- |
| In-person payments | Tap/dip/swipe, Tap to Pay on iPhone and Android, manual entry/card on file, Cash App Pay, Afterpay, cash/check, and bitcoin payment options are listed. | Strong fit for businesses that need card-present checkout and multiple tender types. Verify hardware and regional availability. |
| Item library and inventory basics | Square lists adding menu items, products, and services; tracking inventory and sales; item categories; product/menu management. | Suitable for basic product/service catalogs; advanced retail inventory/reporting may require Plus/Premium or industry configuration. |
| Discounts, refunds, and checkout controls | Public matrix includes discounts/refunds, age verification prompts, bottle deposits, exchanges, and some cross-location return workflows. | Verify whether controls are available in your plan and industry mode. |
| Reporting | Sales insights, reconciliation reports, daily sales summary email, and multiple industry reports are listed. | Basic sales reporting is present; advanced reporting is positioned more heavily in Premium and industry modules. |
| Customer engagement | Customer profiles, purchase history, segmentation, messaging, receipts, loyalty, marketing, coupons, and gift cards are listed. | Some features are included only in paid plans or have usage-based fees, such as text marketing and gift-card loads. |
| Online selling and invoices | Square lists online ordering/site tools, pickup/local delivery, website builder, invoices, recurring invoices, deposits, reminders, estimates, and contracts. | Relevant to subscription-billing/category context because recurring invoices and online subscriptions are public features, but buyers should verify billing automation depth. |

#### Edition-, industry-, or add-on-dependent capabilities

| Capability | Public status | Verification needed |
| --- | --- | --- |
| Advanced POS features for food, retail, appointments, and invoicing | Square Plus includes access to advanced POS features for those areas. | Confirm exactly which workflows are in Square POS versus Square for Retail/Restaurants/Appointments modules. |
| Loyalty, email/text marketing, staff management | Listed as Plus capabilities; Premium adds more text-message allowance and support/reporting. | Confirm seats, message volumes, permissions, and export needs. |
| KDS and Kiosk | Publicly priced as separate per-device app fees on Plus/Premium. | Validate device count, supported hardware, printer/routing setup, and restaurant workflows. |
| Restaurant operations | Menus, floor plans, coursing, third-party order management, reservations integrations, QR ordering, and drive-thru workflows are listed. | Many restaurant workflows show plan gating; verify before assuming base Free plan coverage. |
| Retail operations | Inventory aging, COGS, sell-through, projected profit, vendor sales, product images, barcode/stock workflows, and Shopify catalog sync via Thrive Inventory are listed in public pages. | Advanced inventory analytics are not equivalent to an ERP; validate SKU volume, purchase-order, vendor, and reconciliation workflows. |
| Beta features | Square labels Square AI, voice ordering, and order guide as beta/currently rolling out. | Treat as unverified for critical operations until enabled in your account and documented contractually. |

#### Known unknowns and caveats

- Public pages do not provide a single downloadable entitlement matrix with every field-level permission, export, audit, or API limitation by plan.
- Feature availability may depend on region, seller eligibility, hardware, app version, and whether the account is configured for a retail, restaurant, appointment, or services workflow.
- For subscription-billing use cases, Square publicly lists recurring invoices and online item/service subscriptions, but buyers should verify dunning, proration, tax, revenue recognition, contract terms, and integration needs directly with Square.

### Research sources

- [Point of Sale Pricing & Plans | Square](https://squareup.com/us/en/point-of-sale/software/pricing) - Official feature matrix for POS, payments, reporting, staff, customer engagement, online selling, invoicing, restaurant, retail, and add-on capabilities.
- [Square Processing Fees, Plans, and Software Pricing](https://squareup.com/us/en/pricing) - Official plan-level packaging that identifies Free, Plus, Premium, and Pro positioning.

<!-- product-research-agent:square-point-of-sale:features.md:end -->
