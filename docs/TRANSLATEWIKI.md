# Translatewiki.net preparation

Chroma uses standard MediaWiki i18n files in `i18n/`:

- `en.json` — source messages (`skinname-chroma`, `chroma-desc`, preferences,
  labels).
- `qqq.json` — message documentation.
- `zh-hans.json`, `zh-hant.json` — Chinese variants (already populated).
- `en-gb.json` etc. can fall back to `en`.

## Steps

1. Ensure every message used in PHP/templates exists in `en.json` and `qqq.json`.
2. Keep `i18n/qqq.json` up to date when adding messages.
3. Register the project on translatewiki.net:
   - request a project for `mediawiki-skins-Chroma`;
   - point it at the GitHub repository and the `i18n/` directory;
   - follow the `translatewiki.net` project setup guide.
4. After approval, add a translation link to `README.md` / mediawiki.org page.
