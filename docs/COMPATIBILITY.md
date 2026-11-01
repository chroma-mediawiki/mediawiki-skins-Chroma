# Extension compatibility

Status legend: **A** functional, **B** visually consistent, **C** pixel parity
(not promised for third-party UI). `tested` = exercised in the 1.43/1.45/1.46 harnesses.

## Harness result — MediaWiki 1.46.0 (2026-10-31)

The 1.46.0 harness has the following Tier 1 extensions installed and loading:
AbuseFilter (disabled, see below), CategoryTree, Cite, CodeEditor, ConfirmEdit,
DiscussionTools, Echo, Gadgets, ImageMap, InputBox, Linter, LoginNotify, Math,
MultimediaViewer, Nuke, OATHAuth, PageImages, ParserFunctions, PdfHandler, Poem,
ReplaceText, Scribunto, SecureLinkFixer, SpamBlacklist, SyntaxHighlight_GeSHi,
TemplateData, TextExtracts, Thanks, TitleBlacklist, VisualEditor, WikiEditor.

Verified pages: article with `<ref>`, `<math>`, `<syntaxhighlight>`, `<poem>`,
`<inputbox>`, `<categorytree>`; wikitext editor with WikiEditor toolbar;
VisualEditor; history; diff; login; preferences; Special:Version;
Special:Notifications; Special:LintErrors.

## 1.43 / 1.45 extension matrix (2026-10-31)

30 Tier 1 extensions were installed from each release branch and loaded on both
MediaWiki 1.43.0 and 1.45.0: CategoryTree, Cite, CiteThisPage, CodeEditor,
ConfirmEdit, Echo, Gadgets, ImageMap, InputBox, Linter, LoginNotify, Math,
MultimediaViewer, Nuke, OATHAuth, PageImages, ParserFunctions, PdfHandler, Poem,
ReplaceText, Scribunto, SecureLinkFixer, SpamBlacklist, SyntaxHighlight_GeSHi,
TemplateData, TextExtracts, Thanks, TitleBlacklist, WikiEditor.

The matrix page renders `<ref>`, `<math>` (native MathML), `<syntaxhighlight>`,
`{{#if:}}`, `<poem>` and `<inputbox>`. Screenshots:
`screenshots/mw143-extensions.png`, `screenshots/mw145-extensions.png`.

Exceptions: AbuseFilter still needs `Wikimedia\Equivset`; VisualEditor /
DiscussionTools need the `lib/ve` submodule bundle and are tested on 1.46 only.

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

## MobileFrontend takeover — MediaWiki 1.46.0

- Installed `MobileFrontend`; MinervaNeue is installed only for comparison, not
  required by Chroma.
- Desktop UA: Chroma (skin-chroma).
- Mobile UA (Pixel 7): Chroma serves the mobile view directly
  (`$wgDefaultMobileSkin = 'chroma'`); the responsive drawer/search/TOC layout is
  active without MinervaNeue.
- `?useskin=chroma` is no longer required for mobile; it remains useful for
  forcing Chroma from desktop UA.
- Result: Chroma full mobile takeover verified with
  `$wgDefaultMobileSkin = 'chroma'`; no MinervaNeue dependency required.

## Tier 1 — current scope (v0.5.x)

MediaWiki 1.43 bundled extensions (33):

| Extension | UI impact | Target | Status |
|---|---|---|---|
| AbuseFilter | special pages/forms | A | blocked (Equivset) |
| CategoryTree | content tree | A+B | tested 1.43/1.45/1.46 |
| Cite | reference popups/content | A+B | tested 1.43/1.45/1.46 |
| CiteThisPage | special page | A | tested 1.43/1.45/1.46 |
| CodeEditor | edit textarea | A+B | tested 1.43/1.45/1.46 |
| ConfirmEdit | CAPTCHA forms | A+B | tested 1.43/1.45/1.46 |
| DiscussionTools | talk reply UI | A+B | tested 1.46 (VE dep) |
| Echo | notifications/badges | A+B | tested 1.43/1.45/1.46 |
| Gadgets | preferences | A | tested 1.43/1.45/1.46 |
| ImageMap | content | A | tested 1.43/1.45/1.46 |
| InputBox | content forms | A+B | tested 1.43/1.45/1.46 |
| Interwiki | special page | A | core since 1.44 |
| Linter | special page | A | tested 1.43/1.45/1.46 |
| LoginNotify | notifications | A | tested 1.43/1.45/1.46 |
| Math | content (MathML) | A+B | tested 1.43/1.45/1.46 (native) |
| MultimediaViewer | lightbox | A+B | tested 1.43/1.45/1.46 |
| Nuke | special page | A | tested 1.43/1.45/1.46 |
| OATHAuth | special page/forms | A | tested 1.43/1.45/1.46 |
| PageImages | API only | A | tested 1.43/1.45/1.46 |
| ParserFunctions | content | A | tested 1.43/1.45/1.46 |
| PdfHandler | file pages | A | tested 1.43/1.45/1.46 |
| Poem | content | A | tested 1.43/1.45/1.46 |
| ReplaceText | special page | A | tested 1.43/1.45/1.46 |
| Scribunto | content | A | tested 1.43/1.45/1.46 |
| SecureLinkFixer | none | A | tested 1.43/1.45/1.46 |
| SpamBlacklist | special page | A | tested 1.43/1.45/1.46 |
| SyntaxHighlight_GeSHi | content | A+B | tested 1.43/1.45/1.46 |
| TemplateData | edit UI | A+B | tested 1.43/1.45/1.46 |
| TextExtracts | API only | A | tested 1.43/1.45/1.46 |
| Thanks | links/snackbar | A+B | tested 1.43/1.45/1.46 |
| TitleBlacklist | special page | A | tested 1.43/1.45/1.46 |
| VisualEditor | full editor UI | A+B | tested 1.46 |
| WikiEditor | toolbar | A+B | tested 1.43/1.45/1.46 |

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

## Tier 2 — not in current scope (graceful degradation only)

Semantic MediaWiki, Cargo, PageForms, Translate, UploadWizard, Flow /
StructuredDiscussions. They must not break (A), but no dedicated visual work.

## Tier 3 — unknown extensions

Inherit base prose/table/form/button/dialog styles. Rule: the skin never hides
extension UI and never depends on extension-internal DOM.

## Test method

The compatibility matrix was verified manually on disposable local installs:

- Three MediaWiki source installs (1.43.0 / 1.45.0 / 1.46.0) with SQLite;
- 31 Tier 1 extensions on 1.46 and 30 on each of 1.43/1.45;
- an extension matrix page containing `<ref>`, `<math>`, `<syntaxhighlight>`,
  `{{#if:}}`, `<poem>`, `<inputbox>` and `<categorytree>`;
- HTTP 200 and visual checks, plus the screenshots in `screenshots/`.

There is no automated per-extension Playwright suite. CI runs JSON/PHP lint and
token drift checks only. `dev/install.sh` is currently a
placeholder; the harness setup is not shipped as a one-command script.

## Reporting a problem

Open a "Compatibility report" issue with: MW version, Chroma version, extension
name/version, browser, screenshot, console output.
