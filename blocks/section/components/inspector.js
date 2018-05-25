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
        const { attributes: { blockBackgroundColor, blockTextColor, blockVerticalMargin, blockVerticalPadding }, setAttributes } = this.props;

        /*const {
            attributes,
            setAttributes,
            blockBackgroundColor, 
            blockTextColor, 
            blockVerticalMargin, 
            blockVerticalPadding, 
            blockHorizontalPadding
        } = this.props;*/

		return (
		<InspectorControls key="inspector">
            
			<PanelColor
                title={ __( 'Background color', 'ttfb-blocks' ) }
                colorValue={ blockBackgroundColor }
                initialOpen={ false }
            >
                <ColorPalette
                    value={ blockBackgroundColor }
                    onChange={ blockBackgroundColor => setAttributes( { blockBackgroundColor } ) }
                />
            </PanelColor>

            <PanelColor
                title={ __( 'Text color', 'ttfb-blocks' ) }
                colorValue={ blockTextColor }
                initialOpen={ false }
            >
                <ColorPalette
                    value={ blockTextColor }
                    onChange={ blockTextColor => setAttributes( { blockTextColor } ) }
                />
            </PanelColor>
            
            <PanelBody>
                <RangeControl
                    label={ __( 'Vertical Margin', 'ttfb-blocks' ) }
                    value={ blockVerticalMargin }
                    onChange={ blockVerticalMargin => setAttributes( { blockVerticalMargin } ) }
                    min={ 0 }
                    max={ 4 }
                />
            </PanelBody>

            <PanelBody>
                <RangeControl
                    label={ __( 'Vertical Padding', 'ttfb-blocks' ) }
                    value={ blockVerticalPadding }
                    onChange={ blockVerticalPadding => setAttributes( { blockVerticalPadding } ) }
                    min={ 1 }
                    max={ 4 }
                />
            </PanelBody>
		</InspectorControls>
		);
	}
}
