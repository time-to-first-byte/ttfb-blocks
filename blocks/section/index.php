<?php

/**
 * Server rendering for /blocks/examples/12-dynamic
 */
function ttfb_blocks_section_block_render( $attributes ) {

    
    $markup = "<pre>";
    foreach( $attributes as $attribute ){
        $markup .= $attribute . "<br>";
    }
    $post_id_array = json_decode( $attributes['blockContent'] );
    $markup .= $post_id_array;
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