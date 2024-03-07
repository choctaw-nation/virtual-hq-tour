<?php
/**
 * Artwork Preview
 * Displays the artwork in the context of a loop
 *
 * @package ChoctawNation
 */

$thumbnail_id = get_post_thumbnail_id();
$with_artist  = isset( $args['with_artist'] ) ? $args['with_artist'] : true;
?>
<div class="col">
	<figure class='ratio ratio-4x3'>
		<?php
		echo wp_get_attachment_image(
			$thumbnail_id,
			'full',
			false,
			array(
				'class'   => 'object-fit-cover',
				'loading' => 'lazy',
			)
		);
		?>
	</figure>
	<?php if ( $with_artist ) : ?>
	<figcaption>
		<?php
		$artists      = array();
		$artist_terms = get_the_terms( $post->ID, 'artist' );
		foreach ( $artist_terms as $artist ) {
			$artist_name = $artist->name;
			$artist_link = get_term_link( $artist );
			$artist_link = "<a href='$artist_link' class='text-decoration-underline'>$artist_name</a>";
			$artists[]   = $artist_link;
		}
		$artists = implode( ', ', $artists );
		?>
		<p>Artwork by: <?php echo $artists; ?></p>
	</figcaption>
	<?php endif; ?>
</div>