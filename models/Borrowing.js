const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const borrowingSchema = mongoose.Schema({
    borrowing: {
        type: Array,
        required: true,
        items: {
            type: Object,
            proprerties: {
                idPost: {
                    type: mongoose.Types.ObjectId,
                    es_indexed: true
                },
                idCustomer: {
                    type: mongoose.Types.ObjectId,
                    es_indexed: true
                },
                date: {
                    type: Date,
                    default: Date.now,
                    es_indexed: true
                },
                unit: {
                    type: Number,
                    es_indexed: true
                }
            }
        }
    },

});

borrowingSchema.plugin(mongoosastic);
module.exports = mongoose.model('Borrowing', borrowingSchema);