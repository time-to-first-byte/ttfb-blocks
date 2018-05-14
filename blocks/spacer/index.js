/**
 * BLOCK: Atomic Blocks Button
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
//import Spacer from './components/spacer';
import icons from './components/icons';
import Resizable from 're-resizable';
import attributes from './components/attributes';

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
	UrlInput,
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
    'ttfb-blocks/spacer',
    {
        title: __( 'TTFB Spacer' ),
        icon: 'image-flip-vertical',
        category: 'common',
        keywords: [
            __( 'spacer' ),
            __( 'divider' ),
            __( 'separator' ),
        ],
        attributes,
        getEditWrapperProps( attributes ) {
            const { accordionAlignment } = attributes;
            if ( 'left' === accordionAlignment || 'right' === accordionAlignment || 'full' === accordionAlignment ) {
                return { 'data-align': accordionAlignment };
            }
        },

        edit: props => {

            //const { attributes: { accordionTitle, accordionText, accordionAlignment, accordionTextAlignment, accordionFontSize, accordionOpen }, attributes, isSelected, className, setAttributes } = props;
            const { attributes: { spacerHeight, spacerDivider, spacerDividerStyle, spacerDividerColor, spacerDividerHeight  }, attributes, isSelected, className, setAttributes, toggleSelection} = props;

            return [
                isSelected && <Inspector { ...{ setAttributes, ...props} } />,
                <div
                    style={ {
                        color: spacerDividerColor
                    } }
                    className={ classnames(
                        'ttfb-block-spacer',
                        spacerDividerStyle,
                        { 'ttfb-block-spacer-divider': spacerDivider },
                        'ttfb-block-divider-size-' + spacerDividerHeight,
                    ) }
                >
                    <Resizable
                        className={ classnames( className, 'ttfb-spacer-handle' ) }
                        style={ {
                            color: spacerDividerColor
                        } }
                        size={ {
                            width: '100%',
                            height: spacerHeight,
                        } }
                        minWidth= { '100%' }
                        maxWidth= { '100%' }
                        minHeight= { '100%' }
                        handleClasses={ {
                            bottomLeft: 'ttfb-block-spacer-control__resize-handle',
                        } }
                        enable={ { top: false, right: false, bottom: true, left: false, topRight: false, bottomRight: false, bottomLeft: true, topLeft: false } }
                        onResizeStart={ () => {
                            toggleSelection( false );
                        } }
                        onResizeStop={ ( event, direction, elt, delta ) => {
                            setAttributes( {
                                spacerHeight: parseInt( spacerHeight + delta.height, 10 ),
                            } );
                            toggleSelection( true );
                        } }
                    >
                    </Resizable>
                </div>
            ];
        },

        save: props => {

            //const { attributes: { accordionTitle, accordionText, accordionAlignment, accordionTextAlignment, accordionFontSize, accordionOpen }, attributes } = props;
            const { attributes: { spacerHeight, spacerDivider, spacerDividerStyle, spacerDividerColor, spacerDividerHeight  }, attributes, isSelected, className, setAttributes, toggleSelection } = props;

            return (
                <div
                    style={ {
                        color: spacerDividerColor
                    } }
                    className={ classnames(
                        'ttfb-block-spacer',
                        spacerDividerStyle,
                        { 'ttfb-block-spacer-divider': spacerDivider },
                        'ttfb-block-divider-size-' + spacerDividerHeight,
                    ) }
                >
                    <hr style={ { height: spacerHeight ? spacerHeight + 'px' : undefined } }></hr>
                </div>
            );
        },
    },
);