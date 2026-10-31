# Local MediaWiki harness

Scripts in this directory build disposable MediaWiki instances for Chroma
development and compatibility testing. They are **not** part of the skin.

Planned entry points (P1/P9):

- `install.sh` — download a MediaWiki release tarball, install with SQLite,
  symlink this skin to `skins/Chroma`, enable it.
- `extensions.sh` — download the Tier 1 extension set for the target MW line.
- `seed-pages.php` — import sample pages covering citations, tables, math,
  syntax highlighting, maps, images and talk pages.

Environment variables:

- `MW_VERSION` (default: 1.46.0)
- `MW_DIR` (default: `../mw`)
- `MW_PORT` (default: 8080)
