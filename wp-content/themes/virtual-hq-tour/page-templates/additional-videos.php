<?php
/**
 * Template Name: Additional Videos
 *
 * @package ChoctawNation
 */

get_header();
$row_class = 'row my-5 justify-content-center';
$col_class = 'col-12 col-md-9';
?>

<main class='container my-5'>
	<section class="row">
		<div class="col">
			<h1 class='text-primary'>Additional Videos</h1>
		</div>
	</section>
	<?php if ( have_rows( 'additional_videos' ) ) : ?>
	<section class="row row-cols-1 row-cols-md-2 row-cols-xl-3 my-5 row-gap-5">
		<?php
		while ( have_rows( 'additional_videos' ) ) :
			the_row();
			?>
		<div class="col d-flex flex-column">
			<?php $video_title = esc_textarea( get_sub_field( 'video_title' ) ); ?>
			<div class="ratio ratio-16x9 mb-2">
				<lite-vimeo videoid="<?php the_sub_field( 'video' ); ?>" videotitle="<?php echo $video_title; ?>"></lite-vimeo>
			</div>
			<h2 class='fs-6 fw-normal font-body'><?php echo $video_title; ?></h2>
		</div>
		<?php endwhile; ?>
	</section>
	<?php endif; ?>
</main>
<?php
get_footer();
