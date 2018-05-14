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
    'ttfb-blocks/section',
    {
        title: __( 'TTFB Section' ),
        category: 'common',
        icon: 'editor-ul',
        keywords: [
            __( 'Section' ),
            __( 'Block' ),
        ],
        attributes,
        getEditWrapperProps( attributes ) {
            const { blockAlignement } = attributes;
            if ( 'left' === blockAlignement || 'right' === blockAlignement || 'full' === blockAlignement || 'wide' === blockAlignement ) {
                return { 'data-align': blockAlignement };
            }
        },

        edit: props => {

            const { attributes: { blockBackgroundColor, blockTextColor, blockVerticalMargin, blockVerticalPadding, blockHorizontalPadding, blockAlignement }, attributes, isSelected, className, setAttributes } = props;

            return [
                isSelected && <Inspector { ...{ setAttributes, ...props} } />,
                isSelected && <Controls { ...{ setAttributes, ...props } }/>,
                <div
                    style={ {
                        backgroundColor: blockBackgroundColor,
                        color: blockTextColor,
                    } }
                    className={ classnames(
                        'ttfb-blocks-section',
                        'ttfb-block-section',
                        'px'+blockHorizontalPadding,
                        'py'+blockVerticalPadding,
                        'align'+blockAlignement,
                        'mt'+blockVerticalMargin,
                        'mb'+blockVerticalMargin
                    ) }
                >
                    <InnerBlocks
                        className={ classnames(
                            'child-mt0',
                            'child-mb0',
                            'max-width-3',
                            'ml-auto',
                            'mr-auto',
                        ) }
                    />
                </div>
            ];
        },

        save: props => {

            const { attributes: { blockBackgroundColor, blockTextColor, blockVerticalMargin, blockVerticalPadding, blockHorizontalPadding, blockAlignement }, attributes, isSelected, className, setAttributes } = props;

            return (
                <div
                    style={ {
                        backgroundColor: blockBackgroundColor,
                        color: blockTextColor,
                    } }
                    className={ classnames(
                        'ttfb-blocks-section',
                        'ttfb-block-section',
                        'clearfix',
                        'px'+blockHorizontalPadding,
                        'py'+blockVerticalPadding,
                        'align'+blockAlignement,
                        'mt'+blockVerticalMargin,
                        'mb'+blockVerticalMargin
                    ) }
                >
                    <div
                        className={ classnames(
                            'inner-content',
                            'ml-auto',
                            'mr-auto',
                            'child-mt0',
                            'child-mb0',
                        ) }
                    >
                        <InnerBlocks.Content />
                    </div>
                </div>
                            
                        
            );
        },
    },
);