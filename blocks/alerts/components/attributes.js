const attributes = {
    alertTitle: {
        type: 'string',
    },
    alertText: {
        type: 'array',
        selector: '.ttfb-alert-text',
        source: 'children',
    },
    alertAlignment: {
        type: 'string',
        default: ""
    },
    selectedOption: {
        type: 'string',
        default: "One"
    },
    alertFontSize: {
        type: 'number',
        default: 18
    },
    alertOpen: {
        type: 'boolean',
        default: false
    },
};

export default attributes;
