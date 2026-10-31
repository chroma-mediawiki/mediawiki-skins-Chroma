/**
 * Launch the static demo, run axe-core WCAG 2.2 AA, and fail on violations.
 * Usage: node tests/a11y-demo.mjs (expects a server on http://127.0.0.1:8080)
 */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = process.env.DEMO_URL || 'http://127.0.0.1:8080/demo/';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });

await page.goto(base, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.addScriptTag({ content: axeSource });
const results = await page.evaluate(async () => window.axe.run(document, {
  runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }
}));

await page.screenshot({ path: 'screenshots/ci-demo.png', fullPage: true });

if (errors.length) {
  console.error('Browser errors:', errors);
  process.exit(1);
}
if (results.violations.length) {
  for (const v of results.violations) {
    console.error(`[${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`);
  }
  await browser.close();
  process.exit(1);
}
console.log(`a11y ok: ${results.passes.length} passes, 0 violations`);
await browser.close();
