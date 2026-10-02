# Centrale Realty Website Rebuild 2026

Rebuild of **centralerealty.com**. Started 2026-10-01.

## Decisions
- **Stack:** plain static files (HTML/CSS/vanilla JS, no build step) + an IDX widget.
- **Listings source:** REALCOMP (MLS) via an IDX vendor widget.
- **Business scope (updated 2026-10-01):** all aspects of the business: residential and commercial sales, vacant land / build to suit, leasing, commercial space and construction services. This replaces the earlier "own homes only" rescope.
- **Contact email:** info@centralerealty.com.
- **URLs:** same paths as the live WordPress site (`/for-sale/`, `/for-sale/vacant-land-for-sale/`, `/for-lease/`, `/commercial-space/`, `/construction-services/`, `/contact-us/`, `/terms-of-use/`, `/legal/`), so few redirects are needed. Old `/feed/`, `/wp-json/` etc. can simply 404.
- **Listings source:** REALCOMP (MLS) via an IDX vendor widget on the For Sale, Land, For Lease and Commercial pages.
- Footer must carry the MLS/IDX attribution and disclaimer REALCOMP and the IDX vendor require. Confirm the exact text with REALCOMP before launch; I have not verified their rules.
- Site must be served over HTTPS (the current site has no valid certificate).

## Status
- [x] Project created, reference analysed (`reference/notes.md`)
- [x] Static multi-page site in `site/` covering all services, with placeholder copy (TODO markers)
- [ ] Pick IDX vendor and paste widget embed into the marked blocks in `site/` (see `site/idx-config.md`)
- [ ] Centrale assets: logo, colours, fonts, photography
- [x] Service page copy, Terms of Use, Legal (broker license no. 6505204949, Equal Housing logo, no-data-collection privacy statement)
- [ ] Attorney review of Terms/Legal; exact REALCOMP/IDX attribution (hidden TODO comment in each footer); confirm IDX widget data/cookie practices
- [ ] Own analytics property (no tracking IDs copied from the reference site)
- [ ] Launch + 301 redirects from the current site

## Reference site
Layout ideas only (hero, card grid, footer structure, JSON-LD). No code, copy, images, trademarks or tracking IDs reused.
