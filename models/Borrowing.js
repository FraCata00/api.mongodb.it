const mongoose = require('mongoose');
const borrowingSchema = mongoose.Schema({
    borrowing: {
        type: Array,
        required: true,
        items: {
            type: Object,
            proprerties: {
                idPost: {
                    type: mongoose.Types.ObjectId
                },
                idCustomer: {
                    type: mongoose.Types.ObjectId
                }
            }
        }
    },

});

module.exports = mongoose.model('Borrowing', borrowingSchema);