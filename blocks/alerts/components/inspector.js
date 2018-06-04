/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;


import React from 'react';
import Select from 'react-select';

// Import block components
const {
    InspectorControls,
    BlockDescription,
    ColorPalette,
} = wp.editor;

// Import Inspector components
const {
	Toolbar,
	Button,
	PanelBody,
	PanelRow,
	PanelColor,
	RangeControl,
    ToggleControl,
    TextControl,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
    }

	render() {

		// Setup the attributes
        const { attributes: { backgroundColor, textColor, iconName }, setAttributes } = this.props;


		return (
            <InspectorControls key="inspector">
                    <PanelColor
                        title={ __( 'Background color', 'ttfb-blocks' ) }
                        colorValue={ backgroundColor }
                        initialOpen={ false }
                    >
                        <ColorPalette
                            value={ backgroundColor }
                            onChange={ backgroundColor => setAttributes( { backgroundColor } ) }
                        />
                    </PanelColor>
                
                    <PanelColor
                        title={ __( 'Text color', 'ttfb-blocks' ) }
                        colorValue={ textColor }
                        initialOpen={ false }
                    >
                        <ColorPalette
                            value={ textColor }
                            onChange={ textColor => setAttributes( { textColor } ) }
                        />
                    </PanelColor>

                <PanelBody
                    title={ __( 'Icon', 'ttfb-blocks' ) }
                    initialOpen={ false }
                >
                    <TextControl
                        label={ __( 'Icon name', 'ttfb-blocks' ) }
                        help={ __( 'Ex: fas fa-link', 'ttfb-blocks' ) }
                        value={ iconName }
                        onChange={ iconName => setAttributes( { iconName } ) }
                    />
                    
                    <div>All icons on <a href="https://fontawesome.com/icons?d=gallery&m=free">fontawesome.com</a>.</div>
                    <div><strong>Size options:</strong> fa-lg, fa-2x, fa-3x, fa-4x, fa-5x, fa-6x</div>
                    
                </PanelBody>
            </InspectorControls>
		);
	}
}
