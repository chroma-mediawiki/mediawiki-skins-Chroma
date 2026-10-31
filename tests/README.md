# Tests

Current automated test coverage:

- **`tests/a11y-demo.mjs`** — Playwright + axe-core scan of `demo/` against
  WCAG 2.0/2.1/2.2 A+AA rules. Runs in the `demo` CI job and fails on any
  violation or browser console error.

Not implemented yet:

- PHPUnit tests for preferences/config.
- Playwright smoke tests against the three MediaWiki installs.
- Golden screenshot diffing and a per-extension compatibility suite.

Extension compatibility was checked manually; see `docs/COMPATIBILITY.md`.
