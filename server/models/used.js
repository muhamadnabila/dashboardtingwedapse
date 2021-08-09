const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = require('./product')

let usedSchema = new Schema({
    amount: {
        type: Number
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    created_at: {
        type: String
    },
    modalPrice: {
        type: Number
    },
    productName: {
        type: String
    },
    sellPriceRetail: {
        type: Number
    },
    isShow: {
        type: Boolean,
        default: true
    }
})
usedSchema.pre('save', function(next) {
    try{
        Product.findOneAndUpdate(
            {_id: this.productId}, 
            {
                $inc: {
                    amount: -this.amount,
                    totalUsed: this.amount
                },
            },
        )
        .then(data =>{
            if(data) next()
            else next({code: 400, message: '3ror b@ngs@t!'})
        })
    }
    catch(err) {
        next(err)
    }
})
usedSchema.post('findOneAndDelete', function(doc, next) {
    try{
        Product.findOneAndUpdate(
            {_id: doc.productId},
            {
                $inc: {
                    amount: doc.amount,
                    totalUsed: -doc.amount
                },
            },
        )
        .then(data =>{
            next()
        })
    }
    catch(err){
        next(err)
    }
})
let Used = mongoose.model('Used', usedSchema)
module.exports = Used