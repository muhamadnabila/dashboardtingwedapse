const mongoose = require('mongoose')
const Schema = mongoose.Schema
let productSchema = new Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    amount: {
        type: Number,
        default: 0
    },
    modalPrice: {
        type: Number
    },
    totalSold: {
        type: Number,
        default: 0
    },
    totalUsed: {
        type: Number,
        default: 0
    },
    sellPriceRetail: {
        type: Number
    },
    sellPriceGrocery: {
        type: Number
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    },
    isShow: {
        type: Boolean,
        default: true
    }
})
let Product = mongoose.model('Product', productSchema)
module.exports = Product