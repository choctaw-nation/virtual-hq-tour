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

get_header();
?>
<main class="site-content">
	<div class="container">
		<section class="row justify-content-center my-5" id='the-map'>
			<div class="col-12 col-md-9">
				<h1 class='fs-2 text-primary'>Using this Map</h1>
				<p class='fs-5'>Pinch/Scroll to zoom, click/tap and hold to move the map. Click/tap a zone or marker to watch the video tour. You can also control layers with the control in
					the top-right of the map.</p>
			</div>
			<div class="col-12 col-md-9 text-center position-relative">
				<?php get_template_part( 'template-parts/map', 'map' ); ?>
			</div>
		</section>
	</div>
</main>
<?php
get_template_part( 'template-parts/modal', 'welcome-video' );
get_template_part( 'template-parts/modal', 'video' );
get_footer();
