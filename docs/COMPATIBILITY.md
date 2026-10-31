# Extension compatibility

Status legend: **A** functional, **B** visually consistent, **C** pixel parity
(not promised for third-party UI). `planned` = not yet implemented in v0.1.

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
