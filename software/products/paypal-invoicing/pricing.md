---
type: G2 Product Pricing
title: PayPal Invoicing Pricing
description: Pricing seed for PayPal Invoicing.
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
source_tier: public-cited
claim_policy: cited
reviewed_at: 2026-07-01
expires_at: 2026-07-31
resource: https://www.g2.com/products/paypal-invoicing/reviews
g2_category_rank: 6
g2_category_source: https://www.g2.com/categories/subscription-billing
g2_category_sort: G2 Score
g2_review_count: 175
source_observed_at: 2026-06-29
---

# Pricing

## Category-page pricing signal

| Field | Value |
| --- | --- |
| Entry-level price signal | Pay As You Go |
| Source | G2 Subscription Billing category page |
| Observed at | 2026-06-29 |
| Freshness | expires 2026-09-27 |

## Notes

The G2 category listing showed an entry-level model of Pay As You Go when observed.

Pricing is freshness-sensitive. Agents should treat this file as stale after expires_at unless refreshed.

<!-- product-research-agent:paypal-invoicing:pricing.md:start -->

## Product research enrichment

_Research agent: `product-research/paypal-invoicing`. Reviewed: 2026-07-01. Source tier: public-cited. Recheck by: 2026-07-31._

### Public U.S. pricing refresh - reviewed 2026-07-01

PayPal Invoicing is publicly positioned as **pay-as-you-go** for standard invoice creation: PayPal says there is **no fee to create or send an invoice**, and fees apply when a customer pays online. Current public U.S. rates are listed on PayPal's [business fees page](https://www.paypal.com/us/business/paypal-business-fees) and summarized on the [Invoicing product page](https://www.paypal.com/us/business/accept-payments/invoice?gh_jid=4602865).

#### Standard U.S. invoicing transaction rates

| Payment type selected by payer | Public U.S. rate | Notes |
| --- | ---: | --- |
| PayPal Checkout, Pay with Venmo, or PayPal Guest Checkout | 3.49% + fixed fee | Fixed fee is based on currency received; USD fixed fee is $0.49. |
| Standard credit/debit card, Apple Pay, or other third-party wallets | 2.99% + fixed fee | USD fixed fee is $0.49. PayPal states Apple Pay does not add an Apple Pay fee. |
| PayPal Pay Later options | 4.99% + fixed fee | USD fixed fee is $0.49. |
| Pay by Bank (ACH) | 1.00%, capped at $10.00 per transaction | Availability may vary by account/market/payment flow. |

#### International, currency, refund, and dispute caveats

- For **international invoicing transactions**, PayPal applies the domestic invoicing transaction rate **plus 1.50%** for all invoicing payment types.
- The fixed fee varies by currency received; the U.S. fixed fee shown publicly is **$0.49 USD** for invoicing transactions.
- Currency conversion can add a PayPal exchange-rate spread; PayPal's U.S. fee page lists a **4.00% spread or another disclosed amount** for certain goods-and-services conversions.
- For full or partial refunds of commercial or invoicing transactions, PayPal says there is no separate refund fee, but the original fees paid to receive the payment are **not returned**.
- PayPal lists U.S. dispute and chargeback fees separately; buyers' disputes/chargebacks can create additional costs depending on payment route and outcome.

#### Subscription / add-on pricing signal

PayPal's U.S. merchant-fee page lists an **Invoice Subscription Service** at **$14.99 USD per month** if a merchant subscribes to that service. The public fee page does not fully describe the feature bundle in this table; buyers should confirm with PayPal whether this applies to their intended recurring-invoice or invoice-subscription workflow before budgeting it.

#### Contract and volume-pricing notes

- Standard PayPal Invoicing does not show a public annual contract requirement for creating and sending invoices; a PayPal account is required.
- PayPal's broader business pricing page states that **custom rates and interchange-plus pricing** may be available for established high-volume merchants, which implies sales/vendor confirmation is required for negotiated pricing.

#### Buyer verification checklist

- Confirm the applicable country/market fee schedule for the seller account, not just U.S. rates.
- Confirm which payment methods will be exposed on invoices and how payer choice changes net cost.
- Ask whether ACH / Pay by Bank, Pay Later, Venmo, Apple Pay, recurring invoices, and any Invoice Subscription Service features are enabled for your account and region.
- Model international, currency conversion, refund, dispute, and chargeback costs for realistic invoice scenarios.

### Research sources

- [PayPal Merchant Fees - U.S. business fees](https://www.paypal.com/us/business/paypal-business-fees) - Primary source for current U.S. invoicing transaction rates, international surcharge, fixed fees, refund treatment, dispute and chargeback fee references, and Invoice Subscription Service price.
- [PayPal Invoicing product page](https://www.paypal.com/us/business/accept-payments/invoice?gh_jid=4602865) - Official product page summarizing no-fee invoice creation and headline U.S. payment-processing rates.
- [PayPal Help - How much does it cost to use PayPal Invoicing?](https://pep.paypal.com/us/cshelp/article/how-much-does-it-cost-to-use-paypal-invoicing-help311) - Official help article confirming no setup/monthly fee for standard invoicing and that fees apply when customers pay online.
- [PayPal Business Pricing](https://www.paypal.com/us/business/fees) - Official pricing overview with high-volume/custom pricing context and invoicing rate summary.

<!-- product-research-agent:paypal-invoicing:pricing.md:end -->
