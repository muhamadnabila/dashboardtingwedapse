const Product = require('../models/product')

class ControllerProduct {
    static findAll(req,res,next) {
        Product.find()
        .sort({name: 1})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static add(req,res,next) {
        Product.create(req.body)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static update(req,res,next) {
        Product.findOneAndUpdate(
            {_id: req.params.id},
            {...req.body},
            {new: true}
        )
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static updateStock(req,res,next) {
        Product.findById({_id: req.params.id})
        .then(data =>{
            let amountResult = data.amount
            let modalPriceResult = data.modalPrice
            amountResult += Number(req.body.amount)
            if(req.body.modalPrice != 0) {
                modalPriceResult = ((data.amount * data.modalPrice) + (Number(req.body.modalPrice) * Number(req.body.amount))) / amountResult
            }
            return Product.findOneAndUpdate(
                {_id: req.params.id},
                {
                    amount: amountResult,
                    modalPrice: Math.round(modalPriceResult),
                    updated_at: req.body.updated_at
                },
                {new: true}

            )
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static delete(req,res,next) {
        Product.findOneAndDelete({
            _id: req.params.id
        })
        .then(data => {
            res.status(200).json({message: 'Delete Successfully'})
        })
        .catch(err => console.log(err))
    }
    static deleteMany(req,res,next) {
        Product.deleteMany()
        .then(data => {
            res.status(200).json({message: 'Delete All Successfully'})
        })
        .catch(err => console.log(err))
    }
}

module.exports = ControllerProduct