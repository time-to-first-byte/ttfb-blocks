/**
 * BLOCK: Atomic Blocks Accordion Block
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import icons from './components/icons';
import attributes from './components/attributes';
import Controls from './components/controls';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block controls
const {
	registerBlockType,
	BlockControls,
} = wp.blocks;

const {
    RichText,
    AlignmentToolbar,
    InnerBlocks,
    BlockAlignmentToolbar,
} = wp.editor;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
} = wp.components;

/**
 * Register block
 */
export default registerBlockType(
    'ttfb-blocks/accordion',
    {
        title: __( 'TTFB Accordion' ),
        category: 'common',
        icon: 'arrow-right',
        keywords: [
            __( 'Accordion' ),
        ],
        attributes,
        getEditWrapperProps( attributes ) {
            const { alignment } = attributes;
            if ( 'left' === alignment || 'right' === alignment || 'full' === alignment || 'wide' === alignment ) {
                return { 'data-align': alignment };
            }
        },

        edit: props => {

            const { attributes: { title, alignment, open }, attributes, isSelected, className, setAttributes } = props;

            return [
                isSelected && <Inspector { ...{ setAttributes, ...props} } />,
                isSelected && <Controls { ...{ setAttributes, ...props } }/>,
                <div
                    className={ classnames(
                        'ttfb-block-accordion',
                    ) }
                >
                    <RichText
                        tagName="p"
                        placeholder={ __( 'Accordion Title' ) }
                        value={ title }
                        className={ classnames(
                            'accordion-title',
                            'bold',
                            'bg-darken-1',
                            'py1',
                            'px2',
                            'rounded',
                        ) }
                        onChange={ title => setAttributes( { title } ) }
                        formattingControls={[]}
                    />

                    
                    <InnerBlocks
                        className={ classnames(
                            'accordion-text',
                            'p2',
                            'child-mt0',
                            'child-mb0',
                            'border',
                            'border-gray',
                        ) }
                    />
                </div>
            ];
        },

        save: props => {

            const { attributes: { title, alignment, open }, attributes } = props;

            return (
                <div
                    className={ classnames(
                        'align'+alignment,
                        'ttfb-block-accordion',
                    ) }
                >
                    <details open={ open }>
                        <summary class="accordion-title bold bg-darken-1 py1 px2 cursor-pointer rounded"><span class="ml1">{ title }</span></summary>
                        <div class="accordion-text p2 child-mt0 child-mb0">
                            <InnerBlocks.Content />
                        </div>
                    </details>
                </div>
            );
        },
    },
);