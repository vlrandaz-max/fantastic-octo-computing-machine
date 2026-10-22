# 2490 Walton Blvd office leasing — handoff notes

Purpose: a separate chat/workspace for marketing and leasing the two office suites at 2490 Walton Blvd.
Website maintenance (centralerealty.com rebuild, SEO, deploys) is a different chat; keep them separate.

## The property
- **Address:** 2490 Walton Blvd, Rochester Hills, MI 48309 (NE corner of Walton Blvd and Brewster Rd). Two-storey brick and stone building. Centrale Realty's own office is Suite 103.
- **Suite 100:** 725 rentable sq ft, lower level. Open, bright layout. Rent $1,200/mo.
- **Suite 101:** 956 rentable sq ft, lower level. Conference room, private office, open workspace, stone accent wall. Rent $1,675/mo.
- **Combined:** 1,681 rentable sq ft. (Rentable sq ft includes the common areas/common bathrooms; both suites measured the same way.)
- **Lease:** modified gross, 2-year minimum. Quarterly maintenance fee (CAM) and cable/internet paid by tenant. **Gas and electric: INCLUDED in Suite 100 rent; Suite 101 tenant pays its own gas and electric** (corrected by Vito). Free on-site parking. Office or medical use. Remodeled 2002-2026.
- **Location:** near I-75 and M-59, near Henry Ford Rochester Hospital.
- **Move-in costs (MLS brochures):** Suite 100: first month $1,200, deposit $1,800 (1.5x), cleaning fee $350 non-refundable. Suite 101: first month $1,675, deposit $2,512.50, cleaning $350. THESE DEPOSIT/CLEANING NUMBERS WERE ASSUMED, NOT CONFIRMED. Confirm with Vito before quoting.
- **Open item:** a $18.50/sq ft rate was mentioned earlier; it does not match $1,200 for 725 sq ft (that would be ~$1,118). $1,200/mo is what is used.
- **Contact:** Vito L. Randazzo, Associate Broker, Centrale Realty, Inc. (248) 656-8830. vlrandaz@centralerealty.com.
- **There is NO built-in coffee bar. Never say or imply one.** (There is a built-in counter in Suite 100; staged photos show a coffee machine as virtual staging only.)

## Rules for all marketing
- Interior photos are virtually staged: always show "Virtually staged · furniture not included".
- The WEBSITE shows "Call for Pricing". Prices appear only in MLS brochures and private messages (SMS/email to a prospect). Public posts and reels show no price; say "DM TOUR for the current rate".
- Don't claim rooms, amenities, views, availability or performance that isn't verified.
- Single call to action: DM "TOUR" (or call/text (248) 656-8830).
- Instagram caption links aren't clickable: use link in bio. Facebook links are clickable.

## Links
- Suite 100: https://centralerealty.com/suite-100/
- Suite 101: https://centralerealty.com/suite-101/
- All available space: https://centralerealty.com/2490/
- Commercial page: https://centralerealty.com/commercial-space/

## What already exists (all in this repo, folder centrale-realty-website-rebuild-2026)
- **Brochures:** `brochures/suite-100-brochure.pdf`, `suite-101-brochure.pdf` (2 pp, no price); `suite-100-mls-brochure.pdf`, `suite-101-mls-brochure.pdf` (3 pp, with price and move-in costs, for MLS/Crexi use). Staged photo originals in `brochures/suite-100-staged/` and `suite-101-staged/`.
- **Reel generator:** `tools/make_reel.py` builds 1080x1920 30fps silent reels. Env options: `REEL=100|101|new` (Suite 100 only, Suite 101 only, new two-suite cut), `SLOW=1` (gentler pan, 1.3x holds), `DROP=name1,name2` (omit scenes by filename text), `REEL_VID=<clip>` (video clip for REEL=new). Run: `python3 tools/make_reel.py out.mp4 workdir`. Takes about 5 minutes; run it in the background. Needs opencv-python-headless, ffmpeg, headless Chromium.
- **Reels made so far (not in repo; regenerate with the script):** two-suite (24 s), Suite 101 only, Suite 100 only (slower pan versions), new two-suite cut with new walkthrough footage (24.6 s), a friends-only joke edit.
- **Walkthrough video:** Suite 101 real footage is on the site: `site/assets/video/suite-101-walkthrough-part1.mp4` and `-part2.mp4` (wide 1152x488, logo burned in, silent).
- **Instagram:** profile photo and bio drafted (`branding-kit/instagram/`). Instagram bio is about residential and commercial real estate, not only leasing.
- **Sign and ProGraphics email** for the property were made earlier (`reference/sign/`).

## Caption bank (use one per post; change one variable per test)
- A, facts first: "Office space for lease in Rochester Hills. Suite 100: 725 sq ft. Suite 101: 956 sq ft. Together: 1,681 sq ft. Lower-level suites, free parking, near I-75 and M-59. Furniture shown is virtual staging and is not included. DM "TOUR" for the current rate and availability."
- B, professional fit; C, location led ("less circling for parking, more time with clients"); D, short. Hashtags: #RochesterHills #OfficeSpaceForLease #OaklandCounty #MichiganCommercialRealEstate #SmallBusinessMichigan #CommercialRealEstate #CentraleRealty #NowLeasing
- Audience: nearby insurance, legal, accounting, consulting, real-estate, medical/wellness. Lead with privacy, meeting space, parking, location.

## Marketing playbook (from the Muse audit)
- First frame: "Rochester Hills office space, 725 or 956 sq ft". Dark plate behind fine text. Keep copy center-safe.
- Test one thing at a time: first frame, caption A/B, CTA, audience. Track 3-second hold, DMs/clicks, qualified leads, tours (not just views). Qualify leads on move date, team size, suite size, contact info, tour preference.
- Paid option: Meta Leads campaign (instant form or click-to-message), geofenced to a realistic commute area.

## Listing platforms
- **Crexi:** Suite 100 listing is live (725 SqFt, single tenant). Building highlights and marketing description text were drafted (building-level; no prices in the description; rate goes in Crexi's rate field).
- **MLS:** descriptions, space notes and photo captions drafted for Suite 100 and Suite 101 (rentable sq ft wording).

## Preferences
- Preview first; deploy website changes only when told "deploy" (and that belongs in the website chat).
- User is often on a phone: send files in chat; keep videos small (large uploads fail past about 30 MB).
- Never ask for or handle FTP passwords. Never force-push.
