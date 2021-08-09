const route = require('express').Router()
const { ControllerAsset } = require('../controllers')

route.get('/', ControllerAsset.findAll)
route.post('/', ControllerAsset.add)
route.put('/:id', ControllerAsset.update)
route.put('/add/:id', ControllerAsset.updateAsset)
route.delete('/', ControllerAsset.deleteMany)
route.delete('/:id', ControllerAsset.delete)


module.exports = route