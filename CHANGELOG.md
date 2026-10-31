# Changelog

## v0.3.0 (2026-10-31)

- M3 Expressive motion: spring FAB press/shape morph, dialog spring entrance,
  button press feedback, card elevation transitions, reading-mode width transition.
- Snackbar component (`window.chromaSnackbar`).
- GitHub Actions demo accessibility job (axe-core WCAG 2.2 AA) + screenshot artifact.
- mediawiki.org Skin page draft, translatewiki preparation and release checklist docs.
- 1.43 / 1.45 / 1.46 branches smoke-tested after sync.

## v0.2.0 (2026-10-31)

- MobileFrontend B2 coexistence verified (desktop Chroma, mobile MinervaNeue,
  forced `?useskin=chroma` responsive).
- Mobile app bar: search collapses to an icon, brand truncation, user menu hidden.
- OOUI theming fallback (preferences tabs/inputs/buttons/dialogs), skinStyles wiring fixed.
- 1.43 / 1.45 / 1.46 runtime smoke tests passed (PHP 8.3 + SQLite).
- Branches `REL1_43`, `REL1_45`, `REL1_46`; release ZIPs per branch.

## v0.1.2 (2026-10-31)

- REL1_43: render legacy namespace/associated-pages tab row.

## v0.1.1 (2026-10-31)

- Separate release branches for MediaWiki 1.43 LTS, 1.45 and 1.46.
- Runtime smoke tests on all three MediaWiki versions.
- Menu rendering fixes per branch (legacy vs new menu keys).

## v0.1.0 (2026-10-31)

- Initial skin skeleton: MD3 tokens, Mustache templates, i18n, theme presets,
  preferences (theme/layout/reading/seed), Tier 1 extension harness,
  CI, GitHub Pages demo.
