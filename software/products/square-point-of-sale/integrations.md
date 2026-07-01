---
type: G2 Product Integrations
title: Square Point of Sale Integrations
description: Integration seed for Square Point of Sale.
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

# Integrations

## Initial integration signal

No integration inventory was captured in this initial category-page seed.

## Integration inventory

| System | Integration type | Evidence level | Notes |
| --- | --- | --- | --- |
| Not yet inventoried | Unknown | unknown | Requires a product-page and vendor-doc pass. |

## Agent guidance

Do not infer native integration depth from category presence alone. Separate native integrations, partner integrations, API support, and third-party connector support in the next pass.

<!-- product-research-agent:square-point-of-sale:integrations.md:start -->

## Product research enrichment

_Research agent: `product-research/square-point-of-sale`. Reviewed: 2026-07-01. Source tier: public-cited. Recheck by: 2026-09-29._

### Public integration refresh - reviewed 2026-07-01

Square supports integrations through built-in Square modules, the [Square App Marketplace](https://squareup.com/us/en/app-marketplace), partner-managed apps, and developer APIs/SDKs. Buyers should separate "listed integration" from operationally proven, bidirectional, field-complete sync.

#### Native Square ecosystem surfaces

| Surface | Public signal | Buyer note |
| --- | --- | --- |
| Square Online / online ordering | Square's POS matrix lists online site, online ordering profile, pickup/local delivery, customer accounts, and multiple website management. | Useful for sellers wanting POS + online catalog/order sync; validate catalog, inventory, discounts, fulfillment, and tax behavior. |
| Square Invoices / recurring invoices | Public features include invoices, recurring invoices, deposits, reminders, estimates, contracts, and online card/ACH invoice payments. | Good fit for simple billing; verify subscription lifecycle, failed-payment handling, and accounting exports. |
| Square Appointments / bookings | Public plans include booking and future bookings/service/team reporting in feature sections. | Verify staff calendars, deposits/no-show policies, and calendar integrations. |
| Square Loyalty, Marketing, Gift Cards, Messages | Public features include customer directory, loyalty, email/text marketing, customized receipts, coupons, gift cards, and messaging. | Usage-based fees and plan gating apply; confirm consent, SMS rules, and export needs. |
| Square Banking / Payroll / Hardware | Pricing pages cross-link Square Banking, Payroll, and hardware options. | Treat as adjacent Square products, not necessarily included POS functionality. |

#### Marketplace and partner integrations

| Integration/channel | Public evidence | Notes |
| --- | --- | --- |
| Square App Marketplace | Square support describes it as a place for third-party integrations that connect partner apps to a Square account to automate tasks and organize data. | App partners' features, services, and subscriptions are managed by those partners directly. |
| WooCommerce | Square App Marketplace page lists WooCommerce as a free app and describes syncing in-person/web sales, inventory, customer data, itemized transaction details, recurring customers/payment methods, subscriptions, and pre-orders. | Marketplace ratings/reviews show mixed user experiences; validate version compatibility and sync direction in a sandbox. |
| QuickBooks, Shippo, DoorDash, Faire, Deliverect, WooCommerce | Square's buyer-facing article gives these as App Marketplace examples for accounting, shipping, ordering, wholesale, delivery/order management, and ecommerce. | Treat as vendor-published examples, not proof of fit for every workflow. |
| Wix, Google, Facebook/Instagram, OpenTable, SevenRooms, Grubhub, DoorDash | The POS feature matrix lists Wix store sync, Order with Google, social integration, reservation integrations, and third-party order management examples. | Many are channel- or industry-specific; confirm supported regions and plan gating. |

#### API and developer surfaces

Square's developer site states that developers can build with more than 20 Square APIs and 100+ endpoints, including payment, commerce, customer, staff, and merchant APIs. Square also publishes server-side SDKs for Python, Node.js, Ruby, PHP, Java, .NET, and Go, plus mobile/frontend surfaces such as Mobile Payments SDK, Point of Sale API, In-App Payments SDK, and Web Payments SDK. See [Square Developers](https://developer.squareup.com/us/en) and [Square SDKs](https://developer.squareup.com/docs/sdks).

#### Integration buyer checks

- Confirm whether the integration is native Square-built, partner-built, or custom API work.
- Validate supported objects: items/catalog, inventory counts, orders, payments, refunds, payouts, fees, customers, taxes, discounts, gift cards, subscriptions, and locations.
- Check sync direction, sync frequency, conflict handling, historical backfill, deletion behavior, and rate/API limits.
- Confirm who provides support when a sync fails: Square, the marketplace partner, system integrator, or internal developers.

### Research sources

- [Integrate third-party applications | Square Support Center](https://squareup.com/help/us/en/article/5437-manage-your-square-app-marketplace-subscriptions) - Official support page explaining Square App Marketplace integrations and partner-managed subscriptions/services.
- [Square APIs & SDKs](https://developer.squareup.com/us/en) - Official developer overview for Square APIs, SDKs, endpoints, app marketplace publishing, and partner program.
- [Square SDKs](https://developer.squareup.com/docs/sdks) - Official SDK and mobile/frontend integration surface documentation.
- [WooCommerce | Square App Marketplace](https://squareup.com/us/en/app-marketplace/app/woocommerce) - Public example of a Square marketplace integration with ecommerce, inventory, customer, and subscription/preorder claims.
- [Point of Sale Pricing & Plans | Square](https://squareup.com/us/en/point-of-sale/software/pricing) - Official feature matrix listing built-in and named integration examples such as Wix, Google, OpenTable, SevenRooms, Grubhub, and DoorDash.

<!-- product-research-agent:square-point-of-sale:integrations.md:end -->
