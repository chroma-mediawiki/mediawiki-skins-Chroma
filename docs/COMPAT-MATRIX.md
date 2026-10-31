# MediaWiki version compatibility matrix

Chroma is maintained as separate branches per MediaWiki line. Do not merge
version-specific workarounds into a single branch.

| Topic | REL1_43 (1.43 LTS) | REL1_45 | REL1_46 |
|---|---|---|---|
| Minimum PHP | 8.1 | 8.2 | 8.3 |
| PHP tested in CI | 8.1 / 8.2 / 8.3 | 8.2 / 8.3 | 8.3 / 8.4 |
| `$wgLogos['1.5x']` | supported (deprecated) | supported (deprecated) | **removed**; falls back to `1x` |
| Logo rendering | core `Skin::getLogo()`/`getLogoData()` | same | same |
| `skin.json` `menus` | optional | transitional | **required** (`T409774`, `T416652`) |
| Codex | 1.23.x | 2.3.2 | 2.5.1 |
| OOUI | 0.51.x | 0.53.0 | 0.53.2 |
| Heading DOM | legacy + new | new DOM forced (`$wgParserEnableLegacyHeadingDOM` removed) | same |
| Media DOM | legacy + new | new DOM forced (`$wgParserEnableLegacyMediaDOM` removed) | same |
| Notes | Longest support window | EOL 2026-12-31 | Current stable |

## Branch rules

- `skin.json` `requires.MediaWiki` per branch: `>= 1.43.0 < 1.44.0`,
  `>= 1.45.0 < 1.46.0`, `>= 1.46.0 < 1.47.0`.
- Add `menus` to `skin.json` on `REL1_46` (and later lines) only.
- Do not reference `1.5x` logo keys in any branch; read available keys from the
  core logo data.
- Codex/OOUI bridge files may differ per branch; keep them in
  `resources/styles/codex-bridge.css` and `oojs-bridge.css` with branch-specific
  exceptions documented here.
- CI runs the branch's PHP matrix; a branch is released only when its matrix is
  green.

## Local smoke test (2026-10-31)

- MediaWiki **1.46.0**, PHP **8.3.6**, SQLite, skin `main` (pre-branch split).
- Checked pages: main page, edit, history, Special:Preferences, Special:Search,
  Special:Version, Special:UserLogin.
- Result: skin registers and renders, no PHP errors, no browser console errors,
  CI green, GitHub Pages deployment green.
- Known gaps at this stage:
  - OOUI-based preferences tabs/buttons are not yet MD3-themed (P7).
  - Search suggestions/typeahead not implemented yet (P4).
  - Footer "places" links are empty on a default wiki (only shown when configured).
  - TOC renders top-level sections only; nested sections land in P4.
  - MobileFrontend not installed in this harness; responsive layout checked directly.
  - Tier 1 extensions are installed from GitHub release branches; see
    `docs/COMPATIBILITY.md` for the exact list and known harness issues.
  - Math is tested with `native` mode (MathML mode needs RESTBase/Mathoid).
