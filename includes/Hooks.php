<?php
/**
 * Chroma hooks.
 *
 * @license GPL-3.0-or-later
 */

namespace MediaWiki\Skins\Chroma;

use MediaWiki\MediaWikiServices;
use MediaWiki\Output\OutputPage;
use MediaWiki\Skin\Skin;

/**
 * Hook handlers for the Chroma skin.
 */
class Hooks {

	private const THEMES = [ 'system', 'light', 'dark' ];
	private const LAYOUTS = [ 'app', 'reading' ];
	private const SEEDS = [
		'teal' => '#006A6A',
		'blue' => '#0061A4',
		'green' => '#386A20',
		'violet' => '#6750A4',
	];

	/**
	 * Register skin preferences in Special:Preferences.
	 *
	 * @param \MediaWiki\User\User $user
	 * @param array &$preferences
	 */
	public static function onGetPreferences( $user, array &$preferences ) {
		$defaultTheme = self::config( 'wgChromaDefaultScheme', 'system' );
		$defaultLayout = self::config( 'wgChromaDefaultLayout', 'app' );
		$defaultReading = (bool)self::config( 'wgChromaDefaultReadingMode', false );

		$preferences['chroma-theme'] = [
			'type' => 'radio',
			'section' => 'rendering',
			'label-message' => 'chroma-pref-theme',
			'options-messages' => [
				'chroma-theme-system' => 'system',
				'chroma-theme-light' => 'light',
				'chroma-theme-dark' => 'dark',
			],
			'default' => $defaultTheme,
		];
		$preferences['chroma-layout'] = [
			'type' => 'radio',
			'section' => 'rendering',
			'label-message' => 'chroma-pref-layout',
			'options-messages' => [
				'chroma-layout-app' => 'app',
				'chroma-layout-reading' => 'reading',
			],
			'default' => $defaultLayout,
		];
		$preferences['chroma-reading'] = [
			'type' => 'check',
			'section' => 'rendering',
			'label-message' => 'chroma-pref-reading',
			'default' => $defaultReading ? 1 : 0,
		];
		$defaultSeed = self::defaultSeedName();
		$preferences['chroma-seed'] = [
			'type' => 'select',
			'section' => 'rendering',
			'label-message' => 'chroma-pref-seed',
			'options-messages' => [
				'chroma-seed-teal' => 'teal',
				'chroma-seed-blue' => 'blue',
				'chroma-seed-green' => 'green',
				'chroma-seed-violet' => 'violet',
			],
			'default' => $defaultSeed,
		];
	}

	/**
	 * Apply the user's Chroma preferences as data attributes on <body>.
	 *
	 * @param OutputPage $out
	 * @param Skin $skin
	 * @param array &$bodyAttrs
	 */
	public static function onOutputPageBodyAttributes( OutputPage $out, Skin $skin, array &$bodyAttrs ) {
		if ( $skin->getSkinName() !== 'chroma' ) {
			return;
		}

		$user = $out->getUser();
		$lookup = MediaWikiServices::getInstance()->getUserOptionsLookup();

		$theme = self::config( 'wgChromaDefaultScheme', 'system' );
		$layout = self::config( 'wgChromaDefaultLayout', 'app' );
		$reading = (bool)self::config( 'wgChromaDefaultReadingMode', false );

		if ( self::config( 'wgChromaAllowUserColor', true ) ) {
			$theme = $lookup->getOption( $user, 'chroma-theme', $theme );
		}
		if ( self::config( 'wgChromaAllowUserLayout', true ) ) {
			$layout = $lookup->getOption( $user, 'chroma-layout', $layout );
		}
		if ( self::config( 'wgChromaAllowUserReadingMode', true ) ) {
			$reading = (bool)$lookup->getOption( $user, 'chroma-reading', $reading );
		}

		$theme = in_array( $theme, self::THEMES, true ) ? $theme : 'system';
		$layout = in_array( $layout, self::LAYOUTS, true ) ? $layout : 'app';

		$seed = self::defaultSeedName();
		if ( self::config( 'wgChromaAllowUserColor', true ) ) {
			$seed = $lookup->getOption( $user, 'chroma-seed', $seed );
		}
		$seed = array_key_exists( $seed, self::SEEDS ) ? $seed : self::defaultSeedName();

		$bodyAttrs['data-chroma-theme'] = $theme;
		$bodyAttrs['data-chroma-layout'] = $layout;
		$bodyAttrs['data-chroma-reading'] = $reading ? 'on' : 'off';
		$bodyAttrs['class'] = trim( ( $bodyAttrs['class'] ?? '' ) . ' chroma-seed-' . $seed );
	}

	/**
	 * Read a global configuration value with a default.
	 *
	 * @param string $name
	 * @param mixed $default
	 * @return mixed
	 */
	private static function defaultSeedName() {
		$seed = self::config( 'wgChromaDefaultSeed', '#006A6A' );
		foreach ( self::SEEDS as $name => $hex ) {
			if ( strcasecmp( $seed, $hex ) === 0 ) {
				return $name;
			}
		}
		return 'teal';
	}

	private static function config( $name, $default ) {
		global $wgChromaDefaultScheme, $wgChromaDefaultLayout, $wgChromaDefaultReadingMode,
			$wgChromaDefaultSeed, $wgChromaAllowUserColor, $wgChromaAllowUserLayout,
			$wgChromaAllowUserReadingMode;
		$map = [
			'wgChromaDefaultSeed' => $wgChromaDefaultSeed ?? $default,
			'wgChromaDefaultScheme' => $wgChromaDefaultScheme ?? $default,
			'wgChromaDefaultLayout' => $wgChromaDefaultLayout ?? $default,
			'wgChromaDefaultReadingMode' => $wgChromaDefaultReadingMode ?? $default,
			'wgChromaAllowUserColor' => $wgChromaAllowUserColor ?? $default,
			'wgChromaAllowUserLayout' => $wgChromaAllowUserLayout ?? $default,
			'wgChromaAllowUserReadingMode' => $wgChromaAllowUserReadingMode ?? $default,
		];
		return $map[$name] ?? $default;
	}
}
