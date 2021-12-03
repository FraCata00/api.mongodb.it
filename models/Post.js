//const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    page: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    unit: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Posts', postSchema);