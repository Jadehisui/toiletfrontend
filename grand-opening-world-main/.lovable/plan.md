# TOILET DUST V 2.0 — GTA-Style Coin Site

A single-page memecoin site that opens like GTA V: a fake "loading" screen, the iconic mosaic tiles fading in one-by-one, then a slam-cut reveal into a parallax Los Santos hero with a 3D rotating coin. Everything else lives below as a HUD-styled scroll experience.

## The Opening Sequence (the showpiece)

```text
[0.0s] Black screen. White "TOILET DUST V" wordmark types out
[0.8s] Tiny "LOADING..." + flickering progress bar (fake, ~1.6s)
[2.4s] Cut to black → 6 mosaic tiles fade in staggered (palms,
       helicopter, Los Santos sign, beach, lifeguard tower, car)
[3.6s] Mascot slides in from left (king-toilet character)
[4.0s] "TOILET DUST" slams in from above with shake + flash
[4.4s] Big green "V 2.0" badge drops with bounce
[4.8s] HUD bar fades in (mini-map, $ counter, weapon wheel teaser)
       → user can now scroll
```

Skippable via click/tap/scroll. Plays once per session (sessionStorage).

## Hero Scene (after intro)

- **Parallax Los Santos backdrop**: 5 depth layers (sunset sky → distant skyline → palm silhouettes → street → foreground graffiti) that pan on mouse-move and scroll.
- **3D rotating coin** (Three.js + react-three-fiber): the toilet-dust coin spins slowly center-right, tilts toward cursor, with bloom + rim light. Lightweight — single mesh, baked texture from the mascot art.
- **Floating mascot** (2D cutout from your art) parallaxes in front of the coin.
- **HUD overlay**: top-left mini "wanted stars" that fill as you scroll, top-right $TDUST balance counter that ticks up, bottom weapon-wheel-style social icons.

## HUD Sections (scroll down, single page)

Each section is framed like a GTA mission card with the green/black palette, stencil/Pricedown-style headings, and tilted polaroid tiles.

1. **MISSION BRIEFING** — About / story of the coin, mascot bio card.
2. **TOKENOMICS** — Stat blocks styled like GTA stat screens (Supply, Tax, LP burned, CA with copy button).
3. **HOW TO BUY** — 4 steps as numbered mission objectives with checkmarks animating in on scroll.
4. **ROADMAP** — Map-pin markers on a stylized Los Santos minimap; click pins to expand phase details.
5. **THE CREW** — Socials (X, Telegram, DexScreener, Chart) as weapon-wheel radial buttons.
6. **Footer** — "© Rockstar parody. Not financial advice." + ticker marquee.

All copy/links use placeholders you'll swap (CA: `0x000...`, X: `#`, TG: `#`, Dex: `#`).

## Animation & Feel

- Pricedown-style display font for headings (free Google equivalent: **Bungee** + **Russo One**), Inter for body.
- Palette: deep night-blue `#0a0e14`, GTA green `#9bc54a`, hot sunset orange `#ff6a3d`, off-white `#f5f1e8`.
- Framer Motion for tile reveals, slam-ins, scroll-tied parallax, and HUD ticks.
- Subtle film grain + chromatic aberration overlay (CSS) for that grimy GTA print-ad look.
- Optional toggleable ambient audio (police siren + distant city loop), muted by default.

## Responsive

- Desktop: full parallax + 3D coin + mouse-tilt.
- Tablet: parallax preserved, 3D coin simplified (lower poly, no bloom).
- Mobile: 3D coin swapped for a CSS-3D rotating coin (cheap), parallax tied to scroll only (no gyro), HUD collapses, weapon wheel becomes a row.
- Intro shortens to ~3s on mobile, tiles render in a 2×3 grid instead of mosaic.
- Respects `prefers-reduced-motion` → skips intro, disables parallax, static coin.

## Technical Notes

- Stack: TanStack Start + Tailwind (already set up), `@react-three/fiber` + `@react-three/drei` for the 3D coin, `framer-motion` for choreography.
- New route: replace `src/routes/index.tsx` placeholder with the full single-page experience.
- Components: `IntroSequence`, `HeroScene`, `Coin3D`, `HUD`, `MissionSection`, `TokenomicsGrid`, `RoadmapMap`, `WeaponWheelSocials`, `GrainOverlay`.
- Assets: I'll extract the mascot, coin face, and tile artwork from your uploaded video frame and place them in `src/assets/`. Coin texture baked from the toilet illustration.
- Performance budget: hero JS < 200KB gz, 3D coin lazy-loaded after intro completes, images served as WebP.

## What you'll plug in later

- Contract address
- X / Telegram / DexScreener / chart URLs
- Any custom mascot art if you want to swap the video-extracted version

After approval I'll build the intro + hero first so you can see the showpiece, then layer in the HUD sections.
