<?php
/**
 * Homepage Template
 *
 * @author KJ Roelke
 * @since 1.0
 * @package ChoctawNation
 */

use ChoctawNation\Asset_Loader;
use ChoctawNation\Enqueue_Type;

$loader = new Asset_Loader( 'map', Enqueue_Type::both, 'pages' );

get_header(); ?>
<main class="site-content">
	<div class="container-fluid my-5 py-5">
		<?php get_template_part( 'template-parts/content', 'map' ); ?>
	</div>
</main>
<?php
get_footer();
