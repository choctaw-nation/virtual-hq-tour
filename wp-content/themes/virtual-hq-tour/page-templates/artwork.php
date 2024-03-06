<?php
/**
 * Template Name: Artwork
 *
 * @package ChoctawNation
 */

get_header();
$row_class = 'row my-5 justify-content-center';
$col_class = 'col-12 col-md-9';
?>

<main class='container'>
	<section class="<?php echo $row_class; ?>">
		<div class="<?php echo $col_class; ?>">
			<h1 class='text-primary'><?php the_field( 'headline' ); ?></h1>
			<p class='fs-5'><?php the_field( 'subheadline' ); ?></p>
		</div>
	</section>
	<?php if ( have_rows( 'artwork' ) ) : ?>
	<section class="art-gallery">
		<?php
		while ( have_rows( 'artwork' ) ) :
			the_row();
			?>
		<div class="<?php echo $row_class; ?>">
			<div class="<?php echo $col_class; ?>">
				<h2>A piece of art</h2>
			</div>
		</div>
		<?php endwhile; ?>
	</section>
	<?php endif; ?>
</main>
<?php
get_footer();