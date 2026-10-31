# Local MediaWiki harness

The disposable MediaWiki instances used for Chroma screenshots and compatibility
checks are **not** shipped as working scripts yet.

- `install.sh` is currently a placeholder and exits with an error.
- The actual harness used in development consisted of three separate
  MediaWiki source installs (1.43.0 / 1.45.0 / 1.46.0) with SQLite, the skin
  symlinked into `skins/Chroma`, and extension archives downloaded from the
  matching release branches.
- `extensions.sh`, `seed-pages.php` and one-command setup are not implemented.

For the tested extension list and how each version was checked, see
`docs/COMPATIBILITY.md` and `docs/COMPAT-MATRIX.md`.
