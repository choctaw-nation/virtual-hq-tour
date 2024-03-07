<?php
/**
 * The Artwork Archive
 * Displays the Artwork Archive
 *
 * @package ChoctawNation
 */

use ChoctawNation\Asset_Loader;
use ChoctawNation\Enqueue_Type;

new Asset_Loader( 'cnoMasonry', Enqueue_Type::script, 'modules' );
$all_artwork = new WP_Query(
	array(
		'post_type'      => 'artwork',
		'posts_per_page' => -1,
	)
);
get_header();
?>
<?php
if ( ! $all_artwork->have_posts() ) :
	?>
<div class="alert alert-warning">
	<?php __( 'Sorry, no artwork was found.', 'cno' ); ?>
</div>
<?php else : ?>
<main class="container py-4">
	<section id="artwork" class='my-5'>
		<?php
		while ( $all_artwork->have_posts() ) {
			$all_artwork->the_post();
			get_template_part( 'template-parts/content', 'artwork-preview' );
		}
		?>
	</section>
</main>
<?php
endif;
wp_reset_postdata();
get_footer();