<?php

/**
 * Server rendering for /blocks/examples/12-dynamic
 */
function ttfb_blocks_section_block_render( $attributes ) {

    $markup = "<pre>";

    foreach( $attributes as $attribute ){
        $markup .= $attribute;
    }

    $markup .= "</pre>";

    return $markup;

}

function ttfb_blocks_section_block_register() {
    // Hook server side rendering into render callback
    register_block_type( 'ttfb-blocks/section', [
        'render_callback' => 'ttfb_blocks_section_block_render',
    ] );
}

// Make sure that Gutenberg is available
if ( function_exists( 'register_block_type' ) ) {
    add_action( 'init', 'ttfb_blocks_section_block_register' );
}

function get_block_attributes( $block ) {
    global $wp_query;
    if( substr( $block , -1) != '/' ) $block .= '/';
  
    $attributes = array_filter($wp_query->query_vars, function ($k) use ($block) {
      return $k == strstr($k, $block);
    }, ARRAY_FILTER_USE_KEY);
  
    $return = [];
    foreach ($attributes as $key => $value) {
      $return[str_replace( $block, '', $key )] .= $value;
    }
    return $return;
  }