/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;



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
        const { attributes: { backgroundColor, textColor, verticalMargin, verticalPadding, horizontalPadding }, setAttributes } = this.props;

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
                title={ __( 'Spacing options', 'ttfb-blocks' ) }
                initialOpen={ false }
            >
                <RangeControl
                    label={ __( 'Vertical Margin', 'ttfb-blocks' ) }
                    value={ verticalMargin }
                    onChange={ verticalMargin => setAttributes( { verticalMargin } ) }
                    min={ 0 }
                    max={ 4 }
                />
                <RangeControl
                    label={ __( 'Vertical Padding', 'ttfb-blocks' ) }
                    value={ verticalPadding }
                    onChange={ verticalPadding => setAttributes( { verticalPadding } ) }
                    min={ 1 }
                    max={ 4 }
                />
                <RangeControl
                    label={ __( 'Horizontal Padding', 'ttfb-blocks' ) }
                    value={ horizontalPadding }
                    onChange={ horizontalPadding => setAttributes( { horizontalPadding } ) }
                    min={ 1 }
                    max={ 4 }
                />
            </PanelBody>
		</InspectorControls>
		);
	}
}
