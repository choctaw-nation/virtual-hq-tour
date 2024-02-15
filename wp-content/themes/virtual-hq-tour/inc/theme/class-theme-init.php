<?php
/**
 * Initializes the Theme
 *
 * @package ChoctawNation
 * @since 1.3
 */

namespace ChoctawNation;

/** Builds the Theme */
class Theme_Init {
	/** Constructor */
	public function __construct() {
		$this->load_required_files();
		$this->cno_set_environment();
		$this->disable_discussion();
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_cno_scripts' ) );
		add_action( 'after_setup_theme', array( $this, 'cno_theme_support' ) );
		add_action( 'init', array( $this, 'alter_post_types' ) );
	}

	/** Load required files. */
	private function load_required_files() {
		$base_path = get_template_directory() . '/inc';
		require_once $base_path . '/component-classes/class-cno-content-sections.php';
		require_once $base_path . '/theme/theme-functions.php';

		$acf_classes = array(
			'generator',
			'image',
			'hero',
		);
		foreach ( $acf_classes as $acf_class ) {
			require_once $base_path . '/acf/acf-classes/class-' . $acf_class . '.php';
		}
		require_once $base_path . '/acf/acf-fields/initial-acf-fields.php';

		$asset_loaders = array( 'enum-enqueue-type', 'class-asset-loader' );
		foreach ( $asset_loaders as $asset_loader ) {
			require_once $base_path . '/theme/asset-loader/' . $asset_loader . '.php';
		}

		$navwalkers = array( 'navwalker', 'mega-menu' );
		foreach ( $navwalkers as $navwalker ) {
			require_once $base_path . '/theme/navwalkers/class-' . $navwalker . '.php';
		}

		require_once $base_path . '/theme/class-allow-svg.php';
		$svg = new Allow_SVG();
	}

	/** Remove comments, pings and trackbacks support from posts types. */
	private function disable_discussion() {
		// Close comments on the front-end
		add_filter( 'comments_open', '__return_false', 20, 2 );
		add_filter( 'pings_open', '__return_false', 20, 2 );

		// Hide existing comments.
		add_filter( 'comments_array', '__return_empty_array', 10, 2 );

		// Remove comments page in menu.
		add_action(
			'admin_menu',
			function () {
				remove_menu_page( 'edit-comments.php' );
			}
		);

		// Remove comments links from admin bar.
		add_action(
			'init',
			function () {
				if ( is_admin_bar_showing() ) {
					remove_action( 'admin_bar_menu', 'wp_admin_bar_comments_menu', 60 );
				}
			}
		);
	}

	/** Sets an Environment Variable */
	private function cno_set_environment() {
		$server_name = $_SERVER['SERVER_NAME'];

		if ( false !== strpos( $server_name, '.local' ) ) {
			$_ENV['CNO_ENV'] = 'dev';
		} elseif ( false !== strpos( $server_name, 'wpengine' ) ) {
			$_ENV['CNO_ENV'] = 'stage';
		} else {
			$_ENV['CNO_ENV'] = 'prod';
		}
	}

	/**
	 * Adds scripts with the appropriate dependencies
	 */
	public function enqueue_cno_scripts() {
		wp_enqueue_style(
			'typekit',
			'https://use.typekit.net/jky5sek.css',
			array(),
			null // phpcs:ignore
		);

		$bootstrap = new Asset_Loader(
			'bootstrap',
			Enqueue_Type::both,
			'vendors',
			array(
				'scripts' => array(),
				'styles'  => array(),
			)
		);

		// $fontawesome = new Asset_Loader( 'fontawesome', Enqueue_Type::script, 'vendors' );
		// $fontawesome = new Asset_Loader( 'fontawesome', Enqueue_Type::style, 'vendors' );

		$global_scripts = new Asset_Loader(
			'global',
			Enqueue_Type::both,
			null,
			array(
				'scripts' => array( 'bootstrap' ),
				'styles'  => array( 'bootstrap' ),
			)
		);
		wp_localize_script( 'global', 'cnoSiteData', array( 'rootUrl' => home_url() ) );

		// style.css
		wp_enqueue_style(
			'main',
			get_stylesheet_uri(),
			array( 'global' ),
			wp_get_theme()->get( 'Version' )
		);

		$this->remove_wordpress_styles(
			array(
				'classic-theme-styles',
				'wp-block-library',
				'dashicons',
				'global-styles',
			)
		);

		if ( 'prod' === $_ENV['CNO_ENV'] ) {
			$this->load_google_tag_manager();
		}
	}

	/** Load Google Tag Manager in the Head */
	private function load_google_tag_manager() {
		wp_enqueue_script( 'google-tag-manager', '', array(), null, array( 'strategy' => 'async' ) );

		add_action(
			'wp_head',
			function () {
				// the function to load the GTM script
			}
		);

		add_action(
			'wp_body_open',
			function () {
				// the <noscript> tag
			}
		);
	}

	/**
	 * Provide an array of handles to dequeue.
	 *
	 * @param array $handles the script/style handles to dequeue.
	 */
	private function remove_wordpress_styles( array $handles ) {
		foreach ( $handles as $handle ) {
			wp_dequeue_style( $handle );
		}
	}

	/** Registers Theme Supports */
	public function cno_theme_support() {
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'title-tag' );

		register_nav_menus(
			array(
				'primary_menu' => __( 'Primary Menu', 'cno' ),
				'footer_menu'  => __( 'Footer Menu', 'cno' ),
			)
		);
	}

	/** Remove post type support from posts types. */
	public function alter_post_types() {
		$post_types = array( 'post', 'page' );
		foreach ( $post_types as $post_type ) {
			$this->disable_post_type_support( $post_type );
		}
	}

	/** Disable post-type-supports from posts
	 *
	 * @param string $post_type the post type to remove supports from.
	 */
	private function disable_post_type_support( string $post_type ) {
		$supports = array( 'editor', 'comments', 'trackbacks', 'revisions', 'author' );
		foreach ( $supports as $support ) {
			if ( post_type_supports( $post_type, $support ) ) {
				remove_post_type_support( $post_type, $support );
			}
		}
	}
}