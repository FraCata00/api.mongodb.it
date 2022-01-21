const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        es_indexed: true
    },
    surname: {
        type: String,
        required: true,
        es_indexed: true
    },
    age: {
        type: Number,
        required: true,
        es_indexed: true
    },
    username: {
        type: String,
        required: true,
        es_indexed: true
    },
    email: {
        type: String,
        required: true,
        es_indexed: true
    },
    password: {
        type: String,
        required: true,
        es_indexed: true
    }
});

customerSchema.plugin(mongoosastic);
module.exports = mongoose.model('Customer', customerSchema);