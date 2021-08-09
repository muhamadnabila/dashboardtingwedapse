const route = require('express').Router()
const { ControllerTransaction } = require('../controllers')

route.get('/', ControllerTransaction.findAll)
route.post('/', ControllerTransaction.add)
route.put('/:id', ControllerTransaction.update)
route.put('/', ControllerTransaction.updateMany)
route.delete('/', ControllerTransaction.deleteMany)
route.delete('/:id', ControllerTransaction.delete)


module.exports = route