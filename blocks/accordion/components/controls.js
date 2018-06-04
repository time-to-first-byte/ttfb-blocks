/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
    AlignmentToolbar,
    
} = wp.blocks;

const {
    BlockAlignmentToolbar,
    InspectorControls,
    BlockControls,
} = wp.editor;

/**
 * Create a Block Controls wrapper Component
 */
export default class Inspector extends Component {

    constructor() {
        super( ...arguments );
    }
    render() {
        const { attributes: { alignment }, setAttributes } = this.props;
        return (
            <BlockControls>
                <BlockAlignmentToolbar
                    value={ alignment }
                    onChange={ alignment => setAttributes( { alignment } ) }
                />
            </BlockControls>
        );
    }
}