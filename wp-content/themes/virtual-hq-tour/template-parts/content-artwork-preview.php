<?php
/**
 * Artwork Preview
 * Displays the artwork in the context of a loop
 *
 * @package ChoctawNation
 */

$thumbnail_id = get_post_thumbnail_id();
?>
<div class="col">
	<figure class='ratio ratio-4x3'>
		<?php
		echo wp_get_attachment_image(
			$thumbnail_id,
			'full',
			false,
			array(
				'class'   => 'object-fit-cover w-100',
				'loading' => 'lazy',
			)
		);
		?>
	</figure>
	<figcaption>
		<?php the_post_thumbnail_caption(); ?>
	</figcaption>
</div>