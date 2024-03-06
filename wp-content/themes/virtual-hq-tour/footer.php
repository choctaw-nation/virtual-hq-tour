<?php
/**
 * Basic Footer Template
 *
 * @since 1.0
 * @package ChoctawNation
 */

?>
<footer class="footer bg-primary py-5 container-fluid gx-5 text-white text-center d-flex flex-column align-items-center">
	<div class="container">
		<div class="row">
			<div id="copyright">
				<?php echo '&copy;&nbsp;' . gmdate( 'Y' ) . '&nbsp;Choctaw Nation of Oklahoma.'; ?>
			</div>
		</div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>

</html>