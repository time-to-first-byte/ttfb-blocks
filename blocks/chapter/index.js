/**
 * Block dependencies
 */
//import classnames from 'classnames';

import classnames from 'classnames';
import Inspector from './inspector';
import Controls from './controls';
import icons from './icons';
import attributes from './attributes';
import './style.scss';
import './editor.scss';

// For columns
//import memoize from 'memize';
//import { times } from 'lodash';


/**
 * Internal block libraries
 */
const { __,
    sprintf 
} = wp.i18n;
const {
    registerBlockType,
    RichText,
    InnerBlocks,
} = wp.blocks;

/*const getColumnLayouts = memoize( ( blockLayout ) => {
	return times( blockLayout, ( n ) => ( {
		name: `column-${ n + 1 }`,
		label: sprintf( __( 'Column %d' ), n + 1 ),
		icon: 'columns',
	} ) );
} );
*/
/**
 * Register block
 */
export default registerBlockType(
    'ttfb/chapter',
    {
        title: __( 'Chapter' ),
        category: 'common',
        icon: icons.chapter,
        keywords: [
            __( 'Chapter' ),
            __( 'Header' ),
        ],
        attributes,
        getEditWrapperProps( attributes ) {
            const { blockAlignment } = attributes;
            if ( 'left' === blockAlignment || 'right' === blockAlignment || 'full' === blockAlignment ) {
                return { 'data-align': blockAlignment };
            }
        },

        edit: props => {

            const { attributes: { blockAlignment, supTitle, mainTitle, blockBackgroundColor, blockTextColor, blockHrColor, blockId, blockLayout }, attributes, isSelected, className, setAttributes } = props;
            //const classes = classnames( className, `has-${ blockLayout }-columns` );

            return [
                isSelected && <Inspector { ...{ setAttributes, ...props} } />,
                isSelected && <Controls { ...{ setAttributes, ...props } }/>,
                <div 
                    style={ {
                        backgroundColor: blockBackgroundColor,
                        color: blockTextColor,
                    } }
                    className={ className }
                    id={ blockId }
                >
                    <div
                        className={ classnames(
                            'container-chapter',
                            'ml-auto',
                            'mr-auto',
                            'pt3',
                            'pb0',
                            'px2',
                        ) }
                    >
                        <h2
                            style={ {
                                color: blockTextColor,
                                borderBottomColor: blockHrColor,
                            } }
                            className={ classnames(
                                'line-height-2',
                                'center',
                                'p0',
                                'm0',
                                'pb2',
                                'mb3',
                            ) }
                        >
                            <span
                                className={ classnames(
                                    'sup-title',
                                    'block',
                                    'mb1',
                                    'weight900',
                                ) }
                            >
                                <RichText
                                    tagName="div"
                                    placeholder={ __( 'Your small title' ) }
                                    onChange={ supTitle => setAttributes( { supTitle } ) }
                                    value={ supTitle }
                                />
                            </span>
                            <span
                                className={ classnames(
                                    'main-title',
                                    'weight200',
                                    'xxl-text',
                                ) }
                            >
                                <RichText
                                    tagName="div"
                                    placeholder={ __( 'Your main title' ) }
                                    onChange={ mainTitle => setAttributes( { mainTitle } ) }
                                    value={ mainTitle }
                                />
                            </span>
                        </h2>

                        <div
                                className={ classnames(
                                    'ttfb-block-columns',
                                    'has-2-columns'
                                ) }
                            >
                                <InnerBlocks layouts={ [
                                    { name: 'column-1', label: 'Column 1', icon: 'columns' },
                                    { name: 'column-2', label: 'Column 2', icon: 'columns' },
                                ] } />
                        </div>
                            
                    </div>
                </div>
            ];
        },

        save: props => {

            const { attributes: { blockAlignment, blockBackgroundColor, blockTextColor, supTitle, mainTitle, blockHrColor, blockId, blockLayout }, attributes } = props;

            const Tag = 'h2';

            return (
                <div
                    style={ {
                        backgroundColor: blockBackgroundColor,
                        color: blockTextColor,
                    } }
                    className={ `align${blockAlignment}` }
                    id={ blockId }
                >
                    <div
                        className={ classnames(
                            'container-chapter',
                            'ml-auto',
                            'mr-auto',
                            'pt3',
                            'pb0',
                            'px2'
                        ) }
                    >
                        <Tag
                            className={ classnames(
                                'line-height-2',
                                'center',
                                'p0',
                                'm0',
                                'pb2',
                                'mb3',
                                'h2',
                            ) }
                            style={ {
                                color: blockTextColor,
                                borderBottomColor: blockHrColor,
                            } }
                        >
                            <span
                                className={ classnames(
                                    'sup-title',
                                    'block',
                                    'mb1',
                                    'weight900',
                                ) }
                            >
                                { supTitle }
                            </span>
                            <span
                                className={ classnames(
                                    'main-title',
                                    'title',
                                    'weight200',
                                    'xxl-text',
                                ) }
                            >
                                { mainTitle }
                            </span>
                        </Tag>

                        <div
                            className={ classnames(
                                'ttfb-block-columns',
                                'has-2-columns'
                            ) }
                        >
                            
                            <InnerBlocks.Content />
                        </div>
                    </div>
                </div>
            );
        },
    },
);