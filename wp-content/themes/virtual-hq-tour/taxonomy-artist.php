<?php
/**
 * The Archive display for an Artist (taxonomical term)
 *
 * @package ChoctawNation
 */

get_header();
?>

<article class="container">
	<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	<?php term_description(); ?>
</article>