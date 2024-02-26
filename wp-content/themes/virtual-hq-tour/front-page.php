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

$loader = new Asset_Loader( 'map', Enqueue_Type::both, 'pages' );

get_header(); ?>
<main class="site-content">
	<div class="container-fluid">
		<div class="row justify-content-center my-5 py-5">
			<div class="col-9 text-center">
				<h1 class='fs-2'>Welcome to the Choctaw Nation Virtual HQ Tour</h1>
				<p class='fs-5'>Take a virtual tour of the Choctaw Nation Headquarters in Durant, Oklahoma. Explore the campus and learn about the history of the Choctaw Nation.</p>
			</div>
			<div class="col-9">
				<div class="ratio ratio-16x9" id='welcome-video'></div>
			</div>
			<div class="col-12 text-center my-3">
				<?php get_template_part( 'template-parts/content', 'map' ); ?>
			</div>
		</div>
	</div>
</main>
<?php
get_footer();
