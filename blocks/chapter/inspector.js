/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
  InspectorControls,
  BlockDescription,
  ColorPalette,
  AlignmentToolbar,
  BlockAlignmentToolbar,
  BlockControls,
} = wp.blocks;
const {
  Toolbar,
  Button,
  PanelBody,
  PanelRow,
  PanelColor,
  FormToggle,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

  constructor( props ) {
    super( ...arguments );
  }
  render() {

    const { attributes: { blockBackgroundColor, blockBackgroundColor2, blockTextColor, blockHrColor, displayText, displayImage, toggleHeadingLevel }, setAttributes } = this.props;

    return (
      <InspectorControls key="inspector">

        <PanelBody
            title={ __( 'Chapter Block', 'jsforwpblocks' ) }
            initialOpen={ false }
        >
            <PanelRow>
                <p>{ __( 'Chapter block description', 'jsforwpblocks' ) }</p>
            </PanelRow>
        </PanelBody>

        <PanelColor
            title={ __( 'Background color 1', 'jsforwpblocks' ) }
            colorValue={ blockBackgroundColor }
        >
            <ColorPalette
                value={ blockBackgroundColor }
                onChange={ blockBackgroundColor => setAttributes( { blockBackgroundColor } ) }
            />
        </PanelColor>

        <PanelColor
            title={ __( 'Background color 2', 'jsforwpblocks' ) }
                value={ this.props.attributes.blockBackgroundColor2 }
            colorValue={ blockBackgroundColor2 }
        >
            <ColorPalette
                value={ blockBackgroundColor2 }
                onChange={ blockBackgroundColor2 => setAttributes( { blockBackgroundColor2 } ) }
            />
        </PanelColor>
        
        <PanelColor
            title={ __( 'Text Color', 'jsforwpblocks' ) }
                value={ this.props.attributes.blockTextColor }
            colorValue={ blockTextColor }
        >
            <ColorPalette
                value={ blockTextColor }
                onChange={ blockTextColor => setAttributes( { blockTextColor } ) }
            />
        </PanelColor>

        <PanelColor
            title={ __( 'Separator Color', 'jsforwpblocks' ) }
                value={ this.props.attributes.blockHrColor }
            colorValue={ blockHrColor }
        >
            <ColorPalette
                value={ blockHrColor }
                onChange={ blockHrColor => setAttributes( { blockHrColor } ) }
            />
        </PanelColor>

        <PanelBody 
            title={ __( 'Display Options' ) }
            //initialOpen={ false }
        >
            
            <PanelRow>
                <ToggleControl
                    label={ __( 'Display Main Text', 'jsforwpblocks' ) }
                    checked={ displayText }
                    onChange={ displayText => setAttributes( { displayText } ) }
                />
            </PanelRow>

            <PanelRow>
                <ToggleControl
                    label={ __( 'Display Main Image', 'jsforwpblocks' ) }
                    checked={ displayImage }
                    onChange={ displayImage => setAttributes( { displayImage } ) }
                />
            </PanelRow>

            <PanelRow>
                <ToggleControl
                    label={ __( 'Heading Level', 'jsforwpblocks' ) }
                    checked={ toggleHeadingLevel }
                    onChange={ toggleHeadingLevel => setAttributes( { toggleHeadingLevel } ) }
                />
            </PanelRow>

        </PanelBody>
                    

      </InspectorControls>
    );
  }

}