const route = require('express').Router()
const { ControllerOutCome } = require('../controllers')

route.get('/', ControllerOutCome.findAll)
route.post('/', ControllerOutCome.add)
route.put('/:id', ControllerOutCome.update)
route.delete('/', ControllerOutCome.deleteMany)
route.delete('/:id', ControllerOutCome.delete)


module.exports = route