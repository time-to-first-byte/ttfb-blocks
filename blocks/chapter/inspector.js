/**
 * Internal block libraries
 */
const { __,
    sprintf, } = wp.i18n;
const { Component } = wp.element;
const {
    InspectorControls,
    ColorPalette,
} = wp.editor;
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

    const { attributes: { blockBackgroundColor, blockTextColor, blockHrColor, blockId, blockLayout, nodeName }, setAttributes } = this.props;

    return (
      <InspectorControls key="inspector">

        <PanelBody
            title={ __( 'Chapter Block', 'ttfb-blocks' ) }
            initialOpen={ false }
        >
            <PanelRow>
                <p>{ __( 'Chapter block description', 'ttfb-blocks' ) }</p>
            </PanelRow>
        </PanelBody>

         <PanelBody>
            <h3>{ __( 'Heading Settings' ) }</h3>
            <p>{ __( 'Level' ) }</p>
            <Toolbar
                controls={
                    '123456'.split( '' ).map( ( level ) => ( {
                        icon: 'heading',
                        title: sprintf( __( 'Heading %s' ), level ),
                        isActive: 'H' + level === nodeName,
                        onClick: () => setAttributes( { nodeName: 'H' + level } ),
                        subscript: level,
                    } ) )
                }
            />
            <TextControl
                label={ __( 'HTML Anchor', 'ttfb-blocks' ) }
                value={ blockId }
                onChange={ blockId => setAttributes( { blockId } ) }
            />
        </PanelBody>

         <PanelBody>
            <SelectControl
                label={ __( 'Layout', 'ttfb-blocks' ) }
                value={ blockLayout }
                options={ [
                    { value: 'text', label: __( 'Text only', 'ttfb-blocks' ) },
                    { value: 'image', label: __( 'Image only', 'ttfb-blocks' ) },
                    { value: 'both', label: __( 'Text and Image', 'ttfb-blocks' ) },
                ] }
                onChange={ blockLayout => setAttributes( { blockLayout } ) }
            />
        </PanelBody>

        <PanelColor
            title={ __( 'Background color', 'ttfb-blocks' ) }
            colorValue={ blockBackgroundColor }
        >
            <ColorPalette
                value={ blockBackgroundColor }
                onChange={ blockBackgroundColor => setAttributes( { blockBackgroundColor } ) }
            />
        </PanelColor>
        
        <PanelColor
            title={ __( 'Text Color', 'ttfb-blocks' ) }
                value={ this.props.attributes.blockTextColor }
            colorValue={ blockTextColor }
        >
            <ColorPalette
                value={ blockTextColor }
                onChange={ blockTextColor => setAttributes( { blockTextColor } ) }
            />
        </PanelColor>

        <PanelColor
            title={ __( 'Separator Color', 'ttfb-blocks' ) }
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