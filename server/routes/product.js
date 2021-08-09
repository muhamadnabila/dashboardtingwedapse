const route = require('express').Router()
const { ControllerProduct } = require('../controllers')

route.get('/', ControllerProduct.findAll)
route.post('/', ControllerProduct.add)
route.put('/:id', ControllerProduct.update)
route.put('/stock/:id', ControllerProduct.updateStock)
route.delete('/', ControllerProduct.deleteMany)
route.delete('/:id', ControllerProduct.delete)


module.exports = route