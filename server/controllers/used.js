const Used = require('../models/used')

class ControllerUsed {
    static findAll(req,res,next) {
        let query = Used
        query = Used.find({
            created_at: {
                $gte: req.query.startDate.split('T')[0] + 'T00:00:00+07:00',
                $lte: req.query.endDate.split('T')[0] + 'T23:59:00+07:00',
            }
        })
        query
        .populate('productId')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static add(req,res,next) {
        Used.create(req.body)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static update(req,res,next) {
        Used.findOneAndUpdate(
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
        Used.find()
        .populate("productId")
        .then(data => {
            Used
            .bulkWrite(data.map(doc => ({
                updateOne: {
                    filter: {_id: doc._id},
                    update: {
                        modalPrice: doc.productId.modalPrice,
                        productName: doc.productId.name,
                        sellPriceRetail: doc.productId.sellPriceRetail
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
        Used.findOneAndDelete({
            _id: req.params.id
        })
        .then(data => {
            res.status(200).json({message: 'Delete Successfully'})
        })
        .catch(err => console.log(err))
    }
    static deleteMany(req,res,next) {
        Used.deleteMany()
        .then(data => {
            res.status(200).json({message: 'Delete All Successfully'})
        })
        .catch(err => console.log(err))
    }
}

module.exports = ControllerUsed