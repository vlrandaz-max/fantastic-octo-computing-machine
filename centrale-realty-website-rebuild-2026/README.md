# Centrale Realty Website Rebuild 2026

Rebuild of **centralerealty.com**. Started 2026-10-01.

## Decisions
- **Stack:** plain static files (HTML/CSS/vanilla JS, no build step) + an IDX widget.
- **Listings source:** REALCOMP (MLS) via an IDX vendor widget.
- **Business scope:** Centrale Realty markets **its own homes only**. The site is not a general property search and does not actively market other brokers' listings.

## What that means for the site
- The IDX widget is **locked to Centrale's own listings** (filter by Centrale's office/broker ID in the vendor's settings). No open-ended map search, no "search all homes", no neighbourhood/city search pages that pull in other brokers' inventory.
- Dropped from the earlier skeleton because they imply a full-service brokerage: Agents directory, Rent, Regions/Communities, Careers, Sign in / Sign up, "Sell with us" for third parties.
- Pages: Home · Homes Available (own inventory, IDX widget) · Home detail (vendor-hosted or widget) · About · Contact · Legal (Terms, Privacy, Accessibility, Equal Housing).
- Footer must carry the MLS/IDX attribution and disclaimer REALCOMP and the IDX vendor require. Confirm the exact text, logo and refresh-time wording with REALCOMP before launch; I have not verified their current rules.
- Sold/closed and off-market homes: don't show others' data; for Centrale's own sales, check what REALCOMP allows before publishing sold prices.

## Status
- [x] Project created, reference analysed (`reference/notes.md`)
- [x] Static skeleton in `site/`, rescoped to own-homes-only
- [ ] Pick IDX vendor and paste widget embed into `site/homes.html` (see `site/idx-config.md`)
- [ ] Centrale assets: logo, colours, fonts, photography
- [ ] Content: about copy, contact details, broker licence numbers, legal text
- [ ] Own analytics property (no tracking IDs copied from the reference site)
- [ ] Launch + 301 redirects from the current site

## Reference site
Layout ideas only (hero, card grid, footer structure, JSON-LD). No code, copy, images, trademarks or tracking IDs reused.
