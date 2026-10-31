/**
 * Chroma progressive enhancement.
 * Theme, layout and reading-mode switching. Server-side preferences are
 * applied as data-* attributes on <html>; this script only adds quick toggles
 * and remembers choices for anonymous users in localStorage.
 */
( function () {
	'use strict';

	var root = document.documentElement;
	var STORAGE = {
		theme: 'chroma-theme',
		layout: 'chroma-layout',
		reading: 'chroma-reading'
	};

	function read( key ) {
		try {
			return window.localStorage.getItem( key );
		} catch ( e ) {
			return null;
		}
	}

	function write( key, value ) {
		try {
			window.localStorage.setItem( key, value );
		} catch ( e ) {
			// Ignore private-mode / quota errors.
		}
	}

	function get( attr, fallback ) {
		return root.getAttribute( attr ) || read( attr ) || fallback;
	}

	function apply( attr, value ) {
		root.setAttribute( attr, value );
		write( attr, value );
	}

	function cycleTheme() {
		var current = get( 'data-chroma-theme', 'auto' );
		var order = [ 'auto', 'light', 'dark' ];
		var next = order[ ( order.indexOf( current ) + 1 ) % order.length ];
		apply( 'data-chroma-theme', next );
		return next;
	}

	function toggleLayout() {
		var current = get( 'data-chroma-layout', 'app' );
		var next = current === 'app' ? 'reading' : 'app';
		apply( 'data-chroma-layout', next );
		return next;
	}

	function toggleReading() {
		var current = get( 'data-chroma-reading', 'off' );
		var next = current === 'on' ? 'off' : 'on';
		apply( 'data-chroma-reading', next );
		return next;
	}

	function bind( id, handler ) {
		var el = document.getElementById( id );
		if ( el ) {
			el.addEventListener( 'click', function ( event ) {
				event.preventDefault();
				handler();
			} );
		}
	}

	function init() {
		// Apply stored preferences before first paint where possible.
		var theme = read( STORAGE.theme );
		if ( theme ) {
			root.setAttribute( 'data-chroma-theme', theme );
		}
		var layout = read( STORAGE.layout );
		if ( layout ) {
			root.setAttribute( 'data-chroma-layout', layout );
		}
		var reading = read( STORAGE.reading );
		if ( reading ) {
			root.setAttribute( 'data-chroma-reading', reading );
		}

		bind( 'chroma-theme-toggle', cycleTheme );
		bind( 'chroma-layout-toggle', toggleLayout );
		bind( 'chroma-reading-toggle', toggleReading );

		var drawerToggle = document.getElementById( 'chroma-drawer-toggle' );
		if ( drawerToggle ) {
			drawerToggle.addEventListener( 'click', function () {
				var open = root.getAttribute( 'data-chroma-drawer' ) === 'open';
				root.setAttribute( 'data-chroma-drawer', open ? 'closed' : 'open' );
				drawerToggle.setAttribute( 'aria-expanded', open ? 'false' : 'true' );
			} );
		}
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
}() );
