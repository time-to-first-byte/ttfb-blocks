<?php
/**
 * Plugin Name: TTFB Blocks
 * Plugin URI: https://github.com/time-to-first-byte/ttfb-blocks
 * Description: Gutenberg Blocks for TTFB Themes
 * Author: TTFB
 * Author URI: https://ttfb.io
 * Version: 1.0.2
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package ttfb_blocks
 */

//  Exit if accessed directly.
defined('ABSPATH') || exit;

/**
 * Enqueue block editor only JavaScript and CSS
 */
function ttfb_blocks_editor_scripts()
{

    // Make paths variables so we don't write em twice ;)
    $blockPath = '/assets/js/editor.blocks.js';
    $editorStylePath = '/assets/css/blocks.editor.css';

    // Enqueue the bundled block JS file
    wp_enqueue_script(
        'ttfb-blocks-js',
        plugins_url( $blockPath, __FILE__ ),
        [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api' ],
        filemtime( plugin_dir_path(__FILE__) . $blockPath )
    );

    // Pass in REST URL
    wp_localize_script(
      'ttfb-blocks-js',
      'ttfb_blocks_globals',
      [
        'rest_url' => esc_url( rest_url() )
      ]);


    // Enqueue optional editor only styles
    wp_enqueue_style(
        'ttfb-blocks-editor-css',
        plugins_url( $editorStylePath, __FILE__),
        [ 'wp-blocks' ],
        filemtime( plugin_dir_path( __FILE__ ) . $editorStylePath )
    );

}

// Hook scripts function into block editor hook
add_action( 'enqueue_block_editor_assets', 'ttfb_blocks_editor_scripts' );


/**
 * Enqueue front end and editor JavaScript and CSS
 */
function ttfb_blocks_scripts()
{
    $blockPath = '/assets/js/frontend.blocks.js';
    // Make paths variables so we don't write em twice ;)
    $stylePath = '/assets/css/blocks.style.css';

    // Enqueue the bundled block JS file
    if( is_admin() ){
        wp_enqueue_script(
            'ttfb-blocks-frontend-js',
            plugins_url( $blockPath, __FILE__ ),
            [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api' ],
            filemtime( plugin_dir_path(__FILE__) . $blockPath )
        );
    }

    // Enqueue frontend and editor block styles
    wp_enqueue_style(
        'ttfb-blocks-css',
        plugins_url($stylePath, __FILE__),
        [ 'wp-blocks' ],
        filemtime(plugin_dir_path(__FILE__) . $stylePath )
    );

}

// Hook scripts function into block editor hook
add_action('enqueue_block_assets', 'ttfb_blocks_scripts');

/**
 * Server rendering for /blocks/click-to-tweet
 */
function ttfb_click_to_tweet_block_render( $attributes ) {
    
    $tweet_text = is_array( $attributes ) && isset( $attributes['tweet'] ) ? $attributes['tweet'] : false;

    // Block class.
    $class = 'wp-block-ttfb-click-to-tweet';

    // Twitter Sharing URL.
    $permalink = get_the_permalink();
    $url       = apply_filters( 'ttfb_toolkit_click_to_tweet_url', "http://twitter.com/share?&text=${$tweet_text}&url={$permalink}" );
    $text_align   = is_array( $attributes ) && isset( $attributes['alignment'] ) ? "style=text-align:{$attributes['alignment']}" : false;
    $icon   = is_array( $attributes ) && isset( $attributes['icon'] ) ? $attributes['icon'] : false;

    // Output the block.
    $markup  = '';
    $markup .= sprintf( '<div class="%1$s" %2$s>', esc_attr( $class ), esc_attr( $text_align ) );
        $markup .= sprintf( '<a target="_blank" rel="noopener noreferrer nofollow" href="%1$s">', esc_url( $url ) );
            $markup .= sprintf( '<span class="tweet-body">%1$s</span>', esc_html( $tweet_text ) );
    
            $markup .= sprintf( '<span class="ttfb-click-to-tweet-label">%1$s %2$s</span>', $tweet_text, esc_html__( 'Click to Tweet', 'ttfb-toolkit' ) );
        $markup .= sprintf( '</a>' );
    $markup .= sprintf( '</div>' );
    return $markup;         

}

// Hook server side rendering into render callback
/*register_block_type( 'ttfb/click-to-tweet', [
    'render_callback' => 'ttfb_click_to_tweet_block_render',
] );*/

/**
 * Is Autoptimize active?
 *
 * @since 1.0.0
 * @return bool
 */
function ttfb_blocks_is_autoptimize_active() {
	return class_exists('autoptimizeCache');
}

/*
* Inline styles hook
*/
add_action( 'wp_head', 'ttfb_blocks_critical_css', 10 );
function ttfb_blocks_critical_css() {
    echo '<style>';
        do_action( 'ttfb_blocks_inline_styles' );
    echo '</style>';
}

/*
* Pillar Block Critical CSS
*/
add_action('ttfb_blocks_inline_styles','ttfb_blocks_pillar_critical_styles', 10);
function ttfb_blocks_pillar_critical_styles(){
    if( !ttfb_blocks_is_autoptimize_active() ||
        ( !is_single() && !is_page() ) ){
            return;
    }

    $conf = autoptimizeConfig::instance();
    $autoptimize_css = $conf->get('autoptimize_css');
    $autoptimize_css_defer = $conf->get('autoptimize_css_defer');

    if( !is_admin() &&
    $autoptimize_css &&
    $autoptimize_css_defer ){
        echo '/* TTFB Blocks Critical Styles */ ';
        
        include_once( "assets/css/blocks.style.css" );
        
        echo '/* TTFB Blocks End Critical Styles */ ';
    }

}