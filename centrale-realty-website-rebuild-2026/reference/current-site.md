# Current centralerealty.com (fetched 2026-10-01)
- Served over plain HTTP only (no valid TLS cert); www -> non-www 301. WordPress on Apache/PHP 7.4.33 (end-of-life PHP).
- Title: "Centrale Realty, Inc | Serving Oakland and Macomb County". No meta description or OG tags.
- Home copy: full-service real estate company, Rochester Hills, serving Metro Detroit since 1984; residential and commercial buyer, seller and tenant representation.
- Nav / URLs to 301 at launch: /, /for-sale/, /for-sale/vacant-land-for-sale/ (now /properties/), /for-lease/, /commercial-space/, /construction-services/, /terms-of-use/, /legal/, /contact-us/ (also "Build to Suit").
- Contact (public, from footer): 2490 Walton Boulevard, Ste 103, Rochester Hills, MI 48309; office 248.656.8830; fax 844.273.8409; info@centralerealty.com. A mailto to info@landrhomes.com also appears in the page.

## Open questions for the owner
- The live site markets sales, leases, commercial space, vacant land and construction. The rebuild charter says "own homes only". Confirm which services the new site should carry.
- The new site must be served over HTTPS (get a certificate at hosting).
- Confirm which email address is correct (centralerealty.com vs landrhomes.com).

## Discrepancies noticed on the live site
- Fax: confirmed by owner as 248.694.9344 (live footer and Contact page each showed a different number).
- Construction page links to www.landrhomes.com (new homes) and www.lrgeneralcontracting.com (general contracting); both left as external links.
- Service copy in `site/` is adapted from the live pages (lightly edited). Specific properties named there (Falcon Estates / Sherwood Forest Estates, Cambridge Hills) and the "luxury corporate housing / duplex / townhome" rentals should be confirmed as still current.
- Legal and Terms were rewritten (2026-10-02) as modern general-purpose real estate website terms covering sales, leasing and commercial, fair housing, privacy; IDX/MLS text removed when the IDX widget was dropped. This is a draft, not legal advice: have a Michigan attorney and REALCOMP review it, and fill the TODOs (broker licence number, IDX attribution, EHO logo).
