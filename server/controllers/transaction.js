const Transaction = require('../models/transaction')
const Product = require('../models/product')
const Asset = require('../models/asset')

class ControllerTransaction {
    static findAll(req,res,next) {
        let query = Transaction
        query = Transaction.find({
            created_at: {
                $gte: req.query.startDate.split('T')[0] + 'T00:00:00+07:00',
                $lte: req.query.endDate.split('T')[0] + 'T23:59:00+07:00',
            }
        })
        query
        .populate("productId")
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static add(req,res,next) {
        Product.findById({
            _id: req.body.productId
        })
        .then(data =>{
            let price = 0
            let totalPrice = 0
            let modalPrice = data.modalPrice
            if(req.body.isSoldFrom === 'retail'){
                totalPrice = data.sellPriceRetail * req.body.amount
                price = data.sellPriceRetail
            }else if(req.body.isSoldFrom === 'grocery'){
                price = data.sellPriceGrocery
                totalPrice = data.sellPriceGrocery * req.body.amount
            }else if(req.body.isSoldFrom === 'custom retail'){
                if(req.body.customPrice == 0){
                    res.status(500).json({message: 'Masukin harganya b@ngs@t'})
                    return;                    
                }else {
                    price = req.body.customPrice
                    totalPrice = req.body.customPrice * req.body.amount
                }
            }
            Asset.find()
            .then(data => {
                return Asset.findOneAndUpdate(
                    {_id: data[0]._id},
                    {
                        $inc: {
                            cashAsset: totalPrice
                        }
                    },
                )
            })
            return Transaction.create({...req.body, price, modalPrice})
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)

    }
    static update(req,res,next) {
        Transaction.findOneAndUpdate(
            {_id: req.params.id},
            {...req.body},
            {new: true}
        )
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static updateMany(req,res,next) {
        Transaction.find()
        .populate("productId")
        .then(data => {
            Transaction
            .bulkWrite(data.map(doc => ({
                updateOne: {
                    filter: {_id: doc._id},
                    update: {
                        modalPrice: doc.productId.modalPrice,
                        productName: doc.productId.name
                    }
                }
            })))
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static delete(req,res,next) {
        Transaction.findOneAndDelete({
            _id: req.params.id
        })
        .then(data => {
            res.status(200).json({message: 'Delete Successfully'})
        })
        .catch(err => console.log(err))
    }
    static deleteMany(req,res,next) {
        Transaction.deleteMany()
        .then(data => {
            res.status(200).json({message: 'Delete All Successfully'})
        })
        .catch(next)
    }
}

module.exports = ControllerTransaction