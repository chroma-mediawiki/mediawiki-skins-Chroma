# Security policy

## Supported versions

| Version | MediaWiki | Supported |
|---|---|---|
| 0.1.x | 1.43 / 1.45 / 1.46 | ✅ |

## Reporting a vulnerability

Please do **not** open a public issue for security problems. Use GitHub's
private vulnerability reporting (Security → Report a vulnerability) or contact
the maintainers listed on the repository profile.

Include: affected version, MediaWiki version, steps to reproduce, impact.

## Scope

Chroma is a skin: it does not handle authentication, storage or permissions.
Reports about MediaWiki core or extensions should go to their respective
projects. We do care about XSS through skin-rendered content, CSP regressions,
and unsafe handling of user preferences.
