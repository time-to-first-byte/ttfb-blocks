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
    'ttfb-blocks/alerts',
    {
        title: __( 'TTFB Alerts' ),
        category: 'common',
        icon: 'editor-ul',
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

            const { attributes: { alertTitle, alertAlignment, alertOpen }, attributes, isSelected, className, setAttributes, selectedOption } = props;
            

            return [
                isSelected && <Inspector { ...{ setAttributes, ...props} } />,
                isSelected && <Controls { ...{ setAttributes, ...props } }/>,
                <div
                    className={ classnames(
                        'ttfb-blocks-alert',
                        'ttfb-block-alert',
                    ) }
                >
                    <RichText
                        tagName="p"
                        placeholder={ __( 'alert Title' ) }
                        value={ alertTitle }
                        className={ classnames(
                            'ttfb-alert-title',
                            'bold',
                            'bg-darken-1',
                            'py1',
                            'px2',
                            'rounded',
                        ) }
                        onChange={ alertTitle => setAttributes( { alertTitle } ) }
                        formattingControls={[]}
                    />
                    
                    
                    
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

            const { attributes: { alertTitle, alertAlignment, alertOpen, selectedOption }, attributes } = props;

            return (
                <div
                    className={ classnames(
                        'ttfb-blocks-alert',
                        'align'+alertAlignment,
                        'ttfb-block-alert',
                    ) }
                >
                    <details open={ alertOpen }>
                        <summary class="ttfb-alert-title bold bg-darken-1 py1 px2 cursor-pointer"><span class="ml1">{ alertTitle }</span></summary>
                        <div class="ttfb-alert-text p2 child-mt0 child-mb0">
                            <InnerBlocks.Content />
                        </div>
                    </details>
                </div>
            );
        },
    },
);