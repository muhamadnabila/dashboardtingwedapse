const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Asset = require('./asset')

let outComeSchema = new Schema({
    source: {
        type: String
    },
    amount: {
        type: Number
    },
    description: {
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
outComeSchema.pre('save', function(next) {
    try{
        Asset.find()
        .then(data => {
            return Asset.findOneAndUpdate(
                {_id: data[0]._id}, 
                {
                    $inc: {
                        cashAsset: -this.amount,
                    },
                },
            )

        })
        .then(data =>{
            if(data) next()
            else next({code: 400, message: '3ror b@ngs@t!'})
        })
    }
    catch(err) {
        next(err)
    }
})
let OutCome = mongoose.model('OutCome', outComeSchema)
module.exports = OutCome