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
	SelectControl,
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
        const { attributes: { spacerHeight, spacerDivider, spacerDividerStyle, spacerDividerColor, spacerDividerHeight }, setAttributes } = this.props;

		// Button size values
		const spacerStyleOptions = [
			{ value: 'ttfb-block-divider-solid', label: __( 'Solid' ) },
			{ value: 'ttfb-block-divider-dashed', label: __( 'Dashed' ) },
			{ value: 'ttfb-block-divider-dotted', label: __( 'Dotted' ) },
		];

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<RangeControl
					label={ __( 'Spacer Height' ) }
					value={ spacerHeight || '' }
					onChange={ ( value ) => this.props.setAttributes( { spacerHeight: value } ) }
					min={ 50 }
					max={ 600 }
				/>

				<ToggleControl
					label={ __( 'Add Divider' ) }
					checked={ spacerDivider }
                    onChange={ spacerDivider => setAttributes( { spacerDivider } ) }
				/>

				{ spacerDivider ?
				<PanelBody>
					<SelectControl
						label={ __( 'Divider Style' ) }
						value={ spacerDividerStyle }
						options={ spacerStyleOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
                        onChange={ spacerDividerStyle => setAttributes( { spacerDividerStyle } ) }
					/>

					<RangeControl
						label={ __( 'Divider Height' ) }
						value={ spacerDividerHeight || '' }
                        onChange={ spacerDividerHeight => setAttributes( { spacerDividerHeight } ) }
						min={ 1 }
						max={ 5 }
					/>

					<PanelColor 
						title={ __( 'Divider Color' ) }
						colorValue={ spacerDividerColor }
						initialOpen={ false }
					>
						<ColorPalette 
							label={ __( 'Divider Color' ) }
							value={ spacerDividerColor }
                            onChange={ spacerDividerColor => setAttributes( { spacerDividerColor } ) }
							colors={['#dddddd', '#333333', '#3373dc', '#22d25f', '#ffdd57', '#ff3860', '#7941b6', '#444048']}
						/>
					</PanelColor>
				</PanelBody>
				: null }
			</PanelBody>
		</InspectorControls>
		);
	}
}
