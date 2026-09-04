# L&R Homes — Quarry to Threshold

A scroll-driven, cinematic 3D homepage experience for L&R Homes, Inc., built
per the "Quarry to Threshold" experience architecture (React Three Fiber +
GSAP ScrollTrigger, seven acts: Quarry → Cut → Frame → Threshold →
Household → Land → Invitation).

## Run it

```
npm install
npm run dev      # dev server
npm run build    # production build
npm run preview  # serve the production build
```

## Architecture

- `src/scenes/` — one file per act, plus the shared camera/light rig
  (`CameraRig.tsx`, `cameraKeyframes.ts`) that drives the whole scene from
  a single damped scroll-progress value.
- `src/materials/` — the procedural stone slab (`stoneSlab.ts`, built on a
  self-contained simplex-noise implementation in `src/lib/noise.ts`) and
  the luminance-wipe crossfade shader used for Act V's photography.
- `src/components/CinematicExperience.tsx` — wires GSAP ScrollTrigger to a
  pinned canvas and the real, semantic DOM overlay text for each act
  (`components/ui/actContent.tsx`).
- `src/components/TwoDExperience.tsx` — the `prefers-reduced-motion` /
  mobile path: a fully considered conventional layout sharing the same
  tokens, type, palette, and photography, not a stripped-down 3D scene.
- `src/state/experience.ts` — the scroll-progress store. Note: high-frequency
  fields (`rawProgress`, `smoothProgress`) are read imperatively inside
  `useFrame` and never trigger React re-renders; only `navResolved` and
  `preloadDone` are wired through `useSyncExternalStore`.
- `src/styles/tokens.css` — design tokens carried over verbatim from the
  L&R Homes design-system handoff.

## Known gaps / simplifications

This was built from the architecture doc alone, with no real 3D assets
handed off. Flagging what's approximated rather than letting it pass as
finished:

- **Act I stone material** is fully procedural (noise-driven displacement +
  baked canvas textures) — no real limestone PBR scans were provided.
- **Text reveals** use opacity/GSAP rather than a true shader-based
  light-mask synced to the key light, per Part 4's ideal.
- **Act V image transitions** use a luminance-biased diagonal wipe shader —
  a reasonable approximation of "light passing across the frame," not a
  bespoke effect.
- **Act VI's Falcon Estates branch** does not have its own dedicated
  cinematic Quarry-to-Threshold pass (Part 2 recommends this only "given
  asset availability," which doesn't exist here); it currently links out
  like the other two branches.
- `/gallery`, `/homes-available`, and `/communities/*` are referenced as
  real destination links (per the brief's intent that this is one page of
  a larger site) but are not built in this repo.
- Google Fonts (Cormorant Garamond, Lato, JetBrains Mono) are loaded via
  `@import`/`<link>` from `fonts.googleapis.com` — requires outbound
  network access at runtime.
