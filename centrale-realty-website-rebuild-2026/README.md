# Centrale Realty Website Rebuild 2026

Rebuild of **centralerealty.com**. Started 2026-10-01.

## Decisions
- **Stack:** plain static files (HTML/CSS/vanilla JS, no build step). No IDX/MLS widget (decided 2026-10-02: listings will not be embedded on the site).
- **Business scope (updated 2026-10-01):** all aspects of the business: residential and commercial sales, vacant land, spec homes, leasing, commercial space and construction services. This replaces the earlier "own homes only" rescope.
- **Contact email:** info@centralerealty.com.
- **URLs:** same paths as the live WordPress site (`/for-sale/`, `/properties/` (old `/for-sale/vacant-land-for-sale/` and `/vacant-land/` 301-redirect via .htaccess), `/for-lease/`, `/commercial-space/`, `/construction-services/`, `/contact-us/`, `/terms-of-use/`, `/legal/`), so few redirects are needed. Old `/feed/`, `/wp-json/` etc. can simply 404.
- Site must be served over HTTPS (the current site has no valid certificate).

## Status
- [x] Project created, reference analysed (`reference/notes.md`)
- [x] Static multi-page site in `site/` covering all services, with placeholder copy (TODO markers)
- [ ] Centrale assets: logo, colours, fonts, photography
- [x] Service page copy, Terms of Use, Legal (broker license no. 6505204949, Equal Housing logo, no-data-collection privacy statement)
- [ ] Attorney review of Terms/Legal
- [ ] Own analytics property (no tracking IDs copied from the reference site)
- [ ] Launch + 301 redirects from the current site

## Reference site
Layout ideas only (hero, card grid, footer structure, JSON-LD). No code, copy, images, trademarks or tracking IDs reused.
