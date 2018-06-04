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

//import { omit } from 'lodash';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block controls
const {
	registerBlockType,
} = wp.blocks;

const {
    getColorClass,
	withColors,
	RichText,
    InnerBlocks,
    BlockAlignmentToolbar,
    AlignmentToolbar,
    BlockControls,
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
    'ttfb-blocks/section',
    {
        title: __( 'TTFB Section' ),
        category: 'layout',
        icon: 'slides',
        keywords: [
            __( 'Section' ),
            __( 'Block' ),
        ],
        attributes,
        getEditWrapperProps( attributes ) {
            const { alignement } = attributes;
            if ( 'left' === alignement || 'right' === alignement || 'full' === alignement || 'wide' === alignement ) {
                return { 'data-align': alignement };
            }
        },
        
        edit: props => {

            const { attributes: { backgroundColor, textColor, verticalMargin, verticalPadding, horizontalPadding, alignement }, attributes, isSelected, className, setAttributes } = props;
           
            return [
                isSelected && <Inspector { ...{ setAttributes, ...props} } />,
                isSelected && <Controls { ...{ setAttributes, ...props } }/>,
                <div
                    style={ {
                        backgroundColor: backgroundColor,
                        color: textColor,
                    } }
                    className={ classnames(
                        'ttfb-section',
                        'py'+verticalPadding,
                        'align'+alignement,
                        'mt'+verticalMargin,
                        'mb'+verticalMargin,
                        'px'+horizontalPadding
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

            const { attributes: { backgroundColor, textColor, verticalMargin, verticalPadding, horizontalPadding, alignement }, attributes, isSelected, className, setAttributes } = props;


            //const textClass = getColorClass( 'color', blockTextColor );
            const textClass = "";
            const backgroundClass = getColorClass( 'background-color', backgroundColor );
            //const backgroundClass = "";
            const blockClasses = classnames( 
                'ttfb-section',
                'clearfix',
                'py'+verticalPadding,
                'align'+alignement,
                'mt'+verticalMargin,
                'mb'+verticalMargin,
                'px'+horizontalPadding,
                backgroundClass,
            );

            const blockStyle = {
                //backgroundColor: backgroundClass ? undefined : blockCustomBackgroundColor,
                //color: textClass ? undefined : blockCustomTextColor,
                backgroundColor: backgroundColor,
                color: textColor,
            };
        
            return (
                <div
                    style={ blockStyle }
                    className={ blockClasses }
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