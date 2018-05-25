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
        icon: icons.dismiss,
        keywords: [
            __( 'Alerts' ),
        ],
        attributes,
        getEditWrapperProps( attributes ) {
            const { alertAlignment } = attributes;
            if ( 'left' === alertAlignment || 'right' === alertAlignment || 'full' === alertAlignment || 'wide' === alertAlignment ) {
                return { 'data-align': alertAlignment };
            }
        },

        edit: props => {

            const { attributes: { alertBackgroundColor, alertTextColor }, attributes, isSelected, className, setAttributes } = props;
            

            return [
                isSelected && <Inspector { ...{ setAttributes, ...props} } />,
                <div
                    className={ classnames(
                        'ttfb-blocks-alert',
                    ) }
                >

                    <InnerBlocks
                        className={ classnames(
                            'ttfb-alert-text',
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

            const { attributes: { alertBackgroundColor, alertTextColor }, attributes } = props;

            return (
                <div
                    className={ classnames(
                        'ttfb-blocks-alert',
                    ) }
                >
                    <InnerBlocks.Content />
                </div>
            );
        },
    },
);