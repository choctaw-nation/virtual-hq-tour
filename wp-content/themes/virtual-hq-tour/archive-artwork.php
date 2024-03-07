<?php
/**
 * The Artwork Archive
 * Displays the Artwork Archive
 *
 * @package ChoctawNation
 */

get_header();
?>
<?php
if ( ! have_posts() ) :
	?>
<div class="alert alert-warning">
	<?php __( 'Sorry, no artwork was found.', 'cno' ); ?>
</div>
<?php else : ?>
<main class="container">
	<section id="artwork" class="row row-cols-auto row-cols-md-4 row-gap-4 justify-content-evenly my-5">
		<?php
		while ( have_posts() ) {
			the_post();
			get_template_part( 'template-parts/content', 'artwork-preview' );
		}
		?>
	</section>
</main>
<?php endif; ?>