const Asset = require('../models/asset')

class ControllerAsset {
    static findAll(req,res,next) {
        Asset.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static add(req,res,next) {
        Asset.create(req.body)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static update(req,res,next) {
        Asset.findOneAndUpdate(
            {_id: req.params.id},
            {...req.body},
            {new: true}
        )
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static updateAsset(req,res,next) {
        Asset.findOneAndUpdate(
            {_id: req.params.id},
            {
                $inc: {
                    cashAsset: req.body.cashAsset
                }
            },
            {new: true}
        )
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static delete(req,res,next) {
        Asset.findOneAndDelete({
            _id: req.params.id
        })
        .then(data => {
            res.status(200).json({message: 'Delete Successfully'})
        })
        .catch(err => console.log(err))
    }
    static deleteMany(req,res,next) {
        Asset.deleteMany()
        .then(data => {
            res.status(200).json({message: 'Delete All Successfully'})
        })
        .catch(err => console.log(err))
    }
}

module.exports = ControllerAsset