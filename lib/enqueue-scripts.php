<?php
/**
 * Enqueue block editor only JavaScript and CSS
 */
function ttfb_blocks_editor_scripts()
{

    // Make paths variables so we don't write em twice ;)
    $blockPath = '../assets/js/editor.blocks.js';
    $editorStylePath = '../assets/css/blocks.editor.css';

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

    wp_enqueue_style(
        'fontawesome',
        'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
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

    // Make paths variables so we don't write em twice ;)
    $blockPath = '../assets/js/frontend.blocks.js';
    $stylePath = '../assets/css/blocks.style.css';

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