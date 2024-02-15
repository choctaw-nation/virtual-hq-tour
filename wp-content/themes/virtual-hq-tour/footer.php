<?php
/**
 * Basic Footer Template
 *
 * @since 1.0
 * @package ChoctawNation
 */

?>

<footer class="footer bg-primary py-5 container-fluid gx-5 text-white text-center d-flex flex-column align-items-center">
	<div class="row">
		<?php
		if ( has_nav_menu( 'footer_menu' ) ) {
			wp_nav_menu(
				array(
					'theme_location'  => 'footer_menu',
					'menu_class'      => 'footer-nav list-unstyled navbar-nav flex-row',
					'container'       => 'nav',
					'container_class' => 'navbar',
				)
			);
		}
		?>
	</div>
	<div class="container">
		<div class="row">
			<div class="col-4">
				<a href="<?php echo esc_url( site_url() ); ?>" class="logo">
					<figure class="logo-img d-inline-block">
						<span aria-label="to Home Page">
							<?php echo bloginfo( 'name' ); ?>
						</span>
					</figure>
				</a>
				<div class="row">
					<div class="social-icons">
						<?php
						$socials = array(
							array(
								'icon_class' => 'fa-brands fa-facebook-f',
								'href'       => 'https://facebook.com/',
								'aria-label' => 'Follow Us on Facebook',
							),
							array(
								'icon_class' => 'fa-brands fa-instagram',
								'href'       => 'https://instagram.com',
								'aria-label' => 'Follow Us on Instagram',
							),
						);
						?>
						<?php foreach ( $socials as $social ) : ?>
						<a href="<?php echo $social['href']; ?>" class="social" target="_blank" rel="noopener noreferrer" aria-label="<?php echo $social['aria-label']; ?>">
							<i class="<?php echo "text-white fa-3x {$social['icon_class']}"; ?>"></i>
						</a>
						<?php endforeach; ?>
					</div>
				</div>
			</div>
			<div class="col"></div>
		</div>
		<div class="row my-5">
			<div id="copyright">
				<?php echo '&copy;&nbsp;' . gmdate( 'Y' ) . '&nbsp;Choctaw Nation of Oklahoma.'; ?>
			</div>
		</div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>

</html>
