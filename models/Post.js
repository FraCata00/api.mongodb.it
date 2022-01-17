const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
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
postSchema.plugin(mongoosastic); // add Elasticsearch MongoDB plugin
//module.exports = mongoose.model('Posts', postSchema, 'posts'); // test API Failed

module.exports = mongoose.model('Posts', postSchema);


/*
Posts.search({
    query_string: {
        query: "Another books of Node.js, looke like the first and secondone"
    }
}, function(err, res) {
    const posts = Post.find();
    res.status(200).json(posts);
    //res.json({ message: err })
});
*/