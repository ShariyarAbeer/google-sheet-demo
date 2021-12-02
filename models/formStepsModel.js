const mongoose = require('mongoose');


const formStepsSchema = mongoose.Schema({
    'token': {
        type: String
    },
    'formToken': {
        type: String
    },
    'title': {
        type: String
    },
    'details': {
        type: String
    },
    'previousStepsToken': {
        type: String
    },
    'nextStepsToken': {
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


module.exports = mongoose.model('formStepsSchema', formStepsSchema);