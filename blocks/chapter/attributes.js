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
    intro: {
        type: 'array',
        source: 'children',
        selector: '.intro',
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
        type: 'number',
		default: 2,
    },
};

export default attributes;
