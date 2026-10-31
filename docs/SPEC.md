# Chroma — Specification (v0.1)

Chroma is a MediaWiki skin that applies Material Design 3 (MD3) tokens and a
subset of M3 Expressive behaviour to MediaWiki's chrome and content. This
document is the source of truth for scope, design decisions and acceptance
criteria for the v0.1 line.

## 1. Goals

1. A production-usable MediaWiki skin for small and medium wikis, installable
   with `wfLoadSkin( 'Chroma' )`.
2. Faithful MD3 token system: color roles, typescale, shape, elevation, motion,
   state layers.
3. A pragmatic M3 Expressive subset: emphasized typescale, expanded shape scale,
   spring-like motion, expressive components where web support exists.
4. Tier 1 extension compatibility (see `COMPATIBILITY.md`): no functional
   breakage, consistent visual language.
5. Dynamic color: admin default seed, per-user seed and light/dark preference.
6. Accessibility: WCAG 2.2 AA, keyboard operability, reduced motion.
7. Three supported MediaWiki lines: 1.43 LTS, 1.45, 1.46 — as separate branches
   and release lines, not one "works everywhere" skin.

## 2. Non-goals (v0.1)

- Semantic MediaWiki / Cargo / PageForms deep visual integration (Tier 2).
- Replacing MobileFrontend; v0.1 runs alongside it (B2). Full takeover is v0.2.
- Re-theming every OOUI widget pixel-for-pixel; behaviour is preserved, surface
  is themed.
- Fandom / Wikia lookalike features.

## 3. Design principles

- **Reading first.** Article surface is calm; chrome recedes; reading mode is a
  first-class control.
- **Token-driven.** No hard-coded colours in components; everything resolves to
  `--md-sys-*` variables.
- **Progressive enhancement.** Core reading, navigation and search work without
  JavaScript; JS adds drawer, theme/layout switching and motion.
- **No external requests.** Fonts, icons and scripts are served from the skin.

## 4. Token system

Generated from the seed color `#006A6A` by `tools/generate-tokens.mjs`
(`@material/material-color-utilities`), committed as
`resources/styles/tokens.css` (light, dark, auto) and `docs/tokens.json`.

- Color: 26+ MD3 roles incl. `surface-container-*`, `inverse-*`, `outline-variant`.
- Typescale: display / headline / title / body / label; Emphasized variants.
- Shape: none, extra-small 4, small 8, medium 12, large 16, extra-large 28,
  extra-extra-large 40, full.
- Elevation: levels 0–5.
- Motion: durations short/medium/long 1–4; standard/emphasized easings; a spring
  approximation via CSS `linear()`.
- State layers: hover .08, focus .12, pressed .12, dragged .16.

The token file also exposes a font stack: Roboto Flex subset for Latin, system
CJK stack, monospace stack.

## 5. Layouts and navigation

Two shells, switchable in preferences and at runtime (`data-chroma-layout`):

- **App** (default): fixed top app bar, navigation drawer (persistent ≥ 1024px,
  modal below), content column + TOC card, edit FAB.
- **Reading**: Vector-2022-like left sidebar, top search, right TOC; closer to a
  classic wiki.

Reading mode (`data-chroma-reading="on"`) hides drawer/TOC/actions and centres
the article at ~72ch. Default off (user preference + admin default).

## 6. Component inventory (v0.1)

Top app bar, navigation drawer/rail, search bar + suggestions, TOC, tabs,
icon buttons, menus, buttons (filled/tonal/outlined/text), FAB, chips, cards,
dialogs, snackbar, progress, switches, text fields, footer, page tools.

Material Web is used where its component fits the wiki DOM; otherwise components
are implemented in plain CSS/JS to avoid adapting MediaWiki's server-rendered
markup to web-component shadow DOM.

## 7. Page inventory

- Article view (prose, tables, citations, images, infobox, TOC, categories)
- Edit (wikitext + VisualEditor + WikiEditor/CodeEditor toolbars)
- History and diff
- Special pages: Search, Preferences, RecentChanges, Watchlist, Upload, Login,
  AllPages, WhatLinksHere, Random, Version
- Talk pages (incl. DiscussionTools reply UI)
- Print stylesheet
- Error/permission pages

## 8. Extension compatibility

Tier 1: MediaWiki 1.43 bundled extensions + lightweight popular community
extensions (list in `COMPATIBILITY.md`). Definition:

- **A — functional:** no PHP/JS errors, controls present and operable, no
  horizontal overflow, keyboard reachable.
- **B — visual:** extension UI uses MD3 tokens, no default Vector/OOUI chrome
  leaking through.
- **C — pixel parity:** not promised for third-party extension UI.

## 9. Configuration and preferences

See `THEMING.md`. Admin: default seed, default scheme, default layout, reading
mode default, toggles to allow user overrides. User: Preferences → Appearance
("Rendering" section) and an in-page quick toggle.

## 10. Accessibility

WCAG 2.2 AA contrast, visible focus, labels/ARIA on drawer/menus/tabs,
`prefers-reduced-motion` disables spring/shape transitions, skip link.

## 11. Performance budget

- CSS ≤ 150 KB gzip (excluding fonts)
- JS ≤ 80 KB gzip
- Fonts ≤ 120 KB (Latin subset, woff2)
- No external network requests at runtime

## 12. Browser support

MediaWiki Grade A browsers (latest two versions of Chrome, Edge, Firefox,
Safari). No IE. Graceful degradation below Grade A.

## 13. Versioning and branches

- `REL1_43` (1.43.x, PHP 8.1+), `REL1_45` (1.45.x, PHP 8.2+),
  `REL1_46` (1.46.x, PHP 8.3+), `main` (development).
- Tags: `v0.1.0-REL1_43` etc.; releases contain installable ZIPs.
- Version-specific differences: `COMPAT-MATRIX.md`.

## 14. Acceptance criteria (v0.1)

1. Installs and renders on all three MW lines with no PHP notices.
2. Tier 1 extensions pass A; top 10 pass A+B with screenshots.
3. Dark/light/auto, layout switch, reading mode, dynamic seed work.
4. Keyboard-only navigation and axe-core scan pass on core pages.
5. Budgets met; CI matrix green; Pages demo live.
6. Bilingual README, THEMING and COMPATIBILITY docs complete.

## 15. Repository layout

```
.github/        CI, release, pages, issue templates
docs/           SPEC, THEMING, COMPATIBILITY, COMPAT-MATRIX, tokens.json
i18n/           en, qqq, zh-hans, zh-hant
includes/       PHP classes (hooks, preferences, config)
templates/      Mustache templates
resources/      tokens, base/components/page styles, scripts, icons, fonts
demo/           static GitHub Pages prototype
dev/            local MediaWiki harness scripts
tests/          PHPUnit + Playwright
tools/          token generator
```
