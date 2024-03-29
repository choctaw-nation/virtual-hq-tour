<?php
/**
 * Basic Header Template
 *
 * @package ChoctawNation
 */

?>

<!DOCTYPE html>
<html lang="<?php bloginfo( 'language' ); ?>">

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php wp_head(); ?>
</head>

<body <?php body_class( 'w-100 overflow-x-hidden' ); ?>>
	<?php wp_body_open(); ?>
	<header class="d-flex text-bg-primary" id="site-header">
		<div class="container">
			<nav class="navbar navbar-expand-lg py-0">
				<a class="navbar-brand d-flex align-items-center flex-grow-0 my-2 align-items-md-center" href="<?php echo esc_url( site_url() ); ?>" class="logo" aria-label="to Home Page">
					<img src="<?php echo get_template_directory_uri() . '/img/the-great-seal-min.svg'; ?>" alt="The Great Seal of the Choctaw Nation" class='d-inline-block logo' />
					<div class="site-title ms-2 fw-bold">
						<span class="site-title--line-2">Virtual <br class='d-block d-sm-none' />Headquarters<br class='d-block d-sm-none' /> Tour</span>
					</div>
				</a>
				<?php get_template_part( 'template-parts/header/content', 'offcanvas' ); ?>
			</nav>
		</div>
	</header>
