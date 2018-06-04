/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const {
  BlockDescription,
  ColorPalette,
} = wp.blocks;

const {
    InspectorControls,
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
        const { attributes: { open }, setAttributes } = this.props;

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<ToggleControl
					label={ __( 'Open by default' ) }
					checked={ open }
                    onChange={ open => setAttributes( { open } ) }
				/>
			</PanelBody>
		</InspectorControls>
		);
	}
}
