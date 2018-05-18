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
        const { attributes: { alertTitle, alertText, alertFontSize, alertOpen, selectedOption }, setAttributes } = this.props;
  
        const optionRenderer = (selectedOption) => {
            //setState({ selectedOption });
            var value = selectedOption.value
            //this.setState({ selectedOption });
            this.setState({
                selectValue: selectedOption,
            });
            console.log(`Selected: ${selectedOption.label}`);
            //return selectedOption.value;
        };


        

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<ToggleControl
					label={ __( 'Open by default' ) }
					checked={ alertOpen }
                    onChange={ alertOpen => setAttributes( { alertOpen } ) }
				/>

                <Select
                    name="form-field-name"
                    value={selectedOption}
                    onChange={ selectedOption => setAttributes( { selectedOption } ) }
                    options={[
                        { value: 'fab fa-wordpress', label: '<i class="fab fa-wordpress"></i> fab fa-wordpress' },
                        { value: 'fas fa-home', label: '<i class="fas fa-home"></i> fas fa-home' },
                    ]}
                />

                
			</PanelBody>
		</InspectorControls>
		);
	}
}
