const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = require('./product')
const Asset = require('./asset')

let transactionSchema = new Schema({
    price: {
        type: Number
    },
    modalPrice: {
        type: Number
    },
    productName: {
        type: String
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    amount: {
        type: Number
    },
    isSoldFrom:{
        type: String
    },
    created_at: {
        type: String
    },
    isShow: {
        type: Boolean,
        default: true
    }
})
transactionSchema.pre('save', function(next) {
    try{
        Product.findOneAndUpdate(
            {_id: this.productId}, 
            {
                $inc: {
                    amount: -this.amount,
                    totalSold: this.amount
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
transactionSchema.post('findOneAndDelete', function(doc, next) {
    try{
        Product.findOneAndUpdate(
            {_id: doc.productId},
            {
                $inc: {
                    amount: doc.amount,
                    totalSold: -doc.amount
                },
            },
        )
        .then(data =>{
            return Asset.find()
        })
        .then(data =>{
            return Asset.findOneAndUpdate(
                {_id: data[0]._id},
                {
                    $inc: {
                        cashAsset: -doc.price * doc.amount
                    },
                },
            )
        })
        .then(data =>{
            next()
        })
    }
    catch(err){
        next(err)
    }
})
let Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction