# Chroma — Specification (v0.5.1)

Chroma is a MediaWiki skin that applies a Material Design 3 token system and a
small M3 Expressive visual subset to MediaWiki's chrome and content. This
document reflects the shipped v0.5.1 line.

## 1. Goals

1. A production-usable skin for small and medium wikis, installable with
   `wfLoadSkin( 'Chroma' )`.
2. An MD3 token system: color roles, typescale, shape, elevation, motion and
   state layers.
3. A pragmatic M3 Expressive subset: larger shape scale, spring-like motion,
   expressive top-app-bar menus and editorial rhythm.
4. Tier 1 extension compatibility, with the tested matrix documented in
   `COMPATIBILITY.md`.
5. Dynamic color: a default seed (`#006A6A`) plus four presets, light/dark/auto
   scheme, per-user preferences.
6. A reading-first layout with an app-like default shell and a reading layout.
7. Three supported MediaWiki lines: 1.43 LTS, 1.45 and 1.46 as separate
   branches and release lines.

## 2. Non-goals

- A complete implementation of every M3 Expressive component.
- Arbitrary per-user seed colors (four presets are supported).
- Deep visual integration for Semantic MediaWiki, Cargo, PageForms or Flow.
- Pixel parity for third-party extension UI.
- Replacing MediaWiki's content model or extension behaviour.
- A manual WCAG audit of every page (automated axe-core checks are in CI).

## 3. Design principles

- **Reading first.** The article surface is calm; chrome recedes; reading mode
  is a first-class control.
- **Token-driven.** Components resolve colours, type, shape and motion to
  `--md-sys-*` variables where practical.
- **Progressive enhancement.** Core reading, navigation and search work without
  JavaScript; JS adds menus, theme/layout switching, scroll-spy and snackbars.
- **No external requests.** Fonts, icons and scripts are served from the skin.

## 4. Token system

Generated from `#006A6A` by `tools/generate-tokens.mjs`
(`@material/material-color-utilities`), committed as
`resources/styles/tokens.css` and `docs/tokens.json`.

- Colour roles include `surface-container-*`, `inverse-*`, `outline-variant`.
- Typescale: display / headline / title / body / label.
- Shape: none, extra-small 4, small 8, medium 12, large 16, extra-large 28,
  extra-extra-large 40, full.
- Elevation: levels 0–5.
- Motion: short/medium/long durations, standard/emphasized easings, a spring
  approximation via CSS `linear()`.
- State layers: hover/focus/pressed/dragged opacities.
- Font stack: Roboto Flex subset for Latin, system CJK stack, monospace stack.

## 5. Layouts and navigation

Two shells switchable in Preferences and via the in-page menu
(`data-chroma-layout`):

- **App** (default): top app bar with view-options/account menus, persistent
  drawer on desktop (overlay on narrow screens), content column + sticky TOC,
  page tabs and page actions.
- **Reading**: hides the drawer and TOC, centres the article and reduces chrome.

Reading mode (`data-chroma-reading="on"`) additionally hides page actions and
the TOC, and centres the article.

MobileFrontend takeover: with MobileFrontend installed and
`$wgDefaultMobileSkin = 'chroma'`, mobile UA requests use Chroma directly.
Mobile sections are expanded rather than collapsed.

## 6. Component inventory (v0.5.1)

Top app bar, view-options and account popovers, navigation drawer with grouped
list items and Material Symbols, search field + core search suggestions, page
tabs, page action buttons, TOC rail with nested sections and scroll-spy, chips,
cards, code blocks, tables, blockquote pull quotes, login/history/diff surfaces,
snackbar, footer, print stylesheet.

No floating edit FAB: edit/history actions live in the page action row.

## 7. Page inventory

- Article view (prose, tables, citations, images, infobox, TOC, categories)
- Edit (wikitext, VisualEditor, WikiEditor/CodeEditor on 1.46 harness)
- History and diff
- Special pages: Search, Preferences, RecentChanges, Watchlist, Upload, Login,
  AllPages, WhatLinksHere, Random, Version
- Talk pages (DiscussionTools on 1.46)
- Print stylesheet
- Error/permission pages

## 8. Extension compatibility

Tier 1 and the exact tested list live in `COMPATIBILITY.md`. Definitions:

- **A — functional:** no PHP/JS errors, controls present and operable, no
  horizontal overflow, keyboard reachable.
- **B — visual:** extension UI uses Chroma/MD3 surfaces, no obvious Vector/OOUI
  chrome leaking through.
- **C — pixel parity:** not promised for third-party extension UI.

The 1.46 harness has 31 extensions configured (AbuseFilter is disabled by a
missing environment dependency). The 1.43.0 and 1.45.0 matrices each cover
30 extensions. AbuseFilter is blocked by a missing Equivset dependency in the
local harness; VisualEditor/DiscussionTools are 1.46-only.

## 9. Configuration and preferences

See `THEMING.md`. Admin settings: default seed/scheme/layout/reading mode and
allow-user-override flags. User settings: Preferences → Appearance.

## 10. Accessibility

There is no automated axe-core suite in the repository. Visible focus, skip
links, labelled drawer/menus and `prefers-reduced-motion` handling are
implemented; a full manual audit of every MediaWiki page remains open.

## 11. Performance

No formal performance budget is enforced. The skin makes no external runtime
requests and ships its CSS/JS locally.

## 12. Browser support

Current two versions of Chrome, Edge, Firefox and Safari; no Internet Explorer.

## 13. Versioning and branches

- `REL1_43` (1.43.x), `REL1_45` (1.45.x), `REL1_46` (1.46.x), `main`
  (development).
- Tags: `vX.Y.Z-REL1_43` etc.; releases contain installable ZIPs.
- Version-specific differences: `COMPAT-MATRIX.md`.

## 14. Acceptance criteria (v0.5.1)

1. Installs and renders on all three MW lines with no PHP errors.
2. Tier 1 matrix renders citations, MathML, syntax highlighting, parser
   functions, poem and inputbox.
3. Light/dark/auto, app/reading layout, reading mode and four seed presets work.
4. MobileFrontend takeover works with `$wgDefaultMobileSkin = 'chroma'`.
5. CI is green; there is no hosted demo or Pages deployment.
6. Chinese README and English technical docs; mediawiki.org listing and
  translatewiki registration remain external account tasks.

## 15. Repository layout

```
.github/        CI, release and issue templates
docs/           SPEC, THEMING, COMPATIBILITY, COMPAT-MATRIX, tokens.json
i18n/           en, qqq, zh-hans, zh-hant
includes/       PHP hooks and skin class
templates/      Mustache template
resources/      tokens, base/extension styles, scripts
tools/          token/preset generators
dev/            local harness placeholder (not used by CI)
```
