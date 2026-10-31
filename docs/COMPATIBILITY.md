# Extension compatibility

Status legend: **A** functional, **B** visually consistent, **C** pixel parity
(not promised for third-party UI). `planned` = not yet implemented in v0.1.

## Harness result — MediaWiki 1.46.0 (2026-10-31)

The 1.46.0 harness has the following Tier 1 extensions installed and loading:
AbuseFilter (disabled, see below), CategoryTree, Cite, CodeEditor, ConfirmEdit,
DiscussionTools, Echo, Gadgets, ImageMap, InputBox, Linter, LoginNotify, Math,
MultimediaViewer, Nuke, OATHAuth, PageImages, ParserFunctions, PdfHandler, Poem,
ReplaceText, Scribunto, SecureLinkFixer, SpamBlacklist, SyntaxHighlight_GeSHi,
TemplateData, TextExtracts, Thanks, TitleBlacklist, VisualEditor, WikiEditor.

Verified pages: article with `<ref>`, `<math>`, `<syntaxhighlight>`, `<poem>`,
`<inputbox>`, `<categorytree>`; wikitext editor with WikiEditor toolbar;
VisualEditor; history; Special:Version; Special:Notifications; Special:LintErrors.

Known harness issues (not skin defects):

- VisualEditor needs two extra pieces that are git submodules/foreign resources in
  the upstream repo: `lib/ve` (VisualEditor core) and `lib/spark-md5/spark-md5.js`.
- DiscussionTools requires VisualEditor; both load together.
- Math renders with `$wgMathValidModes = [ 'native' ]` in this local harness
  (MathML mode needs a RESTBase/Mathoid service).
- AbuseFilter is disabled because its `Wikimedia\Equivset\Equivset` composer
  dependency is not present in the source install; install extension composer
  dependencies to test it.
- Interwiki is part of MediaWiki core since 1.44; the standalone extension is a
  stub and must not be loaded.
- CheckUser and TemplateStyles placeholders from the core source archive are not
  installed; they are not needed for the skin harness.

## MobileFrontend (B2) — MediaWiki 1.46.0

- Installed `MobileFrontend` + `MinervaNeue`.
- Desktop UA: Chroma (skin-chroma).
- Mobile UA (Pixel 7): MinervaNeue serves the mobile view, Chroma remains the
  desktop skin; no functional breakage.
- Forced `?useskin=chroma` on a mobile viewport renders Chroma's responsive
  layout (drawer becomes overlay, search collapses to an icon, TOC hidden).
- Result: B2 coexistence verified.

## Tier 1 — in scope for v0.1

MediaWiki 1.43 bundled extensions (33):

| Extension | UI impact | Target | Status |
|---|---|---|---|
| AbuseFilter | special pages/forms | A | planned |
| CategoryTree | content tree | A+B | planned |
| Cite | reference popups/content | A+B | planned |
| CiteThisPage | special page | A | planned |
| CodeEditor | edit textarea | A+B | planned |
| ConfirmEdit | CAPTCHA forms | A+B | planned |
| DiscussionTools | talk reply UI | A+B | planned |
| Echo | notifications/badges | A+B | planned |
| Gadgets | preferences | A | planned |
| ImageMap | content | A | planned |
| InputBox | content forms | A+B | planned |
| Interwiki | special page | A | planned |
| Linter | special page | A | planned |
| LoginNotify | notifications | A | planned |
| Math | content (MathML) | A+B | planned |
| MultimediaViewer | lightbox | A+B | planned |
| Nuke | special page | A | planned |
| OATHAuth | special page/forms | A | planned |
| PageImages | API only | A | planned |
| ParserFunctions | content | A | planned |
| PdfHandler | file pages | A | planned |
| Poem | content | A | planned |
| ReplaceText | special page | A | planned |
| Scribunto | content | A | planned |
| SecureLinkFixer | none | A | planned |
| SpamBlacklist | special page | A | planned |
| SyntaxHighlight_GeSHi | content | A+B | planned |
| TemplateData | edit UI | A+B | planned |
| TextExtracts | API only | A | planned |
| Thanks | links/snackbar | A+B | planned |
| TitleBlacklist | special page | A | planned |
| VisualEditor | full editor UI | A+B | planned |
| WikiEditor | toolbar | A+B | planned |

Lightweight popular community extensions:

| Extension | UI impact | Target | Status |
|---|---|---|---|
| Maps | content maps | A | planned |
| EmbedVideo | content | A | planned |
| Widgets | content | A | planned |
| DynamicPageList (DPL) | content lists | A+B | planned |
| RSS | content | A | planned |
| CharInsert | edit toolbar | A+B | planned |
| Variables / Arrays / Loops / StringFunctions | content | A | planned |
| LabeledSectionTransclusion | content | A | planned |
| External Data | content | A | planned |
| WikiSEO | head only | A | planned |
| Purge | tabs | A+B | planned |
| NoTitle | content | A | planned |
| Header Tabs | content tabs | A+B | planned |
| MsUpload | edit UI | A+B | planned |
| YouTube | content | A | planned |

## Tier 2 — not in v0.1 (graceful degradation only)

Semantic MediaWiki, Cargo, PageForms, Translate, UploadWizard, Flow /
StructuredDiscussions. They must not break (A), but no dedicated visual work.

## Tier 3 — unknown extensions

Inherit base prose/table/form/button/dialog styles. Rule: the skin never hides
extension UI and never depends on extension-internal DOM.

## Test method

- `dev/install.sh` builds a MediaWiki instance and installs the Tier 1 set.
- `tests/compat.spec.ts` visits one page per extension, asserts HTTP 200, no PHP
  error markers, no console errors, no horizontal overflow, key selector present.
- Screenshots are stored per extension in `screenshots/compat/` and diffed in CI.

## Reporting a problem

Open a "Compatibility report" issue with: MW version, Chroma version, extension
name/version, browser, screenshot, console output.
