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
				<h2 class='fs-3'>Using this Map</h2>
				<p>Pinch/Scroll to zoom, click/tap and hold to move the map. Click/tap a zone or marker to watch the video tour.</p>
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
				echo '<ul>';
				foreach ( $sections as $section ) {
					echo "<li>{$section['label']}: {$section['color']}</li>";
				}
				echo '</ul>';
				?>
			</div>
		</div>
		<div class="row justify-content-center my-5">
			<div class="col-12 col-md-9 text-center my-3">
				<?php get_template_part( 'template-parts/content', 'map' ); ?>
			</div>
		</div>
		<div class="row justify-content-center my-5">
			<div class="col-12 col-md-9">
				<h2 class='text-primary fs-3'>Additional Videos</h2>
			</div>
			<?php
			$additional_videos = array(
				array(
					'title' => 'Above the Third Floor',
					'id'    => '915707711',
				),
				array(
					'title' => 'Yakoke and Chi Pisa La Chike',
					'id'    => '915707281',
				),
			);
			foreach ( $additional_videos as $video ) {
				echo "<div class='col-12 col-md-9 mb-4'>
					<h3 class='fs-4'>{$video['title']}</h3>
					<lite-vimeo videoid='{$video['id']}' videotitle='{$video['title']}'></lite-vimeo>
				</div>";
			}
			?>
		</div>
	</div>
</main>
<?php
get_template_part( 'template-parts/content', 'video-modal' );
get_footer();