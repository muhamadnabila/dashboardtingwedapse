const route = require('express').Router()
const product = require('./product')
const transaction = require('./transaction')
const outCome = require('./outCome')
const used = require('./used')
const asset = require('./asset')

route.get('/', (req,res,next) => {
    res.status(200).json({message: 'connect'})
})
route.use('/product', product)
route.use('/transaction', transaction)
route.use('/outCome', outCome)
route.use('/used', used)
route.use('/asset', asset)

module.exports = route