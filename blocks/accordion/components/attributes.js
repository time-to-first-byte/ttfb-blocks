const attributes = {
    accordionTitle: {
        type: 'string',
    },
    accordionText: {
        type: 'array',
        selector: '.ttfb-accordion-text',
        source: 'children',
    },
    accordionAlignment: {
        type: 'string',
    },
    accordionTextAlignment: {
        type: 'string',
    },
    accordionFontSize: {
        type: 'number',
        default: 18
    },
    accordionOpen: {
        type: 'boolean',
        default: false
    },
};

export default attributes;
