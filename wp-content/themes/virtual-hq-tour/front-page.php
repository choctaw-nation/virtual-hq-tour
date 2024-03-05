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
	<div class="container">
		<div class="row justify-content-center my-5 py-5">
			<div class="col-9 text-center">
				<h1 class='fs-2'>Welcome to the Choctaw Nation Virtual HQ Tour</h1>
				<p class='fs-5'>Take a virtual tour of the Choctaw Nation Headquarters in Durant, Oklahoma. Explore the campus and learn about the history of the Choctaw Nation.</p>
			</div>
		</div>
		<div class="row justify-content-center my-5">
			<div class="col-12 col-md-9">
				<div class="ratio ratio-16x9" id='welcome-video'></div>
			</div>
		</div>
		<div class="row justify-content-center my-5">
			<div class="col-12 col-md-9">
				<h2>Using this Map</h2>
				<p class="fs-5">Pinch/Scroll to zoom, click/tap and hold to move the map. Click/tap a zone or marker to watch the video tour.</p>
				<?php
				$sections = array(
					array(
						'label' => 'First Floor West',
						'color' => 'Red Zone',
					),
					array(
						'label' => 'Main Lobby',
						'color' => 'Green Zone',
					),
					array(
						'label' => 'Chief\'s Office',
						'color' => 'Purple Marker',
					),
					array(
						'label' => 'Hall of Chiefs and Code Talkers',
						'color' => 'Aqua Marker',
					),
					array(
						'label' => 'East Corridor',
						'color' => 'Aqua Marker',
					),
					array(
						'label' => 'East Courtyard',
						'color' => 'Orange Zone',
					),
				);
				?>
				<ul class="fs-5">
					<?php
					foreach ( $sections as $section ) {
						echo "<li>{$section['label']}: {$section['color']}</li>";
					}
					?>
				</ul>
			</div>
		</div>
		<div class="row justify-content-center my-5 py-5">
			<div class="col-10 col-xl-12 text-center my-3">
				<?php get_template_part( 'template-parts/content', 'map' ); ?>
			</div>
		</div>
		<div class="row justify-content-center my-5">
			<div class="col-10 col-xl-12">
				<h2 class='text-primary'>Additional Videos</h2>
			</div>
			<div class="col-10 col-xl-12">
				<h3>Above the Third Floor</h3>
				<lite-vimeo videoid='915707711' videotitle='Above the Third Floor'></lite-vimeo>

			</div>
			<div class="col-10 col-xl-12 my-5">
				<h3>Yakoke and Chi Pisa La Chike</h3>
				<lite-vimeo videoid='915707281' videotitle='Yakoke and Chi Pisa La Chike from Chief Batton'></lite-vimeo>

			</div>
		</div>
	</div>
</main>
<div class="modal fade" id="videoModal" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="videoModalLabel"></h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="ratio ratio-16x9" id='modal-video'></div>
			</div>
			<div class="modal-footer">
				<div class="btn btn-primary" data-bs-dismiss="modal">Close Modal</div>
			</div>
		</div>
	</div>
</div>
<?php
get_footer();