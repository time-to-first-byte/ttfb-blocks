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

/**
 * Internal block libraries
 */
const { __,
    sprintf 
} = wp.i18n;

const {
    RichText,
    InnerBlocks,
    MediaUpload,
    Editable,
    BlockControls,
} = wp.editor;

const {
    registerBlockType,
} = wp.blocks;

const {
    Button,
} = wp.components;

function getLayoutClass( blockLayout ) {
    let blockLayoutClass = [];
    
    if( blockLayout == 'both' ) {
        blockLayoutClass.push('md-col-6');
    }else{
        blockLayoutClass.push('col-12');
    }

    return blockLayoutClass;
}

function isImageDisplay( blockLayout ) {
    let image = true;

    if( blockLayout == 'text' ) {
        image = false;
    }

    return image;
}

function isTextDisplay( blockLayout ) {
    let text = true;

    if( blockLayout == 'image' ) {
        text = false;
    }
    
    return text;
}

/**
 * Register block
 */
export default registerBlockType(
    'ttfb-blocks/chapter',
    {
        title: __( 'TTFB Chapter' ),
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

            const { attributes: { blockAlignment, supTitle, mainTitle, blockBackgroundColor, blockTextColor, blockHrColor, blockId, blockLayout, mainContent, mainContentAlignment, blockImgURL, blockImgID, blockImgAlt }, attributes, isSelected, className, setAttributes } = props;
            //const classes = classnames( className, `has-${ blockLayout }-columns` );

            const onSelectImage = img => {
                setAttributes( {
                    blockImgID: img.id,
                    blockImgURL: img.url,
                    blockImgAlt: img.alt,
                } );
            };
            const onRemoveImage = () => {
                setAttributes({
                    blockImgID: null,
                    blockImgURL: null,
                    blockImgAlt: null,
                });
            }

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
                                    keepPlaceholderOnFocus="true"
                                    onChange={ supTitle => setAttributes( { supTitle } ) }
                                    value={ supTitle }
                                    formattingControls={[]}
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
                                    keepPlaceholderOnFocus="true"
                                    onChange={ mainTitle => setAttributes( { mainTitle } ) }
                                    value={ mainTitle }
                                    formattingControls={[]}
                                />
                            </span>
                        </h2>
                        
                        <div
                            className={ classnames(
                                'md-flex',
                                'items-stretch',
                                'py2',
                                'md-py3',
                                'mxn2',
                            ) }
                        >

                            {isTextDisplay( blockLayout ) == true &&
                                <div
                                    className={ classnames(
                                        'px2',
                                        'items-center',
                                        'flex',
                                        getLayoutClass( blockLayout )
                                    ) }
                                >
                                    <div
                                        style={ { textAlign: mainContentAlignment } }
                                        className="main-content"
                                    >
                                        <RichText
                                            tagName="div"
                                            multiline="p"
                                            placeholder={ __( 'Your content' ) }
                                            keepPlaceholderOnFocus="true"
                                            onChange={ mainContent => setAttributes( { mainContent } ) }
                                            value={ mainContent }
                                            formattingControls={ ['bold', 'italic', 'strikethrough', 'link'] }
                                        />
                                    </div>
                                </div>
                            }

                            
                            {isImageDisplay( blockLayout ) == true &&
                                <div
                                    className={ classnames(
                                        'flex',
                                        'items-stretch',
                                        'justify-center',
                                        'items-center',
                                        'px2',
                                        getLayoutClass( blockLayout )
                                    ) }
                                >
                                    
                                    { ! blockImgID ? (
                                        
                                        <div class="imageSelector">
                                            <div class="labelImage">
                                                { icons.image } 
                                                <span class="ml1">
                                                    { __( 'Image', 'ttfb-blocks' ) }
                                                </span>
                                            </div>
                                            <MediaUpload
                                                onSelect={ onSelectImage }
                                                type="image"
                                                value={ blockImgID }
                                                render={ ( { open } ) => (
                                                    <Button
                                                        className={ "button button-large" }
                                                        onClick={ open }
                                                    >
                                                        { __( 'Add from Media Library', 'ttfb-blocks' ) }
                                                    </Button>
                                                ) }
                                            >
                                            </MediaUpload>
                                        </div>
                                    ) : (

                                        <div class="imageWrapper">
                                            <img
                                                src={ blockImgURL }
                                                alt={ blockImgAlt }
                                            />

                                            { isSelected ? (

                                                <Button
                                                    className="remove-image"
                                                    onClick={ onRemoveImage }
                                                >
                                                    { icons.remove }
                                                </Button>

                                            ) : null }

                                        </div>
                                    )}
                                </div>
                            }
                            
                        </div>

                        
                            
                    </div>
                </div>
            ];
        },

        save: props => {

            const { attributes: { blockAlignment, blockBackgroundColor, blockTextColor, supTitle, mainTitle, blockHrColor, blockId, blockLayout, mainContent, mainContentAlignment, blockImgURL, blockImgID, blockImgAlt, nodeName }, attributes } = props;

            //const Tag = 'h2';
            const Tag = nodeName.toLowerCase();

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
                                'md-flex',
                                'items-stretch',
                                'py2',
                                'md-py3',
                                'mxn2',
                            ) }
                        >

                            {isTextDisplay( blockLayout ) == true &&
                                <div
                                    className={ classnames(
                                        'px2',
                                        'items-center',
                                        'flex',
                                        getLayoutClass( blockLayout )
                                    ) }
                                >
                                    <div 
                                        className="main-content"
                                        style={ { textAlign: mainContentAlignment } }
                                    >
                                        { mainContent }
                                    </div>
                                </div>
                            }

                            
                            {isImageDisplay( blockLayout ) == true &&
                                <div
                                    className={ classnames(
                                        'flex',
                                        'justify-center',
                                        'items-center',
                                        'px2',
                                        getLayoutClass( blockLayout )
                                    ) }
                                >
                                    
                                    <img
                                        src={ blockImgURL }
                                        alt={ blockImgAlt }
                                    />
                                </div>
                            }
                            
                        </div>
                                
                            
                                
                            
                    </div>
                </div>
            );
        },
    },
);