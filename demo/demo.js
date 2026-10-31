/* Prototype-only helpers: sync the demo toolbar with the real state. */
( function () {
	'use strict';
	var root = document.documentElement;
	var state = document.getElementById( 'demo-state' );

	function refresh() {
		if ( state ) {
			state.textContent =
				'theme=' + ( root.getAttribute( 'data-chroma-theme' ) || 'auto' ) +
				' · layout=' + ( root.getAttribute( 'data-chroma-layout' ) || 'app' ) +
				' · reading=' + ( root.getAttribute( 'data-chroma-reading' ) || 'off' );
		}
	}

	function forward( demoId, targetId ) {
		var demo = document.getElementById( demoId );
		var target = document.getElementById( targetId );
		if ( demo && target ) {
			demo.addEventListener( 'click', function () {
				target.click();
				window.setTimeout( refresh, 0 );
			} );
		}
	}

	forward( 'demo-theme', 'chroma-theme-toggle' );
	forward( 'demo-layout', 'chroma-layout-toggle' );
	forward( 'demo-reading', 'chroma-reading-toggle' );
	new MutationObserver( refresh ).observe( root, { attributes: true } );
	refresh();
}() );
