# Contributing to Chroma

Thanks for helping! This project follows the MediaWiki code of conduct and the
GPL-3.0-or-later license.

## Branches

- `main` — development for the latest MediaWiki line.
- `REL1_43`, `REL1_45`, `REL1_46` — release branches. Fixes land on `main`
  first, then are cherry-picked.

## Before opening a PR

1. `npm run lint`
2. `php -l` on changed PHP files
3. Test the affected pages on the MediaWiki versions listed in
   the [testing & compatibility](https://chroma-mediawiki.github.io/chroma-docs/dev/testing) page
4. Add before/after screenshots for visual changes
5. Update the [compatibility](https://chroma-mediawiki.github.io/chroma-docs/guide/compatibility) page if you touch extension styles

## Commit messages

Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `test:`,
`chore:`. Keep the subject under 72 characters.

## Token changes

Never hand-edit `resources/styles/tokens.css`. Change the seed via
`npm run tokens` (or a dedicated preset script) and commit both the generated
CSS and `tokens.json`.
