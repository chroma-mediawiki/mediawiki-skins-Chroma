# Tests

Planned layers (P9):

1. **PHPUnit** — PHP unit tests for preference handling and config.
2. **Playwright** — smoke tests per MediaWiki version:
   - page loads without PHP error markers
   - no console errors
   - no horizontal overflow at 360 / 768 / 1024 / 1440
   - key selectors present (app bar, drawer, content, TOC, footer)
   - axe-core accessibility scan
3. **Golden screenshots** — per page and per Tier 1 extension; diffed in CI.

Until the harness lands, CI only validates JSON, PHP syntax of committed PHP
files, requirement files and token drift.
