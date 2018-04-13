/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
    InspectorControls,
    ColorPalette,
} = wp.blocks;
const {
    Button,
    ButtonGroup,
    CheckboxControl,
    PanelBody,
    PanelRow,
    PanelColor,
    RadioControl,
    RangeControl,
    TextControl,
    TextareaControl,
    ToggleControl,
    Toolbar,
    SelectControl
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

  constructor( props ) {
    super( ...arguments );
  }
  render() {

    const { attributes: { blockBackgroundColor, blockTextColor, blockHrColor, blockId, blockLayout }, setAttributes } = this.props;

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

         <PanelBody>
            <TextControl
                label={ __( 'Chapter ID', 'jsforwpblocks' ) }
                value={ blockId }
                onChange={ blockId => setAttributes( { blockId } ) }
            />
        </PanelBody>

        <PanelBody>
            <RangeControl
                beforeIcon="arrow-left-alt2"
                afterIcon="arrow-right-alt2"
                label={ __( 'Layout option', 'jsforwpblocks' ) }
                value={ blockLayout }
                onChange={ blockLayout => setAttributes( { blockLayout } ) }
                min={ 1 }
                max={ 3 }
            />
        </PanelBody>

        <PanelColor
            title={ __( 'Background color', 'jsforwpblocks' ) }
            colorValue={ blockBackgroundColor }
        >
            <ColorPalette
                value={ blockBackgroundColor }
                onChange={ blockBackgroundColor => setAttributes( { blockBackgroundColor } ) }
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

      </InspectorControls>
    );
  }

}