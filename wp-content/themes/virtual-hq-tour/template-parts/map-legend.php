<?php
/**
 * A static map legend
 *
 * @package ChoctawNation
 */

$sections = array(
	array(
		'label'   => 'First Floor',
		'markers' => array(
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
				'label' => 'Roots Café',
				'color' => 'Aqua Marker',
			),
		),
	),
	array(
		'label'   => 'Outdoors',
		'markers' => array(
			array(
				'label' => 'East Courtyard',
				'color' => 'Orange Zone',
			),
			array(
				'label' => 'West Courtyard',
				'color' => 'Gold Zone',
			),
		),
	),
	array(
		'label'   => 'Second Floor',
		'markers' => array(
			array(
				'label' => 'Stairs to the Second Floor',
				'color' => 'Aqua Marker',
			),
		),
	),
);
?>
<section class="row justify-content-center my-5" id='map-key'>
	<div class="col-12 col-md-9">
		<h2 class='text-primary fs-3'>Map Key</h2>
		<div class="row row-cols-auto">
			<?php foreach ( $sections as $section ) : ?>
			<div class="col-auto">
				<h3 class='fs-4'><?php echo $section['label']; ?></h3>
				<ul>
					<?php
					foreach ( $section['markers'] as $marker ) {
						echo "<li><b>{$marker['label']}:</b> {$marker['color']}</li>";
					}
					?>
				</ul>
			</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>
