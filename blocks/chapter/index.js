/**
 * Block dependencies
 */
//import classnames from 'classnames';

import classnames from 'classnames';
import Inspector from './inspector';
import Controls from './controls';
import attributes from './attributes';
import icons from './icons';
import './style.scss';
import './editor.scss';


/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
    registerBlockType,
    RichText,
} = wp.blocks;

const validAlignments = [ 'wide', 'full' ];
 


  

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

        /*getEditWrapperProps( attributes ) {
            const { width } = attributes;
            if ( [ 'wide', 'full', 'left', 'right' ].indexOf( width ) !== -1 ) {
                return { 'data-align': width };
            }
        },*/

        edit: props => {
            
            
/*
            const onChangeSupTitle = value => {
                props.setAttributes( { supTitle: value } );
            };

            const onChangeTitle = value => {
                props.setAttributes( { mainTitle: value } );
            };

            const onChangeIntro = value => {
                props.setAttributes( { intro: value } );
            };

            const onChangeIntroAlignment = value => {
                props.setAttributes( { introAlignment: value } );
            };

            const onChangeBlockAlignment = value => {
                props.setAttributes( { width: value } );
            };

            const onChangeBlockBackgroundColor = value => {
                props.setAttributes( { blockBackgroundColor: value } );
            }

            const onChangeBlockBackgroundColor2 = value => {
                props.setAttributes( { blockBackgroundColor2: value } );
            }

            const onChangeBlockTextColor = value => {
                props.setAttributes( { blockTextColor: value } );
            }

            const onChangeBlockHrColor = value => {
                props.setAttributes( { blockHrColor: value } );
            }

            const onSelectImage = value => {
                props.setAttributes( {
                    imgID: value.id,
                    imgURL: value.url,
                    imgAlt: value.alt,
                } );
            }

            const onRemoveImage = () => {
                props.setAttributes({
                    imgID: null,
                    imgURL: null,
                    imgAlt: null,
                });
            }

            const onChangeImgAlignment = value => {
                props.setAttributes( { imgAlignment: value } );
            };

            const toggleDisplayText = () => {
                props.setAttributes( { displayText: ! props.attributes.displayText } );
            }

            const toggleDisplayImage = () => {
                props.setAttributes( { displayImage: ! props.attributes.displayImage } );
                
                if( ! props.attributes.displayImage ){
                    props.setAttributes( { imgID: null } );
                }
                
            }

            const onToggleHeadingLevel = () => {
                props.setAttributes( { toggleHeadingLevel: ! props.attributes.toggleHeadingLevel } );

                if( ! props.attributes.toggleHeadingLevel ){
                    props.setAttributes( { headingLevel: 'h1' } );
                }else{
                    props.setAttributes( { headingLevel: 'h2' } );
                }
            }*/

            const { attributes: { textAlignment, blockAlignment, message },
                attributes, isSelected, className, setAttributes } = props;

            let settings =  attributes;

            return [
                isSelected && <Inspector { ...{ setAttributes, ...props} } />,
                isSelected && <Controls { ...{ setAttributes, ...props } }/>,
                <div 
                    style={ {
                        backgroundColor: props.attributes.blockBackgroundColor,
                        background: [ `linear-gradient(to bottom left,${ props.attributes.blockBackgroundColor },${ props.attributes.blockBackgroundColor2 })` ],
                        color: props.attributes.blockTextColor,
                    } }
                    className={ classnames( 'wp-block-ttfb-chapter', {
                        [ `align${ props.attributes.width }` ]: props.attributes.width,
                    } ) }
                >
                    <div
                        className={ classnames(
                            'container-chapter',
                            'ml-auto',
                            'mr-auto',
                            'pt3',
                            'pb0',
                        ) }
                    >
                        <h2
                            style={ {
                                color: props.attributes.blockTextColor,
                                borderBottomColor: props.attributes.blockHrColor,
                            } }
                            className={ classnames(
                                'line-height-2',
                                'center',
                                'p0',
                                'm0',
                                'pb2',
                                'mb3',
                                'px2',
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
                                    onChange={ onChangeSupTitle }
                                    value={ props.attributes.supTitle }
                                />
                            </span>
                            <span
                                className={ classnames(
                                    'title',
                                    'weight200',
                                    'xxl-text',
                                ) }
                            >
                                <RichText
                                    tagName="div"
                                    placeholder={ __( 'Your main title' ) }
                                    onChange={ onChangeTitle }
                                    value={ props.attributes.mainTitle }
                                />
                            </span>
                        </h2>

                        <div
                            className={ classnames(
                                'md-flex'
                            ) }
                        >
                            { props.attributes.displayText ?
                                <div
                                    className={ classnames(
                                        'flex',
                                        'items-center',
                                        'justify-center',
                                        'flex-auto',
                                        'px2',
                                        'md-col-6',
                                    ) }
                                >
                                    <RichText
                                        tagName="div"
                                        multiline="p"
                                        placeholder={ __( 'Your content' ) }
                                        onChange={ onChangeIntro }
                                        value={ props.attributes.intro } 
                                        className={ classnames(
                                            'intro',
                                            'first-mt0',
                                            'last-mb0',
                                            'mb3',
                                        ) }
                                        style={ { 
                                            textAlign: props.attributes.introAlignment,
                                        } }
                                        focus={ props.focus }
                                    />
                                </div>
                            : null }

                            { props.attributes.displayImage ?
                                <div
                                    className={ classnames(
                                        'flex',
                                        'items-center',
                                        'justify-center',
                                        'flex-auto',
                                        'px2',
                                        'md-col-6',
                                    ) }
                                >
                                    { ! props.attributes.imgID ? (
                                    
                                        <div 
                                            className={ classnames(
                                                'mb3',
                                                'image-placeholder',
                                            ) }
                                        >
                                            <MediaUpload
                                                onSelect={ onSelectImage }
                                                type="image"
                                                value={ props.attributes.imgID }
                                                render={ ( { open } ) => (
                                                    <Button
                                                        className={ classnames(
                                                            "button button-large button-image"
                                                        ) }
                                                        onClick={ open }
                                                    >
                                                        { icons.upload }
                                                        { __( ' Upload Image') }
                                                    </Button>
                                                ) }
                                            >
                                                
                                            </MediaUpload>
                                        </div>

                                    ) : (

                                        <div class="relative">
                                            <img
                                                className={ classnames(
                                                    'mb3',
                                                ) }
                                                src={ props.attributes.imgURL }
                                                alt={ props.attributes.imgAlt }
                                            />

                                            { props.focus ? (
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
                            : null }
                        </div>

                    </div>
                </div>
            ];
        },

        save: props => {

            const Tag = props.attributes.headingLevel;

            return (
                <div
                    style={ {
                        backgroundColor: props.attributes.blockBackgroundColor,
                        background: [ `linear-gradient(to bottom left,${ props.attributes.blockBackgroundColor },${ props.attributes.blockBackgroundColor2 })` ],
                        color: props.attributes.blockTextColor,
                    } }
                    className={ classnames(
                        [ `align${ props.attributes.width }` ]
                    ) }
                >
                    <div
                        className={ classnames(
                            'container-chapter',
                            'ml-auto',
                            'mr-auto',
                            'pt3',
                            'pb0',
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
                                'px2',
                                'h2',
                            ) }
                            style={ {
                                color: props.attributes.blockTextColor,
                                borderBottomColor: props.attributes.blockHrColor,
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
                                { props.attributes.supTitle }
                            </span>
                            <span
                                className={ classnames(
                                    'title',
                                    'weight200',
                                    'xxl-text',
                                ) }
                            >{ props.attributes.mainTitle }</span>
                        </Tag>

                        <div
                            className={ classnames(
                                'md-flex'
                            ) }
                        >
                            { props.attributes.displayText ? 
                                <div
                                    className={ classnames(
                                        'flex',
                                        'items-center',
                                        'justify-center',
                                        'flex-auto',
                                        'px2',
                                        'md-col-6',
                                    ) }
                                    style={ { textAlign: props.attributes.introAlignment } }
                                >
                                    <div
                                        className={ classnames(
                                            'intro',
                                            'first-mt0',
                                            'last-mb0',
                                            'mb3',
                                        ) }
                                    >
                                        { props.attributes.intro }
                                    </div>
                                </div>
                            : null }
                            
                            { props.attributes.displayImage && props.attributes.imgURL ? 
                                <div 
                                    className={ classnames(
                                        'flex',
                                        'items-center',
                                        'justify-center',
                                        'flex-auto',
                                        'px2',
                                        'md-col-6',
                                    ) }
                                >
                                    <img
                                        className={ classnames(
                                            'mb3',
                                        ) }
                                        src={props.attributes.imgURL}
                                        alt={props.attributes.imgAlt}
                                    />
                                </div>
                            : null }
                            
                        </div>
                    </div>
                </div>
            );
        },
    },
);
