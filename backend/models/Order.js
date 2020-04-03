const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    id_of_prod: {
        type: String,
        required: true
    },
    qty: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    name_of_customer: {
        type: String,
        required: true
    },
    rated: {
        type: String,
        required: true
    }
});

const user = module.exports = mongoose.model('order', userschema);