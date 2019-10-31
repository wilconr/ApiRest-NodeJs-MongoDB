'use strict' // Usa el modo stricto en javaScript

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    name: String,
    picture: String,
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ['computers', 'phones', 'accesories']
    },
    description: String
});

module.exports = mongoose.model('Product', productSchema);