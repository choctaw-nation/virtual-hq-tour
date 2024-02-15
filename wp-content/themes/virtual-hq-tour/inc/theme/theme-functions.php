<?php
/**
 * The global helper functions to use
 *
 * @since 1.3
 * @package ChoctawNation
 */

/**
 * Enqueues the page style.
 *
 * @param string $id The id you set in webpack.config.js.
 * @param array  $deps Optional array of dependencies.
 */
function cno_enqueue_page_style( string $id, array $deps = array( 'global' ) ) {
	$asset_file = get_stylesheet_directory() . "/dist/pages/{$id}.asset.php";
	if ( file_exists( $asset_file ) ) {
		$asset      = require $asset_file;
		$total_deps = array_unique( array_merge( $deps, array( 'global' ) ) );
		wp_enqueue_style(
			$id,
			get_stylesheet_directory_uri() . "/dist/pages/{$id}.css",
			$total_deps,
			$asset['version'],
		);

	} else {
		wp_enqueue_style(
			$id,
			get_stylesheet_directory_uri() . "/dist/pages/{$id}.css",
			$deps,
			filemtime( get_stylesheet_directory() . "/dist/pages/{$id}.css" )
		);
	}
}

/**
 * Enqueues the page script.
 *
 * @param string $id The id you set in webpack.config.js.
 * @param array  $deps Optional array of dependencies.
 */
function cno_enqueue_page_script( string $id, array $deps = array( 'global' ) ) {
	$asset_file = get_stylesheet_directory() . "/dist/pages/{$id}.asset.php";

	if ( file_exists( $asset_file ) ) {
		$asset      = require $asset_file;
		$total_deps = array_merge( $asset['dependencies'], $deps, array( 'global' ) );
		wp_enqueue_script(
			$id,
			get_stylesheet_directory_uri() . "/dist/pages/{$id}.js",
			$total_deps,
			$asset['version'],
			array( 'strategy' => 'defer' )
		);
	} else {
		wp_enqueue_script(
			$id,
			get_stylesheet_directory_uri() . "/dist/pages/{$id}.js",
			$deps,
			filemtime( get_stylesheet_directory() . "/dist/pages/{$id}.js" ),
			array( 'strategy' => 'defer' )
		);
	}
}

/**
 * Enqueues both the page style and script.
 *
 * @param string $id The id you set in webpack.config.js.
 * @param array  $deps Associative array of dependencies for styles and scripts.
 */
function cno_enqueue_page_assets( string $id, array $deps = array() ) {
	$default_deps = array(
		'styles'  => array( 'global' ),
		'scripts' => array( 'global' ),
	);

	$deps = wp_parse_args( $deps, $default_deps );

	cno_enqueue_page_style( $id, $deps['styles'] );
	cno_enqueue_page_script( $id, $deps['scripts'] );
}

/** Sets Yoast to bottom of Custom Fields */
add_filter(
	'wpseo_metabox_prio',
	function (): string {
		return 'low';
	}
);
