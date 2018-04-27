/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
    AlignmentToolbar,
    BlockControls,
    BlockAlignmentToolbar,
    InspectorControls,
} = wp.blocks;


/**
 * Create a Block Controls wrapper Component
 */
export default class Inspector extends Component {

    constructor() {
        super( ...arguments );
    }
    render() {
        const { attributes: { accordionAlignment, accordionTextAlignment }, setAttributes } = this.props;
        return (
            <BlockControls>
                <BlockAlignmentToolbar
                    value={ accordionAlignment }
                    onChange={ accordionAlignment => setAttributes( { accordionAlignment } ) }
                />

                <AlignmentToolbar
                    value={ accordionTextAlignment }
                    onChange={ accordionTextAlignment => setAttributes( { accordionTextAlignment } ) }
                />
            </BlockControls>
        );
    }
}