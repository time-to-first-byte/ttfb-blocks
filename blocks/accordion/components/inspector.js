/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const {
  InspectorControls,
  BlockDescription,
  ColorPalette,
} = wp.blocks;

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
        const { attributes: { accordionTitle, accordionText, accordionFontSize, accordionOpen }, setAttributes } = this.props;

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<ToggleControl
					label={ __( 'Open by default' ) }
					checked={ accordionOpen }
                    onChange={ accordionOpen => setAttributes( { accordionOpen } ) }
				/>
			</PanelBody>
		</InspectorControls>
		);
	}
}
