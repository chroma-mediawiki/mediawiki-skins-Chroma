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

```

Presets are compiled at build time (`npm run presets`) into
`resources/styles/tokens-presets.css` and selected with a `chroma-seed-*` class
on `<body>`. The user preference is available under Appearance once the skin is
active. Arbitrary seed colors are not implemented in v0.5.1; the four presets
above are the supported values.

## User preferences

`Special:Preferences#mw-prefsection-rendering` → Chroma section:

- Color scheme: follow system / light / dark
- Accent color: teal / blue / green / violet (if allowed)
- Layout: app-like / reading
- Reading mode: on/off

Quick toggles live in the top app bar's “显示选项 / View options” menu
(layout, theme, reading mode). They are client-side (localStorage) quick
switches; logged-in users get persistent values through Special:Preferences.
The “账户 / Account” menu contains the personal tools.

## CSS variables

All tokens are CSS custom properties on `:root`:

```css
.example { color: var(--md-sys-color-on-surface); }
```

Dark mode is selected with `data-chroma-theme="dark"` on `<body>` (JS mirrors
it to `<html>` for compatibility); `auto` follows `prefers-color-scheme`. Site CSS can override any variable, e.g. in
`MediaWiki:Chroma.css`:

```css
:root { --md-sys-color-primary: #005a5a; }
```

## Logo

Chroma renders a logo mark only when a custom `$wgLogos` entry is configured;
the default MediaWiki “change-your-logo” assets are treated as no logo. Without
a custom logo the top app bar shows only the site name — no letter placeholder.
The skin does not read `$wgLogos['1.5x']` (removed in MediaWiki 1.46). The
favicon is controlled separately by `$wgFavicon`.
