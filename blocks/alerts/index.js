/**
 * BLOCK: Atomic Blocks alert Block
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
} = wp.blocks;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
} = wp.components;

const {
	RichText,
    InnerBlocks,
    BlockAlignmentToolbar,
    AlignmentToolbar,
    BlockControls,
} = wp.editor;

/**
 * Register block
 */
export default registerBlockType(
    'ttfb-blocks/alerts',
    {
        title: __( 'TTFB Alerts' ),
        category: 'common',
        icon: 'lightbulb',
        keywords: [
            __( 'Alerts' ),
        ],
        attributes,
        getEditWrapperProps( attributes ) {
            const { alignment } = attributes;
            if ( 'left' === alignment || 'right' === alignment || 'full' === alignment || 'wide' === alignment ) {
                return { 'data-align': alignment };
            }
        },

        edit: props => {

            const { attributes: { backgroundColor, textColor, iconName }, attributes, isSelected, className, setAttributes } = props;

            return [
                isSelected && <Inspector { ...{ setAttributes, ...props} } />,
                <div
                    className={ classnames(
                        'ttfb-alert',
                        'p2',
                        'mxn2',
                    ) }
                >
                    <div
                        style={ {
                            backgroundColor: backgroundColor,
                            color: textColor,
                        } }
                        className={ classnames(
                            'p0',
                            'flex',
                            'flex-stretch',
                            'rounded',
                        ) }
                    >
                    {iconName &&
                        <div
                            className={ classnames(
                                'alert-icon',
                                'px2',
                                'py2',
                                'bg-darken-1',
                            ) }
                        >
                            <i 
                                className={ classnames(
                                    iconName,
                                    'has-darken-4-color',
                                ) }
                            ></i>
                        </div>
                    }

                        
                        <div class="flex-auto px2">
                            <InnerBlocks
                                className={ classnames(
                                    'p2',
                                    'child-mt0',
                                    'child-mb0',
                                    'border',
                                    'border-gray',
                                ) }
                            />
                        </div>
                    </div>
                </div>
            ];
        },

        save: props => {

            const { attributes: { backgroundColor, textColor }, attributes } = props;

            const blockClasses = classnames( 
                
            );

            const blockStyle = {
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