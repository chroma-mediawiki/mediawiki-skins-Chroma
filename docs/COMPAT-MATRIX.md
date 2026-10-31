# MediaWiki version compatibility matrix

Chroma is maintained as separate branches per MediaWiki line. Do not merge
version-specific workarounds into a single branch.

| Topic | REL1_43 (1.43 LTS) | REL1_45 | REL1_46 |
|---|---|---|---|
| Minimum PHP | 8.1 | 8.2 | 8.3 |
| PHP used by CI | 8.3 | 8.3 | 8.3 |
| PHP used in local harness | 8.3.6 | 8.3.6 | 8.3.6 |
| `$wgLogos['1.5x']` | supported (deprecated) | supported (deprecated) | **removed** |
| Logo rendering | `data-logos`; no hard-coded fallback | same | same |
| `skin.json` `menus` | legacy names (`namespaces`, `personal`) | new names | **required** new names (`T409774`, `T416652`) |
| Codex | 1.23.x | 2.3.2 | 2.5.1 |
| OOUI | 0.51.x | 0.53.0 | 0.53.2 |
| Heading DOM | legacy + new | new DOM forced | new DOM forced |
| Media DOM | legacy + new | new DOM forced | new DOM forced |
| Notes | Longest support window | EOL 2026-12-31 | Current stable |

Codex/OOUI values are reference versions from the corresponding MediaWiki
releases; only the local 1.46 harness was exercised for UI screenshots.

## Branch rules

- `skin.json` `requires.MediaWiki` per branch: `>= 1.43.0 < 1.44.0`,
  `>= 1.45.0 < 1.46.0`, `>= 1.46.0 < 1.47.0`.
- REL1_43 uses legacy menu keys; REL1_45 and REL1_46 use the new menu names.
- Do not reference `1.5x` logo keys in any branch. Chroma renders a logo mark
  only when a custom `$wgLogos` is configured and otherwise shows the site name.
- Codex/OOUI bridge files may differ per branch; keep them in
  `resources/styles/codex-bridge.css` and `oojs-bridge.css` with branch-specific
  exceptions documented here.
- CI currently runs PHP lint/JSON/required-file checks with PHP 8.3, plus the
  token drift and demo accessibility jobs. It does not run a full MediaWiki
  matrix; branch runtime checks are manual.

## Released builds (v0.5.1)

- `v0.5.1-REL1_43` / `v0.5.1-REL1_45` / `v0.5.1-REL1_46` tags exist; each tag
  builds a GitHub Release ZIP via `.github/workflows/release.yml`.
- Runtime smoke tests completed on MediaWiki **1.43.0**, **1.45.0** and
  **1.46.0**: skin registers/renders, `data-chroma-*` attributes and
  `chroma-seed-*` class are applied, preferences work, no PHP errors.
- 1.43 namespace/associated-pages tabs render via the legacy `data-namespaces`
  menu.

## Local smoke test (2026-10-31, updated 2026-11-01)

- MediaWiki **1.43.0 / 1.45.0 / 1.46.0**, PHP **8.3.6**, SQLite.
- Checked pages: main page, article with extensions, edit, history, diff,
  Special:Preferences, Special:Search, Special:Version, Special:UserLogin.
- Result: skin registers and renders, no PHP errors, no browser console errors,
  CI green, GitHub Pages deployment green.
- Verified after v0.5.0/v0.5.1:
  - OOUI preferences/Codex login/history/diff surfaces use Chroma tokens.
  - Search suggestions are provided by core `mediawiki.searchSuggest`.
  - MobileFrontend is installed; `$wgDefaultMobileSkin = 'chroma'` serves
    Chroma on mobile UA without MinervaNeue.
  - Mobile sections are expanded (not Minerva-collapsed).
  - Nested TOC sections and scroll-spy are implemented.
  - 30 Tier 1 extensions are installed on 1.43.0 and 1.45.0 and render the
    matrix page; see `docs/COMPATIBILITY.md`.
  - Math is tested with `native` mode (MathML mode needs RESTBase/Mathoid).
