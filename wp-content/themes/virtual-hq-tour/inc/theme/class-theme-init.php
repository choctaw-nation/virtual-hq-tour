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
		add_action( 'wp_head', array( $this, 'load_favicons' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_cno_scripts' ) );
		add_action( 'after_setup_theme', array( $this, 'cno_theme_support' ) );
		add_action( 'init', array( $this, 'alter_post_types' ) );
		add_action( 'init', array( $this, 'disable_plugins_per_environment' ) );
		add_filter( 'allowed_redirect_hosts', array( $this, 'add_allowed_redirect_hosts' ) );
		add_filter( 'wp_speculation_rules_configuration', array( $this, 'handle_speculative_loading' ) );
		add_filter( 'auto_update_plugin', array( $this, 'handle_auto_update_plugin' ) );
		add_filter( 'wp_resource_hints', array( $this, 'add_resource_hints' ), 10, 2 );
		add_filter( 'style_loader_tag', array( $this, 'preload_stylesheets' ), 10, 3 );
	}

	/**
	 * Load the favicons
	 */
	public function load_favicons() {
		$href = get_stylesheet_directory_uri() . '/img/favicons';
		echo "<link rel='apple-touch-icon' sizes='180x180' href='{$href}/apple-touch-icon.png'><link rel='icon' type'='image/png' sizes='192x192' href='{$href}/android-chrome-192x192.png'><link rel='icon' type'='image/png' sizes='512x512' href='{$href}/android-chrome-512x512.png'><link rel='icon' type='image/png' sizes='32x32' href='{$href}/favicon-32x32.png'><link rel='icon' type='image/png' sizes='16x16' href='{$href}/favicon-16x16.png'><link rel='mask-icon' href='{$href}/safari-pinned-tab.svg' color='#000000'>";
	}

	/** Load required files. */
	private function load_required_files() {
		$base_path = get_template_directory() . '/inc';
		require_once $base_path . '/theme/theme-functions.php';

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

		new Asset_Loader(
			'bootstrap',
			Enqueue_Type::both,
			'vendors',
			array(
				'scripts' => array(),
				'styles'  => array(),
			)
		);

		new Asset_Loader(
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

		new Asset_Loader( 'lite-vimeo', Enqueue_Type::script, 'vendors', array( 'global' ) );

		$this->remove_wordpress_styles(
			array(
				'classic-theme-styles',
				'wp-block-library',
				'dashicons',
				'global-styles',
			)
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

	/**
	 * Adds allowed redirect hosts for `wp_safe_redirect`
	 *
	 * @param array $hosts Current allowed hosts.
	 * @return array
	 */
	public function add_allowed_redirect_hosts( array $hosts ): array {
		$allowed_hosts = array(
			'choctawnation.com',
			'www.choctawnation.com',
		);
		return array_merge( $hosts, $allowed_hosts );
	}

	/**
	 * Handle speculative loading
	 *
	 * @since WP 6.8.0
	 * @link https://make.wordpress.org/core/2025/03/06/speculative-loading-in-6-8/
	 *
	 * @param ?array $config the configuration array. Null if user is logged-in.
	 * @return ?array The new config file, or null
	 */
	public function handle_speculative_loading( ?array $config ): ?array {
		if ( is_array( $config ) ) {
			$config['mode']      = 'auto';
			$config['eagerness'] = 'moderate';
		}
		return $config;
	}

	/**
	 * Disable certain plugins based on the environment type.
	 */
	public function disable_plugins_per_environment() {
		$env = wp_get_environment_type();
		if ( 'production' === $env ) {
			return;
		}

		$plugins_to_disable = array(
			'wordfence/wordfence.php'                 => array( 'local', 'development', 'staging' ),
			'wp-mail-smtp-pro/wp_mail_smtp.php'       => array( 'local', 'development', 'staging' ),
			'google-site-kit/google-site-kit.php'     => array( 'local', 'development', 'staging' ),
			'autoupdater/autoupdater.php'             => array( 'local', 'development', 'staging' ),
			'autoptimize/autoptimize.php'             => array( 'local', 'development' ),
			'wordpress-seo/wp-seo.php'                => array( 'local', 'development' ),
			'yoast-test-helper/yoast-test-helper.php' => array( 'local', 'development' ),
		);

		foreach ( $plugins_to_disable as $plugin => $environments ) {
			if ( in_array( $env, $environments, true ) ) {
				if ( is_plugin_active( $plugin ) ) {
					deactivate_plugins( $plugin );
				}
			}
		}
	}

	/**
	 * Handle automatic plugin updates based on environment.
	 *
	 * @param bool $update Whether to update the plugin.
	 * @return bool
	 */
	public function handle_auto_update_plugin( $update ): bool {
		if ( 'production' === wp_get_environment_type() ) {
			return $update;
		}
		return true;
	}

	/**
	 * Add resource hints for Typekit
	 *
	 * @param array  $hints         The array of resource hints.
	 * @param string $relation_type The relation type the hints are for.
	 * @return array The modified array of resource hints.
	 */
	public function add_resource_hints( array $hints, string $relation_type ) {
		if ( 'preconnect' === $relation_type ) {
			$hints[] = array(
				'href'        => 'https://use.typekit.net',
				'crossorigin' => 'anonymous',
			);
		}
		return $hints;
	}

	/**
	 * Preload specific stylesheets
	 *
	 * @param string $html   The link tag HTML.
	 * @param string $handle The style handle.
	 * @param string $href   The stylesheet URL.
	 * @return string The modified link tag HTML.
	 */
	public function preload_stylesheets( string $html, string $handle, string $href ): string {
		$preload_handles = array(
			'typekit'   => 'external',
			'bootstrap' => null,
		);
		if ( in_array( $handle, array_keys( $preload_handles ), true ) ) {
			$is_crossorigin = 'external' === $preload_handles[ $handle ];
			// Add a preload link before the stylesheet link.
			$preload = sprintf(
				"<link rel='preload' as='style' href='%s' %s />\n",
				$href,
				$is_crossorigin ? 'crossorigin="anonymous"' : ''
			);
			// Add crossorigin attribute if needed.
			if ( $is_crossorigin ) {
				$html = str_replace( "/>\n", ' crossorigin="anonymous" />' . "\n", $html );
			}
			$html = $preload . $html;
		}
		return $html;
	}
}
