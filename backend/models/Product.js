const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    qty: {
        type: String,
        required: true
    },
    ordered: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const user = module.exports = mongoose.model('product', userschema);