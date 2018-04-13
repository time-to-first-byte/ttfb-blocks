/**
 * Block dependencies
 */
import icon from './icon';
import classnames from 'classnames';

/**
 * Internal block libraries
 */
const { __} = wp.i18n;
const {
    registerBlockType,
    InnerBlocks,
} = wp.blocks;


/**
 * Register block
 */
export default registerBlockType(
    'ttfb-block/innerblock',
    {
        title: __( 'TTFB Innerblock', 'jsforwpblocks' ),
        description: __( '', 'jsforwpblocks' ),
        category: 'common',
        icon: icon,
        keywords: [
            __( 'Inner', 'jsforwpblocks' ),
            __( 'Columns', 'jsforwpblocks' ),
        ],
        edit: props => {
            return (
                <div className="ttfb-block-innerblock">
                    <InnerBlocks />
                </div>
            );
        },
        save: props => {
            return (
                <div className="ttfb-block-innerblock">
                    <InnerBlocks.Content />
                </div>
            );
        },
    },
);
