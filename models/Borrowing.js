const mongoose = require('mongoose');
const borrowingSchema = mongoose.Schema({
    borrowing: {
        type: Array,
        required: true,
        items: {
            type: Object,
            proprerties: {
                idPost: {
                    type: ObjectId
                },
                idCustomer: {
                    type: ObjectId
                }
            }
        }
    },

});

module.exports = mongoose.model('Borrowing', borrowingSchema);