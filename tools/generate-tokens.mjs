import { CorePalette, argbFromHex, hexFromArgb } from '@material/material-color-utilities';
import { writeFileSync } from 'node:fs';

const seed = process.argv[2] || '#006A6A';
const outCss = process.argv[3] || 'resources/styles/tokens.css';
const outJson = process.argv[4] || 'tokens.json';
const pal = CorePalette.of(argbFromHex(seed));
const T = (p, n) => hexFromArgb(p.tone(n));

const light = {
  'primary': T(pal.a1, 40), 'on-primary': T(pal.a1, 100),
  'primary-container': T(pal.a1, 90), 'on-primary-container': T(pal.a1, 10),
  'secondary': T(pal.a2, 40), 'on-secondary': T(pal.a2, 100),
  'secondary-container': T(pal.a2, 90), 'on-secondary-container': T(pal.a2, 10),
  'tertiary': T(pal.a3, 40), 'on-tertiary': T(pal.a3, 100),
  'tertiary-container': T(pal.a3, 90), 'on-tertiary-container': T(pal.a3, 10),
  'error': T(pal.error, 40), 'on-error': T(pal.error, 100),
  'error-container': T(pal.error, 90), 'on-error-container': T(pal.error, 10),
  'background': T(pal.n1, 99), 'on-background': T(pal.n1, 10),
  'surface': T(pal.n1, 98), 'on-surface': T(pal.n1, 10),
  'surface-variant': T(pal.n2, 90), 'on-surface-variant': T(pal.n2, 30),
  'outline': T(pal.n2, 50), 'outline-variant': T(pal.n2, 80),
  'scrim': T(pal.n1, 0),
  'inverse-surface': T(pal.n1, 20), 'inverse-on-surface': T(pal.n1, 95),
  'inverse-primary': T(pal.a1, 80),
  'surface-tint': T(pal.a1, 40),
  'surface-dim': T(pal.n1, 87), 'surface-bright': T(pal.n1, 98),
  'surface-container-lowest': T(pal.n1, 100),
  'surface-container-low': T(pal.n1, 96),
  'surface-container': T(pal.n1, 94),
  'surface-container-high': T(pal.n1, 92),
  'surface-container-highest': T(pal.n1, 90),
};
const dark = {
  'primary': T(pal.a1, 80), 'on-primary': T(pal.a1, 20),
  'primary-container': T(pal.a1, 30), 'on-primary-container': T(pal.a1, 90),
  'secondary': T(pal.a2, 80), 'on-secondary': T(pal.a2, 20),
  'secondary-container': T(pal.a2, 30), 'on-secondary-container': T(pal.a2, 90),
  'tertiary': T(pal.a3, 80), 'on-tertiary': T(pal.a3, 20),
  'tertiary-container': T(pal.a3, 30), 'on-tertiary-container': T(pal.a3, 90),
  'error': T(pal.error, 80), 'on-error': T(pal.error, 20),
  'error-container': T(pal.error, 30), 'on-error-container': T(pal.error, 90),
  'background': T(pal.n1, 10), 'on-background': T(pal.n1, 90),
  'surface': T(pal.n1, 10), 'on-surface': T(pal.n1, 90),
  'surface-variant': T(pal.n2, 30), 'on-surface-variant': T(pal.n2, 80),
  'outline': T(pal.n2, 60), 'outline-variant': T(pal.n2, 30),
  'scrim': T(pal.n1, 0),
  'inverse-surface': T(pal.n1, 90), 'inverse-on-surface': T(pal.n1, 20),
  'inverse-primary': T(pal.a1, 40),
  'surface-tint': T(pal.a1, 80),
  'surface-dim': T(pal.n1, 6), 'surface-bright': T(pal.n1, 24),
  'surface-container-lowest': T(pal.n1, 4),
  'surface-container-low': T(pal.n1, 10),
  'surface-container': T(pal.n1, 12),
  'surface-container-high': T(pal.n1, 17),
  'surface-container-highest': T(pal.n1, 22),
};
const vars = (o) => Object.entries(o).map(([k, v]) => `  --md-sys-color-${k}: ${v};`).join('\n');
const typescale = `
  /* ---- typescale (MD3 baseline + M3 Expressive emphasized) ---- */
  --md-sys-typescale-display-large-size: 57px; --md-sys-typescale-display-large-line: 64px; --md-sys-typescale-display-large-weight: 400; --md-sys-typescale-display-large-tracking: -0.25px;
  --md-sys-typescale-display-medium-size: 45px; --md-sys-typescale-display-medium-line: 52px; --md-sys-typescale-display-medium-weight: 400; --md-sys-typescale-display-medium-tracking: 0;
  --md-sys-typescale-display-small-size: 36px; --md-sys-typescale-display-small-line: 44px; --md-sys-typescale-display-small-weight: 400; --md-sys-typescale-display-small-tracking: 0;
  --md-sys-typescale-headline-large-size: 32px; --md-sys-typescale-headline-large-line: 40px; --md-sys-typescale-headline-large-weight: 400; --md-sys-typescale-headline-large-tracking: 0;
  --md-sys-typescale-headline-medium-size: 28px; --md-sys-typescale-headline-medium-line: 36px; --md-sys-typescale-headline-medium-weight: 400; --md-sys-typescale-headline-medium-tracking: 0;
  --md-sys-typescale-headline-small-size: 24px; --md-sys-typescale-headline-small-line: 32px; --md-sys-typescale-headline-small-weight: 400; --md-sys-typescale-headline-small-tracking: 0;
  --md-sys-typescale-title-large-size: 22px; --md-sys-typescale-title-large-line: 28px; --md-sys-typescale-title-large-weight: 400; --md-sys-typescale-title-large-tracking: 0;
  --md-sys-typescale-title-medium-size: 16px; --md-sys-typescale-title-medium-line: 24px; --md-sys-typescale-title-medium-weight: 500; --md-sys-typescale-title-medium-tracking: 0.15px;
  --md-sys-typescale-title-small-size: 14px; --md-sys-typescale-title-small-line: 20px; --md-sys-typescale-title-small-weight: 500; --md-sys-typescale-title-small-tracking: 0.1px;
  --md-sys-typescale-body-large-size: 16px; --md-sys-typescale-body-large-line: 26px; --md-sys-typescale-body-large-weight: 400; --md-sys-typescale-body-large-tracking: 0.5px;
  --md-sys-typescale-body-medium-size: 14px; --md-sys-typescale-body-medium-line: 20px; --md-sys-typescale-body-medium-weight: 400; --md-sys-typescale-body-medium-tracking: 0.25px;
  --md-sys-typescale-body-small-size: 12px; --md-sys-typescale-body-small-line: 16px; --md-sys-typescale-body-small-weight: 400; --md-sys-typescale-body-small-tracking: 0.4px;
  --md-sys-typescale-label-large-size: 14px; --md-sys-typescale-label-large-line: 20px; --md-sys-typescale-label-large-weight: 500; --md-sys-typescale-label-large-tracking: 0.1px;
  --md-sys-typescale-label-medium-size: 12px; --md-sys-typescale-label-medium-line: 16px; --md-sys-typescale-label-medium-weight: 500; --md-sys-typescale-label-medium-tracking: 0.5px;
  --md-sys-typescale-label-small-size: 11px; --md-sys-typescale-label-small-line: 16px; --md-sys-typescale-label-small-weight: 500; --md-sys-typescale-label-small-tracking: 0.5px;
  --md-sys-typescale-emphasized-display-large-size: 64px; --md-sys-typescale-emphasized-display-large-line: 72px; --md-sys-typescale-emphasized-display-large-weight: 500;
  --md-sys-typescale-emphasized-headline-large-size: 36px; --md-sys-typescale-emphasized-headline-large-line: 44px; --md-sys-typescale-emphasized-headline-large-weight: 500;
  --md-sys-typescale-emphasized-title-large-size: 24px; --md-sys-typescale-emphasized-title-large-line: 32px; --md-sys-typescale-emphasized-title-large-weight: 600;
`;
const tokens = `
  /* ---- shape ---- */
  --md-sys-shape-corner-none: 0px;
  --md-sys-shape-corner-extra-small: 4px;
  --md-sys-shape-corner-small: 8px;
  --md-sys-shape-corner-medium: 12px;
  --md-sys-shape-corner-large: 16px;
  --md-sys-shape-corner-extra-large: 28px;
  --md-sys-shape-corner-extra-extra-large: 40px;
  --md-sys-shape-corner-full: 9999px;
  /* ---- elevation ---- */
  --md-sys-elevation-0: none;
  --md-sys-elevation-1: 0 1px 2px 0 rgb(0 0 0 / .30), 0 1px 3px 1px rgb(0 0 0 / .15);
  --md-sys-elevation-2: 0 1px 2px 0 rgb(0 0 0 / .30), 0 2px 6px 2px rgb(0 0 0 / .15);
  --md-sys-elevation-3: 0 4px 8px 3px rgb(0 0 0 / .15), 0 1px 3px 0 rgb(0 0 0 / .30);
  --md-sys-elevation-4: 0 6px 10px 4px rgb(0 0 0 / .15), 0 2px 3px 0 rgb(0 0 0 / .30);
  --md-sys-elevation-5: 0 8px 12px 6px rgb(0 0 0 / .15), 0 4px 4px 0 rgb(0 0 0 / .30);
  /* ---- motion ---- */
  --md-sys-motion-duration-short1: 50ms; --md-sys-motion-duration-short2: 100ms; --md-sys-motion-duration-short3: 150ms; --md-sys-motion-duration-short4: 200ms;
  --md-sys-motion-duration-medium1: 250ms; --md-sys-motion-duration-medium2: 300ms; --md-sys-motion-duration-medium3: 350ms; --md-sys-motion-duration-medium4: 400ms;
  --md-sys-motion-duration-long1: 450ms; --md-sys-motion-duration-long2: 500ms; --md-sys-motion-duration-long3: 550ms; --md-sys-motion-duration-long4: 600ms;
  --md-sys-motion-easing-standard: cubic-bezier(.2, 0, 0, 1);
  --md-sys-motion-easing-standard-decelerate: cubic-bezier(0, 0, 0, 1);
  --md-sys-motion-easing-standard-accelerate: cubic-bezier(.3, 0, 1, 1);
  --md-sys-motion-easing-emphasized: cubic-bezier(.2, 0, 0, 1);
  --md-sys-motion-easing-emphasized-decelerate: cubic-bezier(.05, .7, .1, 1);
  --md-sys-motion-easing-emphasized-accelerate: cubic-bezier(.3, 0, .8, .15);
  --md-sys-motion-easing-spring: linear(0, .09 4%, .38 13%, .68 23%, .9 32%, 1.03 41%, 1.08 50%, 1.04 62%, 1 72%, .99 85%, 1);
  /* ---- state layers ---- */
  --md-sys-state-hover-opacity: .08;
  --md-sys-state-focus-opacity: .12;
  --md-sys-state-pressed-opacity: .12;
  --md-sys-state-dragged-opacity: .16;
  /* ---- font ---- */
  --md-sys-typescale-font-family: 'Roboto Flex', 'Roboto', system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  --md-sys-typescale-font-family-mono: ui-monospace, 'SFMono-Regular', 'Cascadia Code', Consolas, 'Liberation Mono', monospace;
`;
const css = `/* Chroma design tokens — generated from seed ${seed}. Do not edit by hand. */
:root, .chroma-theme-light, [data-chroma-theme="light"] {
  color-scheme: light;
${vars(light)}
${tokens}
}
[data-chroma-theme="dark"], .chroma-theme-dark {
  color-scheme: dark;
${vars(dark)}
}
@media (prefers-color-scheme: dark) {
  [data-chroma-theme="auto"] {
    color-scheme: dark;
${vars(dark)}
  }
}
`;
writeFileSync(outCss, css);
writeFileSync(outJson, JSON.stringify({ seed, light, dark }, null, 2) + '\n');
console.log('wrote', outCss, outJson, 'seed', seed);
