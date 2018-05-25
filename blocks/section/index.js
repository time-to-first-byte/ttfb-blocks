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
/*
const colorsMigration = ( attributes ) => {
	return omit( {
		...attributes,
		blockCustomTextColor: attributes.textColor && '#' === attributes.textColor[ 0 ] ? attributes.textColor : undefined,
		blockCustomBackgroundColor: attributes.color && '#' === attributes.color[ 0 ] ? attributes.color : undefined,
	}, [ 'color', 'textColor' ] );
};
*/
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
            const { blockAlignement } = attributes;
            if ( 'left' === blockAlignement || 'right' === blockAlignement || 'full' === blockAlignement || 'wide' === blockAlignement ) {
                return { 'data-align': blockAlignement };
            }
        },
        

        edit: props => {

            

            const { attributes: { blockBackgroundColor, blockTextColor, blockVerticalMargin, blockVerticalPadding, blockAlignement }, attributes, isSelected, className, setAttributes } = props;

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

            const { attributes: { blockBackgroundColor, blockTextColor, blockVerticalMargin, blockVerticalPadding, blockAlignement }, attributes, isSelected, className, setAttributes } = props;


            //const textClass = getColorClass( 'color', blockTextColor );
            const textClass = "";
            const backgroundClass = getColorClass( 'background-color', blockBackgroundColor );
            //const backgroundClass = "";
            const blockClasses = classnames( 
                'ttfb-blocks-section',
                'ttfb-block-section',
                'clearfix',
                'py'+blockVerticalPadding,
                'align'+blockAlignement,
                'mt'+blockVerticalMargin,
                'mb'+blockVerticalMargin,
                backgroundClass,
            );

            const blockStyle = {
                //backgroundColor: backgroundClass ? undefined : blockCustomBackgroundColor,
                //color: textClass ? undefined : blockCustomTextColor,
                backgroundColor: blockBackgroundColor,
                color: blockTextColor,
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