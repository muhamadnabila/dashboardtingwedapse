const route = require('express').Router()
const { ControllerUsed } = require('../controllers')

route.get('/', ControllerUsed.findAll)
route.post('/', ControllerUsed.add)
route.put('/:id', ControllerUsed.update)
route.put('/', ControllerUsed.updateMany)
route.delete('/', ControllerUsed.deleteMany)
route.delete('/:id', ControllerUsed.delete)


module.exports = route