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
        const { attributes: { alertBackgroundColor, alertTextColor }, setAttributes } = this.props;


		return (
            <InspectorControls key="inspector">
                <PanelBody>
                    <PanelColor
                    title={ __( 'Background color', 'ttfb-blocks' ) }
                    colorValue={ alertBackgroundColor }
                    initialOpen={ false }
                >
                    <ColorPalette
                        value={ alertBackgroundColor }
                        onChange={ alertBackgroundColor => setAttributes( { alertBackgroundColor } ) }
                    />
                </PanelColor>

                <PanelColor
                    title={ __( 'Text color', 'ttfb-blocks' ) }
                    colorValue={ alertTextColor }
                    initialOpen={ false }
                >
                    <ColorPalette
                        value={ alertTextColor }
                        onChange={ blockTextColor => setAttributes( { alertTextColor } ) }
                    />
                </PanelColor>

                    
                </PanelBody>
            </InspectorControls>
		);
	}
}
