const mongoose = require('mongoose');


const itemOptionsModel = mongoose.Schema({
    'token': {
        type: String
    },
    'formToken': {
        type: String
    },
    'stepsToken': {
        type: String
    },
    'itemToken': {
        type: String
    },
    'itemType': {
        type: String
    },
    'title': {
        type: String
    },
    'titleType': {
        type: String
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


module.exports = mongoose.model('itemOptionsModel', itemOptionsModel);