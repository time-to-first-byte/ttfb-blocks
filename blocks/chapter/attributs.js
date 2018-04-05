const attributes = {
    supTitle: {
        type: 'array',
        source: 'children',
        selector: '.sup-title',
    },
    mainTitle: {
        type: 'array',
        source: 'children',
        selector: '.title',
    },
    intro: {
        type: 'array',
        source: 'children',
        selector: '.intro',
    },
    introAlignment: {
        type: 'string',
    },
    width: {
        type: 'string',
        default: 'full',
    },
    blockBackgroundColor: {
        type: 'string',
        default: '#413d52'
    },
    blockBackgroundColor2: {
        type: 'string',
        default: '#875298'
    },
    blockTextColor: {
        type: 'string',
        default: '#ffffff'
    },
    blockHrColor: {
        type: 'string',
        default: '#ffffff'
    },
    imgURL: {
        type: 'string',
        source: 'attribute',
        attribute: 'src',
        selector: 'img',
    },
    imgID: {
        type: 'number',
    },
    imgAlt: {
        type: 'string',
        source: 'attribute',
        attribute: 'alt',
        selector: 'img',
    },
    imgAlignment: {
        type: 'string',
    },
    headingLevel: {
        type: 'string',
        default: 'h2',
    },
    toggleHeadingLevel: {
        type: 'boolean',
        default: false,
    },
    displayText: {
        type: 'boolean',
        default: true,
    },
    displayImage: {
        type: 'boolean',
        default: true,
    },
};

export default attributes;
