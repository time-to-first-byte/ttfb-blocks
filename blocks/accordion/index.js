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
	RichText,
	AlignmentToolbar,
	BlockControls,
    BlockAlignmentToolbar,
    InnerBlocks,
} = wp.blocks;

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
        icon: 'editor-ul',
        keywords: [
            __( 'Accordion' ),
        ],
        attributes,
        getEditWrapperProps( attributes ) {
            const { accordionAlignment } = attributes;
            if ( 'left' === accordionAlignment || 'right' === accordionAlignment || 'full' === accordionAlignment || 'wide' === accordionAlignment ) {
                return { 'data-align': accordionAlignment };
            }
        },

        edit: props => {

            const { attributes: { accordionTitle, accordionAlignment, accordionOpen }, attributes, isSelected, className, setAttributes } = props;

            return [
                isSelected && <Inspector { ...{ setAttributes, ...props} } />,
                isSelected && <Controls { ...{ setAttributes, ...props } }/>,
                <div
                    className={ classnames(
                        'ttfb-blocks-accordion',
                        'ttfb-block-accordion',
                    ) }
                >
                    <RichText
                        tagName="p"
                        placeholder={ __( 'Accordion Title' ) }
                        value={ accordionTitle }
                        className={ classnames(
                            'ttfb-accordion-title',
                            'bold',
                            'bg-darken-1',
                            'py1',
                            'px2',
                            'rounded',
                        ) }
                        onChange={ accordionTitle => setAttributes( { accordionTitle } ) }
                        formattingControls={[]}
                    />

                    
                    <InnerBlocks
                        className={ classnames(
                            'ttfb-accordion-text',
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

            const { attributes: { accordionTitle, accordionAlignment, accordionOpen }, attributes } = props;

            return (
                <div
                    className={ classnames(
                        'ttfb-blocks-accordion',
                        'align'+accordionAlignment,
                        'ttfb-block-accordion',
                    ) }
                >
                    <details open={ accordionOpen }>
                        <summary class="ttfb-accordion-title bold bg-darken-1 py1 px2 cursor-pointer"><span class="ml1">{ accordionTitle }</span></summary>
                        <div class="ttfb-accordion-text p2 child-mt0 child-mb0">
                            <InnerBlocks.Content />
                        </div>
                    </details>
                </div>
            );
        },
    },
);