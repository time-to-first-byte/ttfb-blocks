/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
  InspectorControls,
  BlockDescription,
  ColorPalette,
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
    return null;
  }

}