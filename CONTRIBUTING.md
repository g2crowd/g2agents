# Contributing

This repo is a prototype for governed, agent-readable software buying knowledge.

## Contribution principles

- Keep claims buyer-relevant.
- Label source tier honestly.
- Prefer specific, dated claims over broad marketing language.
- Do not present vendor-attested content as G2-curated content.
- Do not delete disputed content without preserving the dispute context.
- Keep product identity stable by editing canonical product folders under `software/products/`.

## Pull request checklist

Before opening a PR:

- Frontmatter is present and valid.
- `owner` matches the file's intended ownership.
- `source_tier` matches the evidence.
- Freshness-sensitive claims include `reviewed_at`.
- Pricing, security, compliance, AI, and integration claims include citations where possible.
- Internal links work.
- Product category references point to existing category folders.

## Vendor PRs

Vendors should start with `vendor-claims.md` and then propose changes to shared files such as `features.md`, `pricing.md`, `integrations.md`, and `security-compliance.md`.

G2-owned files such as `profile.md`, `reviews-summary.md`, and `alternatives.md` require G2 editorial approval.

## In-app edit proposals

The web app can submit edit proposals for vendor/shared product Markdown files without requiring the submitter to have a GitHub account.

Editable files:

- `vendor-claims.md`
- `features.md`
- `pricing.md`
- `integrations.md`
- `security-compliance.md`
- `news.md`

The app opens a GitHub pull request through a G2-controlled review bot. Submitters should include a real name, work email, organization, and concise change summary so reviewers can verify the source and follow up.

## Suggested claim block

Use a short claim block when a claim is important, contested, or freshness-sensitive:

```md
> Claim status: vendor-attested
> Evidence: Vendor documentation, reviewed 2026-06-29.
> Freshness: expires 2026-09-27.
```
