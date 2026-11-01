# Release checklist

1. `npm run tokens` and `npm run presets`; ensure no drift (`git diff --exit-code`).
2. `npm run lint` (JS/CSS) and PHP syntax checks.
3. Run the local MediaWiki harness for each supported line:
   - `REL1_43` on 1.43.x
   - `REL1_45` on 1.45.x
   - `REL1_46` on 1.46.x
   Check: main page, article with extensions, edit, history, diff,
   preferences, mobile UA (Chroma with `$wgDefaultMobileSkin = 'chroma'`).
   `?useskin=chroma` is only a fallback, not required for mobile.
4. Run `node tests/a11y-demo.mjs` against the static demo; expect 0 violations.
5. Update `CHANGELOG.md` and version notes.
6. Tag `vX.Y.Z-REL1_43`, `vX.Y.Z-REL1_45`, `vX.Y.Z-REL1_46` on the branch heads.
7. Confirm GitHub Release ZIPs contain `skin.json`, `includes/`, `templates/`,
   `resources/`, `i18n/`, `screenshots/` (for README images), `docs/`, `LICENSE`,
   `NOTICE`.
8. Update README download table and mediawiki.org page if needed.
9. Verify `screenshots/readme-banner.svg` version string matches the release.
