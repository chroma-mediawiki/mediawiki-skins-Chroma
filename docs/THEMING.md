# Theming Chroma

## Admin configuration (`LocalSettings.php`)

```php
// Seed color used to generate the MD3 palette. Default: #006A6A.
// Built-in presets: #006A6A (teal), #0061A4 (blue), #386A20 (green), #6750A4 (violet).
$wgChromaDefaultSeed = '#006A6A';

// 'system' | 'light' | 'dark'
$wgChromaDefaultScheme = 'system';

// 'app' | 'reading'
$wgChromaDefaultLayout = 'app';

// Reading mode on by default (article pages only).
$wgChromaDefaultReadingMode = false;

// Allow users to override each setting in Preferences.
$wgChromaAllowUserColor = true;
$wgChromaAllowUserLayout = true;
$wgChromaAllowUserReadingMode = true;

// Optional preset swatches shown in Preferences.
$wgChromaColorPresets = [
    'teal'   => '#006A6A',
    'blue'   => '#0061A4',
    'green'  => '#386A20',
    'violet' => '#6750A4',
];
```

Presets are compiled at build time (`npm run presets`) into
`resources/styles/tokens-presets.css` and selected with a `chroma-seed-*` class
on `<body>`. The user preference is available under Appearance once the skin is
active. Arbitrary seed colors are planned for a later milestone; the four
presets above are supported in v0.1.

## User preferences

`Special:Preferences#mw-prefsection-rendering` → Chroma section:

- Color scheme: follow system / light / dark
- Accent color: teal / blue / green / violet (if allowed)
- Layout: app-like / reading
- Reading mode: on/off

Quick toggles are also exposed in the page header (theme, layout, reading mode)
and persisted server-side for logged-in users.

## CSS variables

All tokens are CSS custom properties on `:root`:

```css
.example { color: var(--md-sys-color-on-surface); }
```

Dark mode is selected with `data-chroma-theme="dark"` on `<html>`; `auto`
follows `prefers-color-scheme`. Site CSS can override any variable, e.g. in
`MediaWiki:Chroma.css`:

```css
:root { --md-sys-color-primary: #005a5a; }
```

## Logo

Chroma renders `$wgLogos` through MediaWiki's core logo API, so it automatically
uses whatever variants the running MediaWiki version supports (note: 1.46
removed the `1.5x` key). It falls back to a text wordmark when `$wgLogos` is
empty. Favicon comes from `$wgFavicon` / `$wgLogos['icon']`.
