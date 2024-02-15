<?php
/**
 * The Hero Section
 *
 * @package ChoctawNation
 * @since 1.9
 */

use ChoctawNation\ACF\Hero;

$hero = new Hero( $args['id'], get_field( 'hero' ) );

$section_attributes = '';
if ( $hero->has_background_image ) {
	$section_attributes .= 'style="background-image:url(' . $hero->get_the_image_src() . ');background-position:center;background-repeat:no-repeat;background-size:cover;max-width:192rem"';
}
$section_attributes .= ' class="hero py-5' . ( $hero->has_background_image ? ' text-white' : '' ) . '"';
?>

<section <?php echo $section_attributes; ?>>
	<div class="container">
		<div class="row">
			<div class="col">
				<h1 class="hero__headline text-white">
					<?php $hero->the_headline(); ?>
				</h1>
				<?php
				if ( $hero->has_subheadline() ) {
					echo '<p class="hero__subheadline">' . $hero->get_the_subheadline() . '</p>';
				}
				if ( $hero->has_cta ) {
					$hero->the_cta( 'hero__btn btn btn-primary' );
				}
				?>
			</div>
		</div>
	</div>
</section>