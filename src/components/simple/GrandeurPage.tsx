import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';

/**
 * The Grandeur — Falcon Estates. Unlike the other pages in this app, this
 * one is a verbatim port of the real landrhomes.com/grandeur/ page's own
 * bespoke brochure-style markup and CSS (pasted in full by the user), not
 * a page built from this project's shared design tokens. It's rendered via
 * dangerouslySetInnerHTML rather than hand-converted to JSX/className
 * markup to avoid transcription errors across this much markup — the
 * content is first-party (the site owner's own copy), not third-party
 * input, so that's safe here.
 *
 * Photos: 11 of the 12 gallery slots now use real local /assets/home
 * files — cover/twilight exterior, Grand Foyer, family room (two angles),
 * dining room, kitchen (two angles), primary suite, and the Flex Room
 * and Butler's Pantry/Laundry Room (originally captioned Breakfast Nook
 * and Private Study — relabeled to honestly describe what those two
 * uploaded photos actually show). Only the second primary-suite/bath
 * angle and the Matterport QR code are still hotlinked from
 * landrhomes.com, pending matching uploads.
 */

const GRANDEUR_STYLE = `
  :root {
    --gr-gold: #B8976A;
    --gr-gold-light: #D4B896;
    --gr-gold-dark: #8A6D45;
    --gr-cream: #F7F3ED;
    --gr-warm-white: #FDFBF8;
    --gr-charcoal: #1C1C1C;
    --gr-slate: #3A3A3A;
    --gr-mid: #6B6259;
    --gr-rule: #D9CEBF;
  }

  .grandeur-page * { margin: 0; padding: 0; box-sizing: border-box; }

  .grandeur-page {
    background: var(--gr-warm-white);
    color: var(--gr-charcoal);
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
  }

  .grandeur-page .cover {
    width: 100%;
    min-height: 100vh;
    background: var(--gr-charcoal);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .grandeur-page .cover-photo {
    position: absolute; inset: 0;
    background-image: url('/assets/home/grandeur-exterior-twilight.jpg');
    background-size: cover;
    background-position: center 62%;
  }

  .grandeur-page .cover-photo::after {
    content: '';
    position: absolute; inset: 0;
    background:
      linear-gradient(to bottom, rgba(12,16,28,0.62) 0%, rgba(12,16,28,0.34) 45%, rgba(12,16,28,0.72) 100%);
  }

  .grandeur-page .cover-texture {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 40%, rgba(184,151,106,0.12) 0%, transparent 70%),
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 60px,
        rgba(184,151,106,0.025) 60px,
        rgba(184,151,106,0.025) 61px
      );
  }

  .grandeur-page .cover-border {
    position: absolute;
    inset: 24px;
    border: 1px solid rgba(184,151,106,0.35);
    pointer-events: none;
  }
  .grandeur-page .cover-border::before {
    content: '';
    position: absolute;
    inset: 8px;
    border: 1px solid rgba(184,151,106,0.15);
  }

  .grandeur-page .corner {
    position: absolute;
    width: 40px; height: 40px;
  }
  .grandeur-page .corner svg { width: 100%; height: 100%; }
  .grandeur-page .corner.tl { top: 32px; left: 32px; }
  .grandeur-page .corner.tr { top: 32px; right: 32px; transform: scaleX(-1); }
  .grandeur-page .corner.bl { bottom: 32px; left: 32px; transform: scaleY(-1); }
  .grandeur-page .corner.br { bottom: 32px; right: 32px; transform: scale(-1); }

  .grandeur-page .cover-content {
    position: relative;
    text-align: center;
    z-index: 2;
    padding: 60px 40px;
  }

  .grandeur-page .cover-eyebrow {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: var(--gr-gold);
    margin-bottom: 36px;
  }

  .grandeur-page .cover-rule {
    width: 60px;
    height: 1px;
    background: var(--gr-gold);
    margin: 0 auto 36px;
    opacity: 0.6;
  }

  .grandeur-page .cover-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(72px, 10vw, 120px);
    font-weight: 300;
    color: var(--gr-cream);
    line-height: 0.9;
    letter-spacing: -2px;
    margin-bottom: 8px;
  }

  .grandeur-page .cover-title em {
    font-style: italic;
    color: var(--gr-gold-light);
  }

  .grandeur-page .cover-subtitle {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 13px;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: rgba(247,243,237,0.5);
    margin-top: 28px;
    margin-bottom: 60px;
  }

  .grandeur-page .cover-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: center;
    margin-bottom: 60px;
  }
  .grandeur-page .cover-divider span { width: 40px; height: 1px; background: var(--gr-gold); opacity: 0.5; }
  .grandeur-page .cover-divider .diamond {
    width: 6px; height: 6px;
    background: var(--gr-gold);
    transform: rotate(45deg);
    opacity: 0.7;
  }

  .grandeur-page .cover-location {
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(247,243,237,0.4);
  }

  .grandeur-page .cover-badge {
    position: absolute;
    bottom: 48px;
    right: 60px;
    text-align: right;
  }
  .grandeur-page .cover-badge .brand {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 400;
    color: var(--gr-gold-light);
    letter-spacing: 1px;
  }
  .grandeur-page .cover-badge .tagline {
    font-size: 8px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(247,243,237,0.3);
    margin-top: 2px;
  }

  .grandeur-page .intro-wrap {
    background: var(--gr-cream);
  }

  .grandeur-page .intro-grid {
    display: grid;
    grid-template-columns: 1fr 2px 1fr;
    gap: 0 48px;
    align-items: start;
    max-width: 900px;
    margin: 0 auto;
    padding: 80px 48px;
  }

  .grandeur-page .intro-rule-v {
    background: var(--gr-rule);
    height: 100%;
    min-height: 200px;
    align-self: stretch;
  }

  .grandeur-page .section-label {
    font-size: 8px;
    font-weight: 600;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: var(--gr-gold);
    margin-bottom: 24px;
  }

  .grandeur-page .intro-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(38px, 5vw, 54px);
    font-weight: 300;
    line-height: 1.1;
    color: var(--gr-charcoal);
    margin-bottom: 0;
  }
  .grandeur-page .intro-headline em { font-style: italic; color: var(--gr-gold-dark); }

  .grandeur-page .intro-body {
    font-size: 12px;
    line-height: 2;
    color: var(--gr-mid);
    margin-bottom: 24px;
  }

  .grandeur-page .stats-band {
    background: var(--gr-charcoal);
    padding: 64px 0;
  }

  .grandeur-page .stats-inner {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 48px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0;
  }

  .grandeur-page .stat-item {
    text-align: center;
    padding: 0 24px;
    border-right: 1px solid rgba(184,151,106,0.2);
  }
  .grandeur-page .stat-item:last-child { border-right: none; }

  .grandeur-page .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 52px;
    font-weight: 300;
    color: var(--gr-gold-light);
    line-height: 1;
    margin-bottom: 8px;
  }
  .grandeur-page .stat-unit {
    font-size: 14px;
    color: var(--gr-gold);
    font-family: 'Cormorant Garamond', serif;
  }
  .grandeur-page .stat-label {
    font-size: 8px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(247,243,237,0.4);
    margin-top: 8px;
  }

  .grandeur-page .plans-section {
    background: var(--gr-warm-white);
  }

  .grandeur-page .plans-header {
    max-width: 900px;
    margin: 0 auto;
    padding: 72px 48px 40px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    border-bottom: 1px solid var(--gr-rule);
  }

  .grandeur-page .plans-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 44px;
    font-weight: 300;
    color: var(--gr-charcoal);
  }
  .grandeur-page .plans-title em { font-style: italic; color: var(--gr-gold-dark); }

  .grandeur-page .floor-cards {
    max-width: 900px;
    margin: 0 auto;
    padding: 48px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .grandeur-page .floor-card {
    border: 1px solid var(--gr-rule);
    padding: 36px;
    position: relative;
    background: white;
  }

  .grandeur-page .floor-card-level {
    font-size: 8px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gr-gold);
    margin-bottom: 16px;
  }

  .grandeur-page .floor-card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 400;
    color: var(--gr-charcoal);
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--gr-rule);
  }

  .grandeur-page .room-list {
    list-style: none;
  }
  .grandeur-page .room-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px dotted rgba(0,0,0,0.08);
    font-size: 10.5px;
    color: var(--gr-slate);
    letter-spacing: 0.5px;
  }
  .grandeur-page .room-list li:last-child { border-bottom: none; }
  .grandeur-page .room-list .room-name { text-transform: uppercase; letter-spacing: 1.5px; font-size: 9px; color: var(--gr-mid); }
  .grandeur-page .room-list .room-size { font-family: 'Cormorant Garamond', serif; font-size: 14px; color: var(--gr-charcoal); }

  .grandeur-page .floor-sqft {
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--gr-gold);
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .grandeur-page .floor-sqft .label { font-size: 8px; letter-spacing: 3px; text-transform: uppercase; color: var(--gr-mid); }
  .grandeur-page .floor-sqft .value { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: var(--gr-gold-dark); }
  .grandeur-page .floor-sqft .unit { font-size: 10px; color: var(--gr-mid); }

  .grandeur-page .floor-card.wide {
    grid-column: 1 / -1;
  }
  .grandeur-page .wide-inner { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 32px; }

  .grandeur-page .features-section {
    background: var(--gr-charcoal);
  }

  .grandeur-page .features-inner {
    max-width: 900px;
    margin: 0 auto;
    padding: 80px 48px;
  }

  .grandeur-page .features-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 64px;
    padding-bottom: 48px;
    border-bottom: 1px solid rgba(184,151,106,0.25);
  }

  .grandeur-page .features-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 52px;
    font-weight: 300;
    color: var(--gr-cream);
    line-height: 1.05;
  }
  .grandeur-page .features-headline em { font-style: italic; color: var(--gr-gold-light); }

  .grandeur-page .features-intro {
    max-width: 280px;
    font-size: 11px;
    line-height: 1.9;
    color: rgba(247,243,237,0.45);
    margin-top: 8px;
  }

  .grandeur-page .feature-cols {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
  }

  .grandeur-page .feature-cols + .feature-cols {
    margin-top: 48px;
    padding-top: 48px;
    border-top: 1px solid rgba(184,151,106,0.15);
  }

  .grandeur-page .feature-row-label {
    font-size: 8px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(247,243,237,0.35);
    margin-bottom: 24px;
  }

  .grandeur-page .feature-col-title {
    font-size: 8px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gr-gold);
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(184,151,106,0.25);
  }

  .grandeur-page .feature-list {
    list-style: none;
  }
  .grandeur-page .feature-list li {
    font-size: 11px;
    color: rgba(247,243,237,0.6);
    padding: 7px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding-left: 14px;
    position: relative;
    line-height: 1.5;
  }
  .grandeur-page .feature-list li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: var(--gr-gold);
    font-size: 9px;
  }

  .grandeur-page .arch-section {
    background: var(--gr-cream);
  }

  .grandeur-page .arch-inner {
    max-width: 900px;
    margin: 0 auto;
    padding: 80px 48px;
  }

  .grandeur-page .arch-grid {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 64px;
    align-items: start;
  }

  .grandeur-page .arch-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px;
    font-weight: 300;
    color: var(--gr-charcoal);
    margin-bottom: 32px;
    line-height: 1.05;
  }
  .grandeur-page .arch-title em { font-style: italic; color: var(--gr-gold-dark); }

  .grandeur-page .arch-body {
    font-size: 11.5px;
    line-height: 2;
    color: var(--gr-mid);
    margin-bottom: 20px;
  }

  .grandeur-page .highlight-box {
    background: var(--gr-charcoal);
    padding: 36px;
    margin-bottom: 24px;
  }
  .grandeur-page .highlight-box .hb-label {
    font-size: 8px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gr-gold);
    margin-bottom: 12px;
  }
  .grandeur-page .highlight-box .hb-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 17px;
    font-style: italic;
    color: var(--gr-cream);
    line-height: 1.7;
  }

  .grandeur-page .community-section {
    background: var(--gr-warm-white);
  }

  .grandeur-page .community-inner {
    max-width: 900px;
    margin: 0 auto;
    padding: 80px 48px;
  }

  .grandeur-page .community-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    margin-top: 48px;
  }

  .grandeur-page .community-item {
    border-top: 2px solid var(--gr-gold);
    padding-top: 28px;
  }
  .grandeur-page .community-item .ci-label {
    font-size: 8px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gr-gold);
    margin-bottom: 12px;
  }
  .grandeur-page .community-item .ci-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 400;
    color: var(--gr-charcoal);
    margin-bottom: 14px;
  }
  .grandeur-page .community-item .ci-body {
    font-size: 11px;
    line-height: 1.9;
    color: var(--gr-mid);
  }

  .grandeur-page .back-cover {
    background: var(--gr-charcoal);
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px 48px;
    position: relative;
    overflow: hidden;
  }

  .grandeur-page .back-cover::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 50% at 50% 50%, rgba(184,151,106,0.08) 0%, transparent 70%);
  }

  .grandeur-page .back-cover-content { position: relative; z-index: 1; }

  .grandeur-page .back-label {
    font-size: 9px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: var(--gr-gold);
    margin-bottom: 32px;
  }

  .grandeur-page .back-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 52px;
    font-weight: 300;
    color: var(--gr-cream);
    margin-bottom: 8px;
  }
  .grandeur-page .back-title em { font-style: italic; color: var(--gr-gold-light); }

  .grandeur-page .back-divider {
    width: 80px; height: 1px;
    background: var(--gr-gold);
    margin: 32px auto;
    opacity: 0.5;
  }

  .grandeur-page .contact-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    margin-top: 16px;
    text-align: left;
  }

  .grandeur-page .contact-item .c-label {
    font-size: 8px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gr-gold);
    margin-bottom: 8px;
  }
  .grandeur-page .contact-item .c-value {
    font-size: 12px;
    color: rgba(247,243,237,0.7);
    line-height: 1.7;
  }

  .grandeur-page .back-disclaimer {
    margin-top: 64px;
    font-size: 8px;
    color: rgba(247,243,237,0.2);
    line-height: 1.8;
    max-width: 600px;
    letter-spacing: 0.3px;
  }

  .grandeur-page .gallery-section { background: var(--gr-cream); }
  .grandeur-page .gallery-inner { max-width: 900px; margin: 0 auto; padding: 80px 48px; }
  .grandeur-page .gallery-head { margin-bottom: 48px; }
  .grandeur-page .gallery-title {
    font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 300;
    color: var(--gr-charcoal); line-height: 1.05;
  }
  .grandeur-page .gallery-title em { font-style: italic; color: var(--gr-gold-dark); }
  .grandeur-page .gallery-sub { font-size: 11px; line-height: 1.9; color: var(--gr-mid); max-width: 480px; margin-top: 18px; }

  .grandeur-page .gal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
  .grandeur-page .gal-item { position: relative; }
  .grandeur-page .gal-item.full { grid-column: 1 / -1; }
  .grandeur-page .gal-item img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    border: 1px solid var(--gr-rule);
  }
  .grandeur-page .gal-item.full img { max-height: 460px; }
  .grandeur-page .gal-cap {
    font-size: 8px; letter-spacing: 4px; text-transform: uppercase;
    color: var(--gr-gold-dark); margin-top: 12px;
  }

  .grandeur-page .tour-band { background: var(--gr-charcoal); padding: 64px 0; }
  .grandeur-page .tour-inner {
    max-width: 900px; margin: 0 auto; padding: 0 48px;
    display: grid; grid-template-columns: auto 1fr; gap: 48px; align-items: center;
  }
  .grandeur-page .tour-qr {
    background: var(--gr-warm-white); padding: 14px;
    border: 1px solid rgba(184,151,106,0.4);
  }
  .grandeur-page .tour-qr img { display: block; width: 148px; height: 148px; }
  .grandeur-page .tour-title {
    font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 300;
    color: var(--gr-cream); line-height: 1.1; margin-bottom: 16px;
  }
  .grandeur-page .tour-title em { font-style: italic; color: var(--gr-gold-light); }
  .grandeur-page .tour-body { font-size: 11px; line-height: 1.9; color: rgba(247,243,237,0.5); max-width: 420px; }
  .grandeur-page .tour-link {
    display: inline-block; margin-top: 20px; font-size: 9px; letter-spacing: 3px;
    text-transform: uppercase; color: var(--gr-gold-light); text-decoration: none;
    border-bottom: 1px solid rgba(184,151,106,0.5); padding-bottom: 5px;
  }
  .grandeur-page .tour-url { font-size: 8px; color: rgba(247,243,237,0.28); margin-top: 14px; letter-spacing: 0.4px; word-break: break-all; }

  @media (max-width: 680px) {
    .grandeur-page .cover-content { padding: 40px 24px; }
    .grandeur-page .intro-grid { grid-template-columns: 1fr; gap: 32px; padding: 56px 24px; }
    .grandeur-page .intro-rule-v { display: none; }
    .grandeur-page .stats-inner { grid-template-columns: repeat(2, 1fr); padding: 0 24px; row-gap: 32px; column-gap: 16px; }
    .grandeur-page .stat-item { border-right: none; padding: 0 8px; }
    .grandeur-page .plans-header { flex-direction: column; align-items: flex-start; gap: 16px; padding: 56px 24px 32px; }
    .grandeur-page .floor-cards { grid-template-columns: 1fr; padding: 24px; gap: 24px; }
    .grandeur-page .wide-inner { grid-template-columns: 1fr; gap: 24px; }
    .grandeur-page .features-inner { padding: 56px 24px; }
    .grandeur-page .features-top { flex-direction: column; gap: 24px; }
    .grandeur-page .features-headline { font-size: 36px; }
    .grandeur-page .feature-cols { grid-template-columns: 1fr; gap: 32px; }
    .grandeur-page .arch-inner { padding: 56px 24px; }
    .grandeur-page .arch-grid { grid-template-columns: 1fr; gap: 40px; }
    .grandeur-page .arch-title { font-size: 34px; }
    .grandeur-page .community-inner { padding: 56px 24px; }
    .grandeur-page .community-grid { grid-template-columns: 1fr; gap: 40px; }
    .grandeur-page .gallery-inner { padding: 56px 24px; }
    .grandeur-page .gal-grid { grid-template-columns: 1fr; gap: 20px; }
    .grandeur-page .gallery-title { font-size: 34px; }
    .grandeur-page .tour-inner { grid-template-columns: 1fr; gap: 24px; padding: 0 24px; text-align: center; justify-items: center; }
    .grandeur-page .tour-title { font-size: 30px; }
    .grandeur-page .tour-body { max-width: none; }
    .grandeur-page .back-cover { padding: 56px 24px; }
    .grandeur-page .back-title { font-size: 38px; }
    .grandeur-page .contact-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
  }
`;

const CDN = 'https://landrhomes.com/wp-content/uploads';
const TOUR_URL = 'https://my.matterport.com/show/?m=gSQLmSfS9kJ&';

const GRANDEUR_BODY = `
<div class="cover">
  <div class="cover-photo"></div>
  <div class="cover-texture"></div>
  <div class="cover-border"></div>
  <div class="corner tl"><svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 38 L2 2 L38 2" stroke="#B8976A" stroke-width="1" opacity="0.6"/><path d="M2 20 L8 20" stroke="#B8976A" stroke-width="0.7" opacity="0.4"/><path d="M20 2 L20 8" stroke="#B8976A" stroke-width="0.7" opacity="0.4"/><rect x="2" y="2" width="3" height="3" fill="#B8976A" opacity="0.5"/></svg></div>
  <div class="corner tr"><svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 38 L2 2 L38 2" stroke="#B8976A" stroke-width="1" opacity="0.6"/><path d="M2 20 L8 20" stroke="#B8976A" stroke-width="0.7" opacity="0.4"/><path d="M20 2 L20 8" stroke="#B8976A" stroke-width="0.7" opacity="0.4"/><rect x="2" y="2" width="3" height="3" fill="#B8976A" opacity="0.5"/></svg></div>
  <div class="corner bl"><svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 38 L2 2 L38 2" stroke="#B8976A" stroke-width="1" opacity="0.6"/><path d="M2 20 L8 20" stroke="#B8976A" stroke-width="0.7" opacity="0.4"/><path d="M20 2 L20 8" stroke="#B8976A" stroke-width="0.7" opacity="0.4"/><rect x="2" y="2" width="3" height="3" fill="#B8976A" opacity="0.5"/></svg></div>
  <div class="corner br"><svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 38 L2 2 L38 2" stroke="#B8976A" stroke-width="1" opacity="0.6"/><path d="M2 20 L8 20" stroke="#B8976A" stroke-width="0.7" opacity="0.4"/><path d="M20 2 L20 8" stroke="#B8976A" stroke-width="0.7" opacity="0.4"/><rect x="2" y="2" width="3" height="3" fill="#B8976A" opacity="0.5"/></svg></div>

  <div class="cover-content">
    <div class="cover-eyebrow">Falcon Estates &nbsp;&middot;&nbsp; Lot 42 &nbsp;&middot;&nbsp; Rochester Hills, Michigan</div>
    <div class="cover-rule"></div>
    <div class="cover-title">The<br><em>Grandeur</em></div>
    <div class="cover-subtitle">European Inspired Architecture</div>
    <div class="cover-divider"><span></span><div class="diamond"></div><span></span></div>
    <div class="cover-location">3836 Coachwood Lane &nbsp;&middot;&nbsp; Rochester Hills, MI 48309</div>
  </div>

  <div class="cover-badge">
    <div class="brand">L &amp; R Homes, Inc.</div>
    <div class="tagline">Custom Home Builder &nbsp;&middot;&nbsp; Est. Rochester Hills</div>
  </div>
</div>

<div class="intro-wrap">
  <div class="intro-grid">
    <div>
      <div class="section-label">Welcome to The Grandeur</div>
      <h2 class="intro-headline">Where <em>European</em><br>Elegance Meets<br>Michigan Living</h2>
    </div>
    <div class="intro-rule-v"></div>
    <div>
      <p class="intro-body">Nestled within the prestigious Falcon Estates subdivision and bordered by a serene 10-acre nature preserve, The Grandeur is a masterwork of upscale European-inspired architecture &mdash; crafted by L&amp;R Homes, Inc., Rochester Hills&rsquo; premier custom home builder.</p>
      <p class="intro-body">Spanning 4,170 square feet of finished living space across two beautifully appointed floors, plus a full basement and a generous three-car garage, every detail of this home has been designed for discerning buyers who expect nothing less than extraordinary.</p>
      <p class="intro-body">Located in the sought-after Rochester School District and served by Detroit City Water &amp; Sewer &mdash; The Grandeur represents the pinnacle of new construction in Oakland County.</p>
    </div>
  </div>
</div>

<div class="stats-band">
  <div class="stats-inner">
    <div class="stat-item"><div class="stat-num">4,170<span class="stat-unit"> sq ft</span></div><div class="stat-label">Total Habitable</div></div>
    <div class="stat-item"><div class="stat-num">4<span class="stat-unit"> bed</span></div><div class="stat-label">Bedrooms</div></div>
    <div class="stat-item"><div class="stat-num">4.5<span class="stat-unit"> bath</span></div><div class="stat-label">4 Full / 1 Half</div></div>
    <div class="stat-item"><div class="stat-num">3<span class="stat-unit"> car</span></div><div class="stat-label">Garage</div></div>
    <div class="stat-item"><div class="stat-num">2<span class="stat-unit"> story</span></div><div class="stat-label">Plus Full Basement</div></div>
  </div>
</div>

<div class="plans-section">
  <div class="plans-header">
    <div>
      <div class="section-label">Floor Plan</div>
      <h2 class="plans-title">Thoughtfully <em>Designed</em><br>for How You Live</h2>
    </div>
  </div>

  <div class="floor-cards">
    <div class="floor-card">
      <div class="floor-card-level">Level One</div>
      <div class="floor-card-name">First Floor</div>
      <ul class="room-list">
        <li><span class="room-name">Grand Foyer</span><span class="room-size">Entry</span></li>
        <li><span class="room-name">Family Room</span><span class="room-size">Open to Above</span></li>
        <li><span class="room-name">Dining Room</span><span class="room-size">Formal</span></li>
        <li><span class="room-name">Study</span><span class="room-size">Private Office</span></li>
        <li><span class="room-name">Kitchen</span><span class="room-size">Gourmet</span></li>
        <li><span class="room-name">Nook</span><span class="room-size">Breakfast</span></li>
        <li><span class="room-name">Flex Room</span><span class="room-size">Multi-Use</span></li>
        <li><span class="room-name">Powder Room</span><span class="room-size">Half Bath</span></li>
        <li><span class="room-name">Laundry</span><span class="room-size">Main Level</span></li>
        <li><span class="room-name">3-Car Garage</span><span class="room-size">782 sq ft</span></li>
      </ul>
      <div class="floor-sqft"><span class="label">First Floor</span><div><span class="value">2,143</span> <span class="unit">sq ft</span></div></div>
    </div>

    <div class="floor-card">
      <div class="floor-card-level">Level Two</div>
      <div class="floor-card-name">Second Floor</div>
      <ul class="room-list">
        <li><span class="room-name">Primary Suite</span><span class="room-size">Coffered Ceiling</span></li>
        <li><span class="room-name">Primary Bath</span><span class="room-size">Spa Retreat</span></li>
        <li><span class="room-name">Walk-in Closet</span><span class="room-size">Primary</span></li>
        <li><span class="room-name">Bedroom 2</span><span class="room-size">En-Suite</span></li>
        <li><span class="room-name">Bedroom 3</span><span class="room-size">En-Suite</span></li>
        <li><span class="room-name">Bedroom 4</span><span class="room-size">En-Suite</span></li>
        <li><span class="room-name">Loft</span><span class="room-size">Open Overlook</span></li>
        <li><span class="room-name">Laundry</span><span class="room-size">Second Level</span></li>
        <li><span class="room-name">Hall / Landing</span><span class="room-size">Gallery</span></li>
      </ul>
      <div class="floor-sqft"><span class="label">Second Floor</span><div><span class="value">2,027</span> <span class="unit">sq ft</span></div></div>
    </div>

    <div class="floor-card wide">
      <div class="floor-card-level">Lower Level</div>
      <div class="floor-card-name">Full Basement &mdash; Ready for Your Vision</div>
      <div class="wide-inner">
        <div><ul class="room-list">
          <li><span class="room-name">Total Footprint</span><span class="room-size">2,125 sq ft</span></li>
          <li><span class="room-name">Egress Windows</span><span class="room-size">Provided</span></li>
          <li><span class="room-name">Sump System</span><span class="room-size">City-Inspected</span></li>
        </ul></div>
        <div><ul class="room-list">
          <li><span class="room-name">Foundation</span><span class="room-size">8-10&Prime; Poured Concrete</span></li>
          <li><span class="room-name">Floor Base</span><span class="room-size">4&Prime; Concrete Slab</span></li>
          <li><span class="room-name">Vapor Barrier</span><span class="room-size">6 mil Poly</span></li>
        </ul></div>
        <div><ul class="room-list">
          <li><span class="room-name">Steel Beams</span><span class="room-size">W10&times;26</span></li>
          <li><span class="room-name">Drop Walls</span><span class="room-size">8&Prime;</span></li>
          <li><span class="room-name">Finish Potential</span><span class="room-size">Full</span></li>
        </ul></div>
      </div>
      <div class="floor-sqft" style="margin-top:24px;"><span class="label">Lower Level</span><div><span class="value">2,125</span> <span class="unit">sq ft</span></div></div>
    </div>
  </div>
</div>

<div class="features-section">
  <div class="features-inner">
    <div class="features-top">
      <div>
        <div class="section-label">Standard &amp; Premium Features</div>
        <h2 class="features-headline">Built to the<br><em>Highest</em> Standard</h2>
      </div>
      <p class="features-intro">Every selection throughout The Grandeur was made with timeless quality in mind &mdash; from Lafata custom cabinetry to KitchenAid Gourmet appliances, Andersen 400 windows, and premium millwork throughout. What follows is the complete collection of finishes that define the L&amp;R Homes standard of craftsmanship.</p>
    </div>

    <div class="feature-row-label">Kitchen &amp; Bath</div>
    <div class="feature-cols">
      <div>
        <div class="feature-col-title">Kitchen</div>
        <ul class="feature-list">
          <li>Lafata Maple cabinets, soft-close, with premium cabinet hardware</li>
          <li>Quartz countertops throughout with full quartz backsplash</li>
          <li>Kitchen island with mitred-edge countertop</li>
          <li>Generous pantry</li>
          <li>Garbage disposal</li>
          <li>Premium farmhouse sink with professional-grade pull-out faucet</li>
          <li>Pot filler at cooktop</li>
          <li>KitchenAid Gourmet Kitchen package</li>
          <li>48&Prime; gourmet gas cooktop with griddle &amp; exhaust range hood</li>
          <li>Custom cabinet-panel Bosch dishwasher &amp; double oven</li>
        </ul>
      </div>
      <div>
        <div class="feature-col-title">Bathrooms</div>
        <ul class="feature-list">
          <li>Lafata Maple vanities, soft-close, with mirrors</li>
          <li>Porcelain/ceramic tile floors, showers &amp; tubs</li>
          <li>Jack-and-Jill setup</li>
          <li>Upstairs guest bath with shower door</li>
          <li>Primary bath with elegant soaking tub &amp; separate shower &mdash; clear frameless glass shower door</li>
        </ul>
      </div>
      <div>
        <div class="feature-col-title">Interior Features</div>
        <ul class="feature-list">
          <li>Premium porcelain tile &amp; solid oak wood flooring throughout first floor</li>
          <li>Premium stair carpeting upstairs &amp; in basement</li>
          <li>Two-story foyer &amp; family room with bridge overlook</li>
          <li>9&prime; ceilings on first floor</li>
          <li>Solid-core Masonite doors &mdash; 8&prime; height first floor, 6&prime;-8&Prime; second floor</li>
          <li>Premium trim package &mdash; upgraded painted solid wood casings, base moldings &amp; crown molding throughout</li>
          <li>Premium staircase &mdash; upgraded newel posts, oak handrails, oak stair treads &amp; solid wrought-iron spindles</li>
          <li>Premium door hardware on doors and cabinets</li>
          <li>Gas fireplace with finished mantle &amp; custom stone hearth</li>
          <li>Coffered ceilings in the primary suite</li>
          <li>Dual laundry rooms built into cabinetry with pull-out faucets</li>
          <li>Separate service entrance off the garage</li>
        </ul>
      </div>
    </div>

    <div class="feature-row-label">Exterior, Systems &amp; Community</div>
    <div class="feature-cols">
      <div>
        <div class="feature-col-title">Exterior &amp; Basement</div>
        <ul class="feature-list">
          <li>Premium brick and limestone elevation</li>
          <li>Premium Hardie-plank siding</li>
          <li>Maintenance-free premium Andersen 400 windows</li>
          <li>Custom stone address</li>
          <li>Dimensional shingles</li>
          <li>3-car side-entrance garage</li>
          <li>Insulated 8&prime; raised-panel roll-up garage doors with belt-drive ultra-quiet openers</li>
          <li>Upgraded 6&Prime; aluminum gutters and downspouts</li>
          <li>Concrete driveway with exposed-aggregate front walkway &amp; rotunda entry area</li>
          <li>8&prime; double front door &mdash; fiberglass with 3/4&Prime; depth frosted glass for privacy</li>
          <li>2&times;6 exterior wall construction</li>
          <li>Fully excavated 8&prime;-10&Prime; height basement with premium wall waterproofing</li>
          <li>Basement egress window &amp; full drape wall insulation</li>
          <li>Raised ledgerstone paver back patio</li>
          <li>Professional landscaping throughout</li>
          <li>Sod and sprinkler system with timer</li>
        </ul>
      </div>
      <div>
        <div class="feature-col-title">Systems &amp; Efficiency</div>
        <ul class="feature-list">
          <li>Energy Seal package</li>
          <li>Dual 95%+ high-efficiency furnaces with ECM motor</li>
          <li>50-gallon high-efficiency hot water heater</li>
          <li>PEX&reg; plumbing system</li>
          <li>Dual air conditioning</li>
          <li>Dual humidifiers &amp; media-size air cleaning filters</li>
          <li>200-amp electrical service with circuit breakers</li>
          <li>Nest thermostats</li>
          <li>Alarm system pre-wire (monitoring not included)</li>
          <li>Automatic sump pump in basement</li>
          <li>Smoke &amp; carbon monoxide detectors</li>
          <li>Prepped for phone and cable; gas hookup to dryer</li>
        </ul>
      </div>
      <div>
        <div class="feature-col-title">Development Amenities</div>
        <ul class="feature-list">
          <li>Easy access to I-75</li>
          <li>Minutes to the Village of Rochester Hills &amp; Downtown Rochester shopping</li>
          <li>Highly acclaimed Rochester school system</li>
          <li>Minutes to Oakland University &amp; Meadow Brook Theatre</li>
          <li>Preserved natural areas</li>
          <li>City water and sewer</li>
          <li>Underground utilities</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="tour-band">
  <div class="tour-inner">
    <div class="tour-qr"><a href="${TOUR_URL}"><img src="${CDN}/grandeur-02.png" alt="Matterport virtual tour QR code"></a></div>
    <div>
      <div class="section-label">Matterport 3D Experience</div>
      <h2 class="tour-title">Walk Through <em>The Grandeur</em><br>From Anywhere</h2>
      <p class="tour-body">Scan the code or follow the link to step inside a full immersive 3D walkthrough &mdash; move room to room, look up at the coffered ceilings, and explore every level at your own pace.</p>
      <a class="tour-link" href="${TOUR_URL}">Launch the Virtual Tour &rarr;</a>
      <div class="tour-url">${TOUR_URL}</div>
    </div>
  </div>
</div>

<div class="gallery-section">
  <div class="gallery-inner">
    <div class="gallery-head">
      <div class="section-label">The Interiors</div>
      <h2 class="gallery-title">Light, Space &amp;<br><em>Considered</em> Detail</h2>
      <p class="gallery-sub">Every room in The Grandeur was composed around natural light and the flow between spaces &mdash; from the two-story family room to the gourmet kitchen and the spa-inspired primary bath.</p>
    </div>

    <div class="gal-grid">
      <div class="gal-item full"><img src="/assets/home/foyer-staged.jpg" alt="Grand Foyer · Oak Staircase &amp; Wrought Iron"><div class="gal-cap">Grand Foyer &middot; Oak Staircase &amp; Wrought Iron</div></div>
      <div class="gal-item full"><img src="/assets/home/grandeur-family-room.jpg" alt="Two-Story Family Room"><div class="gal-cap">Two-Story Family Room &middot; Floor-to-Ceiling Windows</div></div>
      <div class="gal-item"><img src="/assets/home/grandeur-kitchen-family-room.jpg" alt="Family Room · Stone Fireplace"><div class="gal-cap">Family Room &middot; Stone Fireplace</div></div>
      <div class="gal-item"><img src="/assets/home/grandeur-dining-room.jpg" alt="Formal Dining Room"><div class="gal-cap">Formal Dining Room</div></div>
      <div class="gal-item"><img src="/assets/home/grandeur-kitchen.jpg" alt="Gourmet Kitchen"><div class="gal-cap">Gourmet Kitchen &middot; Quartz &amp; Custom Cabinetry</div></div>
      <div class="gal-item"><img src="/assets/home/grandeur-kitchen-prep.png" alt="Prep Kitchen · Farmhouse Sink"><div class="gal-cap">Prep Kitchen &middot; Farmhouse Sink</div></div>
      <div class="gal-item"><img src="/assets/home/grandeur-butlers-pantry.png" alt="Butler's Pantry"><div class="gal-cap">Butler&rsquo;s Pantry</div></div>
      <div class="gal-item"><img src="/assets/home/grandeur-laundry-room.jpg" alt="Laundry Room"><div class="gal-cap">Laundry Room</div></div>
      <div class="gal-item"><img src="/assets/home/flex-room-staged.jpg" alt="Flex Room"><div class="gal-cap">Flex Room &middot; Built-In Desk &amp; Cabinetry</div></div>
      <div class="gal-item full"><img src="/assets/home/grandeur-primary-suite.jpg" alt="Primary Suite · Coffered Ceiling"><div class="gal-cap">Primary Suite &middot; Coffered Ceiling</div></div>
      <div class="gal-item full"><img src="${CDN}/grandeur-13.jpg" alt="Primary Suite · Adjoining Spa Bath"><div class="gal-cap">Primary Suite &middot; Adjoining Spa Bath</div></div>
      <div class="gal-item full"><img src="${CDN}/grandeur-14.jpg" alt="Primary Bath"><div class="gal-cap">Primary Bath &middot; Soaking Tub &amp; Frameless Glass Shower</div></div>
    </div>
  </div>
</div>

<div class="arch-section">
  <div class="arch-inner">
    <div class="arch-grid">
      <div>
        <div class="section-label">Architecture &amp; Design</div>
        <h2 class="arch-title">European <em>Inspired</em><br>American Crafted</h2>
        <p class="arch-body">The Grandeur&rsquo;s fa&ccedil;ade is a sophisticated composition of tumbled brick, natural limestone, and architectural trim &mdash; evoking the timeless elegance of European manor homes while embracing the warmth and functionality demanded by modern Michigan families.</p>
        <p class="arch-body">The two-story Family Room soars with an open-to-above volume, bathing the main level in natural light. The Foyer announces arrival with gallery-height ceilings, while the Primary Suite retreat on the second floor offers a coffered ceiling sanctuary with an adjoining sitting room &mdash; a quiet escape at the end of the day.</p>
        <p class="arch-body">From the sunlit family room and gourmet kitchen to the coffered primary suite and its adjoining sitting room, The Grandeur is a complete expression of refined living &mdash; where enduring European architecture meets the craftsmanship, comfort, and convenience today&rsquo;s homeowners expect. Set within Falcon Estates&rsquo; natural beauty and built by L&amp;R Homes, it is more than a house &mdash; it is a residence designed to be lived in, gathered in, and called home for generations to come.</p>
      </div>
      <div class="arch-sidebar">
        <div class="highlight-box">
          <div class="hb-label">Design Philosophy</div>
          <div class="hb-text">&ldquo;A home that commands the street, yet welcomes you completely &mdash; the European character of its stone and brick fa&ccedil;ade giving way to an interior of open, light-filled spaces built for real life.&rdquo;</div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="community-section">
  <div class="community-inner">
    <div class="section-label">The Community</div>
    <h2 style="font-family:'Cormorant Garamond',serif; font-size:48px; font-weight:300; line-height:1.1; color:var(--gr-charcoal);">Falcon Estates &mdash; <em style="font-style:italic; color:var(--gr-gold-dark);">A Community</em><br>Worth Coming Home To</h2>

    <div class="community-grid">
      <div class="community-item">
        <div class="ci-label">Schools</div>
        <div class="ci-title">Rochester School District</div>
        <div class="ci-body">One of Michigan&rsquo;s most celebrated public school systems, the Rochester Community School District consistently ranks among the state&rsquo;s finest &mdash; offering world-class academics and enrichment programs from elementary through high school.</div>
      </div>
      <div class="community-item">
        <div class="ci-label">Natural Setting</div>
        <div class="ci-title">10-Acre Nature Preserve</div>
        <div class="ci-body">Falcon Estates is nestled alongside a protected 10-acre nature preserve &mdash; providing residents with rare green space, privacy buffers, and the quiet beauty of mature Michigan landscape right outside their front door.</div>
      </div>
      <div class="community-item">
        <div class="ci-label">Infrastructure</div>
        <div class="ci-title">City Utilities</div>
        <div class="ci-body">Served by Detroit City Water and City Sewer &mdash; among the most reliable municipal utility systems in Southeast Michigan. No well, no septic. Full city-grade infrastructure from day one.</div>
      </div>
      <div class="community-item">
        <div class="ci-label">Location</div>
        <div class="ci-title">Rochester Hills, MI 48309</div>
        <div class="ci-body">Consistently ranked among Metro Detroit&rsquo;s most desirable municipalities, Rochester Hills offers the perfect balance of upscale suburban living with convenient access to M-59, I-75, dining, retail, and the vibrant downtown Rochester scene.</div>
      </div>
    </div>
  </div>
</div>

<div class="back-cover">
  <div class="back-cover-content">
    <div class="back-label">Ready to Make It Yours</div>
    <div class="back-title">The <em>Grandeur</em></div>
    <div style="font-family:'Tenor Sans',sans-serif; font-size:11px; letter-spacing:4px; text-transform:uppercase; color:rgba(247,243,237,0.4); margin-top:8px;">3836 Coachwood Lane &nbsp;&middot;&nbsp; Lot 42 &nbsp;&middot;&nbsp; Falcon Estates</div>
    <div class="back-divider"></div>

    <div class="contact-grid">
      <div class="contact-item"><div class="c-label">Builder</div><div class="c-value">L &amp; R Homes, Inc.<br>Custom Home Builder</div></div>
      <div class="contact-item"><div class="c-label">Address</div><div class="c-value">2490 Walton Blvd, Ste 103<br>Rochester Hills, MI 48309</div></div>
      <div class="contact-item"><div class="c-label">Contact</div><div class="c-value">(248) 656-8830<br>info@landrhomes.com</div></div>
      <div class="contact-item"><div class="c-label">Virtual Tour</div><div class="c-value"><a href="${TOUR_URL}" style="color:var(--gr-gold-light); text-decoration:none;">Matterport 3D Walkthrough &rarr;</a></div></div>
    </div>

    <div class="back-disclaimer">All floor plans, square footages, and specifications are based on approved building plans and are subject to change. Renderings and descriptions are for marketing purposes only. Estimated timeframes are not guaranteed and are subject to change; they should not be considered reliable commitments. Final pricing requires Director of Operations approval. This brochure does not constitute a contract or binding offer. L&amp;R Homes, Inc. is an equal opportunity builder and complies with all applicable Fair Housing laws.</div>
  </div>
</div>
`;

export function GrandeurPage() {
  return (
    <div className="grandeur-page">
      <style>{GRANDEUR_STYLE}</style>
      <div style={{ position: 'relative' }}>
        <SimpleNav />
        <div dangerouslySetInnerHTML={{ __html: GRANDEUR_BODY }} />
      </div>
      <SimpleFooter />
    </div>
  );
}
