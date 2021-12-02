const mongoose = require('mongoose');


const formSchema = mongoose.Schema({
    'token': {
        type: String
    },
    'title': {
        type: String
    },
    'details': {
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


module.exports = mongoose.model('formSchema', formSchema);