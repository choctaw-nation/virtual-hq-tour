<?php //phpcs:ignore
require_once dirname( __FILE__ ) . '/class-cno-content-components.php';
/**
 * A Component Class that displays content a few different ways. All methods have an $args bypass and an $echo control where `false` returns the markup and `true` echoes the markup. The $args array also shows expected parameters.
 */
class CNO_Content_Sections extends CNO_Content_Components {

	/**
	 * Gets the Hero `<section>` with class 'hero'. Optional Background Image or color.
	 *
	 * @param int   $post_id the post id.
	 * @param bool  $echo echo/return toggle.
	 * @param array ...$args Expects an associative array.
	 * ```
	 * $args = array(
	 * 'has_background_image' => bool,
	 * 'background_image' => ?string the URL for CSS `background-image`,
	 * 'headline' => string,
	 * 'subheadline' => ?string,
	 * 'has_cta' => bool,
	 * 'cta_link' => ?string the url
	 * );
	 * ```
	 */
	public function hero_section( int $post_id = null, $echo = true, array ...$args ) {
		if ( empty( $post_id ) ) {
			extract( $args );
		} else {
			$hero = get_field( 'hero', $post_id );
		}
		if ( ! $hero ) {
			echo "<div class='container my-5'><div class='py-5 alert alert-warning'>Edit this page's ACF Fields!</div></div>";
			return;
		}
		extract( $hero );

		$markup_start  = $has_background_image ? "<section class='hero w-100 py-5' style=\"background-image:url('{$background_image}')\">" : "<section class='hero w-100 py-5' style='background-color:var(--bs-secondary);'>";
		$markup_start .= "
        <div class='container'>
            <div class='row my-5'>
                <div class='col text-center py-5'>";
		$markup_inner  = $this->headline(
			$headline,
			false,
			array(
				'headline_element'    => 'h1',
				'headline_class'      => 'hero__headline headline mb-5',
				'subheadline_content' => $subheadline,
				'subheadline_class'   => 'hero__subheadline subheadline',
			)
		);

		if ( $has_cta ) {
			$markup_inner .= $this->cta_button(
				array(
					'text'       => $cta_text,
					'link'       => $cta_link,
					'html_class' => 'hero__btn btn__primary--fill mt-5',
				),
				false,
			);
		}
		$markup_end = '</div></div></div></section>';
		$markup     = "{$markup_start}{$markup_inner}{$markup_end}";
		if ( $echo ) {
			echo $markup;
		} else {
			return $markup;
		}
	}

	/**
	 * Generate two-column layout with text and media
	 *
	 * @param array $options The options for the two-column layout
	 * ```php
	 * $options = array(
	 *  'split'            => array( 6, 6 ),
	 *  'headline'         => '',
	 *  'headline_element' => '',
	 *  'headline_class'   => '',
	 *  'content'          => '',
	 *  'content_wrapper'  => 'div',
	 *  'content_class'    => 'text-content mb-5',
	 *  'cta'              => $cta ?? null,
	 *  'cta_class'        => 'btn__primary--fill',
	 *  'media_type'       => 'photo',
	 *  'reverse'          => false,
	 *  'image'            => null | array,
	 * );
	 * ```
	 * @param bool  $echo Whether to echo or return the markup (default: true)
	 *
	 * @return string The markup for the two-column layout
	 */
	public function two_col_text_and_media( array $options, bool $echo = true ) {
		$default = array(
			'split'            => array( 6, 6 ),
			'headline'         => '',
			'headline_element' => '',
			'headline_class'   => '',
			'content'          => '',
			'content_wrapper'  => 'div',
			'content_class'    => 'text-content mb-5',
			'cta'              => $cta ?? null,
			'cta_class'        => 'btn__primary--fill',
			'media_type'       => 'photo',
			'reverse'          => false,
			'image'            => null,
		);

		$options = array_merge( $default, $options );

		extract( $options );
		$container_classes = 'two-col row justify-content-between align-items-center' . ( $reverse ? ' flex-row-reverse' : '' );
		$container_start   = "<div class='{$container_classes}'>";
		$div_end           = '</div>';
		$col_1_start       = 'svg' === $media_type ? "<div class='two-col__col-1 col-lg-{$split[0]} align-self-start'>" : "<div class='two-col__col-1 col-lg-{$split[0]}'>";
		$col_2_start       = "<div class='two-col__col-2 col-lg-{$split[1]}'>";
		$col_1_content     = '';

		if ( $image ) {
			$col_1_content = "<figure class='two-col__image'>";
			if ( 'photo' === $media_type ) {
				$alt            = esc_attr( $image['alt'] );
				$srcset         = wp_get_attachment_image_srcset( $image['ID'] );
				$col_1_content .= "<img src={$image['sizes']['two-col']} alt='{$alt}'} srcset='{$srcset}' />";
			} elseif ( 'svg' === $media_type ) {
				$col_1_content .= "<img  src='{$image}' alt='' aria-hidden='true' />";
			}
			$col_1_content .= '</figure>';
		} elseif ( 'video' === $media_type ) {
			$col_1_content = "<figure class='two-col__video'>Video!</figure>";
		}

		$headline_args = array(
			'subheadline_content' => $content,
			'subheadline_element' => $content_wrapper,
			'subheadline_class'   => $content_class,
		);

		if ( ! empty( $headline_element ) ) {
			$headline_args['headline_element'] = $headline_element;
		}

		if ( ! empty( $headline_class ) ) {
			$headline_args['headline_class'] = $headline_class;
		}
		$col_2_content = $this->headline( $headline, false, $headline_args );

		if ( $cta ) {
			$btn_options    = array(
				'text'        => esc_textarea( $cta['title'] ),
				'link'        => esc_url( $cta['url'] ),
				'is_external' => $cta['target'] ?? false,
				'html_class'  => $cta_class,
			);
			$col_2_content .= $this->cta_button( $btn_options, false );
		}

		$markup = "
        {$container_start}
            {$col_1_start}{$col_1_content}{$div_end}
            {$col_2_start}{$col_2_content}{$div_end}
        {$div_end}";

		if ( $echo ) {
			echo $markup;
		} else {
			return $markup;
		}
	}

	/**
	 * Vertical Card Layout with an image. $args overrides the `headline` settings
	 *
	 * @param array $args Expects an associative array:
	 * ```php
	 * $headline_args = array(
	 * 'headline_element'        => ?string default "h2",
	 * 'headline_class'          => ?string default "vertical-card__title",
	 * 'subheadline_element'     => ?string default 'p');
	 * 'subheadline_class'       => ?string default 'vertical-card__excerpt');
	 * 'subheadline_content'     => ?string the subheadline content,
	 * ```
	 * @param bool  $echo echo/return toggle.
	 */
	public function vertical_card( array $args = array(), bool $echo = true, ) {
		$default       = array(
			'image_src'        => null,
			'headline'         => '',
			'headline_element' => 'h2',
			'subheadline'      => '',
		);
		$headline_args = array(
			'headline_class'      => 'vertical-card__title',
			'subheadline_element' => 'div',
			'subheadline_class'   => 'vertical-card__excerpt',
		);

		$options = array_merge( $default, $headline_args, $args );
		extract( $options );
		$card_image        = "<figure class='vertical-card__image'><img src={$image_src} /></figure>";
		$card_text_content = "<div class='vertical-card__content'>{$this->headline($headline, false,$options)}</div>";
		$markup            = "<div class='vertical-card'>{$card_image}{$card_text_content}</div>";
		if ( $echo ) {
			echo $markup;
		} else {
			return $markup;
		}
	}
}