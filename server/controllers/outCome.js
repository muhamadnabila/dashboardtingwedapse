const OutCome = require('../models/outCome')

class ControllerOutCome {
    static findAll(req,res,next) {
        let query = OutCome
        query = OutCome.find({
            created_at: {
                $gte: req.query.startDate.split('T')[0] + 'T00:00:00+07:00',
                $lte: req.query.endDate.split('T')[0] + 'T23:59:00+07:00',
            }
        })
        query
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static add(req,res,next) {
        OutCome.create(req.body)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static update(req,res,next) {
        OutCome.findOneAndUpdate(
            {_id: req.params.id},
            {...req.body},
            {new: true}
        )
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static delete(req,res,next) {
        OutCome.findOneAndDelete({
            _id: req.params.id
        })
        .then(data => {
            res.status(200).json({message: 'Delete Successfully'})
        })
        .catch(err => console.log(err))
    }
    static deleteMany(req,res,next) {
        OutCome.deleteMany()
        .then(data => {
            res.status(200).json({message: 'Delete All Successfully'})
        })
        .catch(err => console.log(err))
    }
}

module.exports = ControllerOutCome