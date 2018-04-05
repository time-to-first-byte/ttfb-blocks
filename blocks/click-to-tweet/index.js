/**
 * Block dependencies
 */
//import classnames from 'classnames';

import classnames from 'classnames';
import Inspector from './inspector';
import Controls from './controls';


import icon from './icon';
import './style.scss';
import './editor.scss';


/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
    registerBlockType,
    Editable,
    AlignmentToolbar,
    BlockControls,
    BlockAlignmentToolbar,
    RichText,
} = wp.blocks;



/**
 * Register block
 */
export default registerBlockType(
    'ttfb/click-to-tweet',
    {
        title: __( 'Click to Tweet' ),
        category: 'common',
        icon: icon,
        keywords: [
            __( 'Tweet tweeter' ),
            __( 'Click to share' ),
        ],
        attributes: {
          tweet: {
            type: 'array',
            source: 'children',
            selector: '.tweet-body',
          },
          alignment: {
            type: 'string',
          },
          tweetURI: {
            type: 'string',
          },
        },



        /*getEditWrapperProps( attributes ) {
            const { tweet } = attributes;
            //const { alignment } = attributes;
            const props = {};
    
            props[ 'data-tweet' ] = tweet;
    
            return props;
        },*/

        edit: props => {
          const onChangeTweet = value => {
            props.setAttributes( { tweet: value } );
            props.setAttributes( { tweetURI: 'https://twitter.com/home?status=' + encodeURIComponent( value)  } );
          };

          const onChangeAlignment = value =>  {
            props.setAttributes( { alignment: value } );
          }

          

          return [
             !! props.focus && (
                <BlockControls key="controls">
                    <AlignmentToolbar
                        value={ props.attributes.alignment }
                        onChange={ onChangeAlignment }
                    />
                </BlockControls>
            ),
            <div 
                className={ props.className }
                style={ {
                    textAlign: props.attributes.alignment,
                } }
            >
              <Editable
                tagName="span"
                //formattingControls={"bold italic"}
                placeholder={ __( 'Add your custom tweet' ) }
                onChange={ onChangeTweet }
                value={ props.attributes.tweet } 
                style={ {
                    textAlign: props.attributes.alignment,
                } }
                focus={ props.focus }
                onFocus={ props.setFocus }
      				/>
                <div className={ 'ttfb-click-to-tweet-label' }>
                    { icon } <span>{ __( 'Click to Tweet' ) }</span>
                </div>
            </div>
          ];
        },
        
        save: props => {
            
            return (
                
            <div 
                style={ {
                    textAlign: props.attributes.alignment,
                } }
            >
                <a target="_blank" rel="noopener noreferrer nofollow" 
                    href={ props.attributes.tweetURI }
                >
                    <span class="tweet-body">{ props.attributes.tweet }</span>
                    <div class={ 'ttfb-click-to-tweet-label' }>
                        { icon } <span>{ __( 'Click to Tweet' ) } </span>
                    </div>
                </a>
            </div>
          );
        },
    },
);
