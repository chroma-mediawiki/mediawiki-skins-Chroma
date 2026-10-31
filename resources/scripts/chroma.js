/**
 * Chroma progressive enhancement: theme / layout / reading toggles,
 * snackbar helper and a TOC scroll-spy. Server-side preferences are rendered
 * as data-* attributes on <body>; toggles update both <html> and <body> so
 * the static demo and MediaWiki share the same CSS selectors.
 */
( function () {
	'use strict';

	var html = document.documentElement;
	var body = document.body;
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
		return ( body && body.getAttribute( attr ) ) ||
			html.getAttribute( attr ) ||
			read( attr ) ||
			fallback;
	}

	function apply( attr, value ) {
		html.setAttribute( attr, value );
		if ( body ) {
			body.setAttribute( attr, value );
		}
		write( attr, value );
	}

	function notify( message ) {
		snackbar( message );
	}

	function cycleTheme() {
		var order = [ 'auto', 'light', 'dark' ];
		var current = get( 'data-chroma-theme', 'auto' );
		var next = order[ ( order.indexOf( current ) + 1 ) % order.length ];
		apply( 'data-chroma-theme', next );
		notify( { auto: '配色：跟随系统', light: '配色：浅色', dark: '配色：深色' }[ next ] );
		return next;
	}

	function toggleLayout() {
		var current = get( 'data-chroma-layout', 'app' );
		var next = current === 'app' ? 'reading' : 'app';
		apply( 'data-chroma-layout', next );
		notify( next === 'reading' ? '已切换到阅读布局' : '已切换到应用布局' );
		return next;
	}

	function toggleReading() {
		var current = get( 'data-chroma-reading', 'off' );
		var next = current === 'on' ? 'off' : 'on';
		apply( 'data-chroma-reading', next );
		notify( next === 'on' ? '阅读模式已开启' : '阅读模式已关闭' );
		return next;
	}

	/**
	 * Display a Material-style snackbar.
	 *
	 * @param {string|{label?: string, onClick?: Function}} message
	 * @param {{label?: string, onClick?: Function}} [action]
	 */
	function snackbar( message, action ) {
		var existing = document.querySelector( '.chroma-snackbar' );
		if ( existing ) {
			existing.remove();
		}
		var el = document.createElement( 'div' );
		el.className = 'chroma-snackbar';
		el.setAttribute( 'role', 'status' );
		var text = document.createElement( 'span' );
		if ( typeof message === 'string' ) {
			text.textContent = message;
		} else {
			return;
		}
		el.appendChild( text );
		if ( action && action.label ) {
			var button = document.createElement( 'button' );
			button.className = 'chroma-snackbar__action';
			button.type = 'button';
			button.textContent = action.label;
			button.addEventListener( 'click', function () {
				if ( action.onClick ) {
					action.onClick();
				}
				el.remove();
			} );
			el.appendChild( button );
		}
		document.body.appendChild( el );
		window.setTimeout( function () {
			el.remove();
		}, 3200 );
	}

	window.chromaSnackbar = snackbar;

	function bind( id, handler ) {
		var el = document.getElementById( id );
		if ( el ) {
			el.addEventListener( 'click', function ( event ) {
				event.preventDefault();
				handler();
			} );
		}
	}

	function initScrollSpy() {
		var links = Array.prototype.slice.call( document.querySelectorAll( '.chroma-toc a[href^="#"]' ) );
		if ( !links.length || !( 'IntersectionObserver' in window ) ) {
			return;
		}
		var byId = {};
		links.forEach( function ( link ) {
			byId[ link.getAttribute( 'href' ).slice( 1 ) ] = link;
		} );
		var headings = Object.keys( byId )
			.map( function ( id ) { return document.getElementById( id ); } )
			.filter( Boolean );
		if ( !headings.length ) {
			return;
		}
		var visible = {};
		var observer = new IntersectionObserver( function ( entries ) {
			entries.forEach( function ( entry ) {
				visible[ entry.target.id ] = entry.isIntersecting;
			} );
			var active = headings.filter( function ( h ) { return visible[ h.id ]; } )[ 0 ];
			if ( !active ) {
				return;
			}
			links.forEach( function ( link ) {
				var isActive = link === byId[ active.id ];
				link.classList.toggle( 'is-active', isActive );
				if ( isActive ) {
					link.setAttribute( 'aria-current', 'true' );
				} else {
					link.removeAttribute( 'aria-current' );
				}
			} );
		}, { rootMargin: '-96px 0px -62% 0px' } );
		headings.forEach( function ( h ) { observer.observe( h ); } );
	}

	function init() {
		var params = new URLSearchParams( window.location.search );
		// Demo-friendly aliases first; ?chroma-* wins if both are present.
		[ 'theme', 'layout', 'reading' ].forEach( function ( key ) {
			var value = params.get( key ) || params.get( 'chroma-' + key );
			if ( value ) {
				html.setAttribute( 'data-chroma-' + key, value );
				if ( body ) {
					body.setAttribute( 'data-chroma-' + key, value );
				}
			}
		} );
		if ( params.has( 'clean' ) && body ) {
			body.classList.add( 'demo-clean' );
		}

		// Only restore anonymous choices when the server did not render a value.
		Object.keys( STORAGE ).forEach( function ( key ) {
			var attr = 'data-chroma-' + key;
			var stored = read( STORAGE[ key ] );
			if ( stored && !html.getAttribute( attr ) && !( body && body.getAttribute( attr ) ) ) {
				html.setAttribute( attr, stored );
			}
		} );

		bind( 'chroma-theme-toggle', cycleTheme );
		bind( 'chroma-layout-toggle', toggleLayout );
		bind( 'chroma-reading-toggle', toggleReading );

		var drawerToggle = document.getElementById( 'chroma-drawer-toggle' );
		if ( drawerToggle ) {
			drawerToggle.addEventListener( 'click', function () {
				var open = html.getAttribute( 'data-chroma-drawer' ) === 'open';
				apply( 'data-chroma-drawer', open ? 'closed' : 'open' );
				drawerToggle.setAttribute( 'aria-expanded', open ? 'false' : 'true' );
			} );
		}

		initScrollSpy();
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
}() );
