<?php
/**
 * Homepage Template
 *
 * @author KJ Roelke
 * @since 1.0
 * @package ChoctawNation
 */

use ChoctawNation\Asset_Loader;
use ChoctawNation\Enqueue_Type;

$loader = new Asset_Loader( 'frontPage', Enqueue_Type::both, 'pages' );

get_header(); ?>
<main class="site-content">
	<div class="container my-5 py-5">
		<div class="row">
			<div class="col">
				<h1 class="text-center">Welcome to the Choctaw Nation Virtual HQ Tour</h1>
				<p class="text-center">Take a virtual tour of the Choctaw Nation Headquarters in Durant, Oklahoma. Explore the campus and learn about the history of the Choctaw Nation.</p>
				<div id="url" data-url="<?php echo get_template_directory_uri() . '/img/map.png'; ?>"></div>
				<div id="map"></div>
			</div>
		</div>
	</div>
</main>
<?php
get_footer();
