//const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        es_indexed: true
    },
    description: {
        type: String,
        required: true,
        es_indexed: true
    },
    page: {
        type: String,
        required: true,
        es_indexed: true
    },
    date: {
        type: Date,
        default: Date.now,
        es_indexed: true
    },
    unit: {
        type: Number,
        required: true,
        es_indexed: true
    }
});
postSchema.plugin(mongooseastic); // add Elasticsearch MongoDB plugin
module.exports = mongoose.model('Posts', postSchema);