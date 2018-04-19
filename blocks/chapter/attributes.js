const attributes = {
    supTitle: {
        type: 'array',
        source: 'children',
        selector: '.sup-title',
    },
    mainTitle: {
        type: 'array',
        source: 'children',
        selector: '.main-title',
    },
    mainContent: {
        type: 'array',
        source: 'children',
        selector: '.main-content',
    },
    mainContentAlignment: {
        type: 'string',
    },
    blockBackgroundColor: {
        type: 'string',
        default: '#eee'
    },
    blockTextColor: {
        type: 'string',
        default: '#212121'
    },
    blockHrColor: {
        type: 'string',
        default: '#212121'
    },
    blockAlignment: {
        type: 'string',
        default: 'full',
    },
    blockId: {
        type: 'string',
    },
    blockLayout: {
        type: 'string',
		default: 'both',
    },
    blockImgURL: {
        type: 'string',
        source: 'attribute',
        attribute: 'src',
        selector: 'img',
    },
    blockImgID: {
        type: 'number',
    },
    blockImgAlt: {
        type: 'string',
        source: 'attribute',
        attribute: 'alt',
        selector: 'img',
    },
    nodeName: {
        type: 'string',
        source: 'property',
        selector: 'h1,h2,h3,h4,h5,h6',
        property: 'nodeName',
        default: 'H2',
    },
};

export default attributes;
