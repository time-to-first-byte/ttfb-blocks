/**
 * Component dependencies
 */
import classnames from 'classnames';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
  AlignmentToolbar,
  BlockControls,
  BlockAlignmentToolbar,
} = wp.blocks;
const {
  Toolbar,
  Tooltip,
  Button,
} = wp.components;

/**
 * Create a Block Controls wrapper Component
 */
export default class Inspector extends Component {

  constructor( props ) {
    super( ...arguments );
  }
  render() {
    return (
      <BlockControls key="controls">
        <AlignmentToolbar
          value={ this.props.attributes.alignment }
          onChange={ this.props.onChangeAlignment }
        />
      </BlockControls>
    );
  }

}
