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

<main class='container'>
	<section class="<?php echo $row_class; ?>">
		<div class="<?php echo $col_class; ?>">
			<h1 class='text-primary'>Additional Videos</h1>
		</div>
	</section>
	<?php if ( have_rows( 'additional_videos' ) ) : ?>
	<section class="videos">
		<?php
		while ( have_rows( 'additional_videos' ) ) :
			the_row();
			?>
		<div class="<?php echo $row_class; ?>">
			<div class="<?php echo $col_class; ?>">
				<?php $video_title = esc_textarea( get_sub_field( 'video_title' ) ); ?>
				<h2><?php echo $video_title; ?></h2>
				<div class="ratio ratio-16x9">
					<lite-vimeo videoid="<?php the_sub_field( 'video' ); ?>" videotitle="<?php echo $video_title; ?>"></lite-vimeo>
				</div>
			</div>
		</div>
		<?php endwhile; ?>
	</section>
	<?php endif; ?>
</main>
<?php
get_footer();