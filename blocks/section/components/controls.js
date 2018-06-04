/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
    BlockControls,
    BlockAlignmentToolbar,
} = wp.editor;


/**
 * Create a Block Controls wrapper Component
 */
export default class Inspector extends Component {

    constructor() {
        super( ...arguments );
    }
    render() {
        const { attributes: { alignement }, setAttributes } = this.props;
        return (
            <BlockControls>
                <BlockAlignmentToolbar
                    value={ alignement }
                    onChange={ alignement => setAttributes( { alignement } ) }
                />
            </BlockControls>
        );
    }
}