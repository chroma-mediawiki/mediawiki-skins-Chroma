# Draft: mediawiki.org `Skin:Chroma` page (wikitext)

Copy the block below into `https://www.mediawiki.org/wiki/Skin:Chroma` once the
project is ready to be listed. Keep the infobox fields in sync with `skin.json`.

```wikitext
{{Skin
|name = Chroma
|author = HAHAHAHAHAYINING
|description = A MediaWiki skin inspired by Material Design 3 and M3 Expressive.
|license = GPL-3.0-or-later
|compatibility = MediaWiki 1.43 LTS, 1.45, 1.46
|download = https://github.com/chroma-mediawiki/mediawiki-skins-Chroma/releases
|repo = https://github.com/chroma-mediawiki/mediawiki-skins-Chroma
|demo = https://chroma-mediawiki.github.io/mediawiki-skins-Chroma/demo/
|phabricator =
}}

'''Chroma''' is a MediaWiki skin inspired by Material Design 3 and M3 Expressive.
It provides four dynamic color presets, light/dark/auto schemes, an app-like
layout and a reading layout, plus a focus-oriented reading mode. MobileFrontend
can hand mobile requests to Chroma with `$wgDefaultMobileSkin = 'chroma'`.

== Installation ==
{{TNT|Skin installation|Chroma}}
<syntaxhighlight lang="php">
wfLoadSkin( 'Chroma' );
$wgDefaultSkin = 'chroma';
</syntaxhighlight>

== Configuration ==
<syntaxhighlight lang="php">
$wgChromaDefaultSeed = '#006A6A';
$wgChromaDefaultScheme = 'system'; // system | light | dark
$wgChromaDefaultLayout = 'app';    // app | reading
$wgChromaDefaultReadingMode = false;
$wgChromaAllowUserColor = true;
$wgChromaAllowUserLayout = true;
$wgChromaAllowUserReadingMode = true;
// Optional MobileFrontend takeover
// $wgDefaultMobileSkin = 'chroma';
</syntaxhighlight>

Current release line: **v0.5.1** (MediaWiki 1.43 LTS / 1.45 / 1.46).

== Compatibility ==
MediaWiki 1.43 LTS, 1.45 and 1.46 are maintained as separate branches and
release lines. See the repository `docs/COMPAT-MATRIX.md` and
`docs/COMPATIBILITY.md` for the extension compatibility matrix.

== See also ==
* [[Manual:Skinning]]
* [[Manual:Extensions]]
```
