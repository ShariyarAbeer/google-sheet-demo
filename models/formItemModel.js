const mongoose = require('mongoose');


const formItemSchema = mongoose.Schema({
    'token': {
        type: String
    },
    'formToken': {
        type: String
    },
    'stepsToken': {
        type: String
    },
    'image': {
        type: String
    },
    'title': {
        type: String
    },
    'inputType': {
        type: String
    },
    'require': {
        type: Number
    },

    'status': {
        type: String
    },
    'existence': {
        type: Number
    },
    'createBy': {
        type: String
    },
    'sessionToken': {
        type: String
    },

}, {
    timestamps: true,
})


module.exports = mongoose.model('formItemSchema', formItemSchema);