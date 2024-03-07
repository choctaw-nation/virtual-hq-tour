<?php
/**
 * The Archive display for an Artist (taxonomical term)
 *
 * @package ChoctawNation
 */

get_header();
?>

<article class="container">
	<section class="row my-5">
		<div class="col">
			<?php the_archive_title( '<h1 class="entry-title">', '</h1>' ); ?>
			<?php term_description(); ?>
		</div>
	</section>
	<?php
	$artwork = new WP_Query(
		array(
			'post_type'      => 'artwork',
			'posts_per_page' => -1,
			'tax_query'      => array(
				array(
					'taxonomy' => 'artist',
					'field'    => 'slug',
					'terms'    => get_queried_object()->slug,
				),
			),
		)
	);
	if ( ! $artwork->have_posts() ) :
		?>
	<div class="alert alert-warning">
		<?php __( 'Sorry, no artwork was found.', 'cno' ); ?>
	</div>
	<?php else : ?>
	<section id="artwork" class="row row-cols-1 row-cols-md-3 row-gap-4 my-5">
		<?php
		while ( $artwork->have_posts() ) {
			$artwork->the_post();
			get_template_part( 'template-parts/content', 'artwork-preview', array( 'with_artist' => false ) );
		}
		?>
	</section>
	<?php endif; ?>
</article>