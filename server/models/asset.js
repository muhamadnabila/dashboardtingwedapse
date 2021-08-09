const mongoose = require('mongoose')
const Schema = mongoose.Schema
let assetSchema = new Schema({
    cashAsset: {
        type: Number
    }
})
let Asset = mongoose.model('Asset', assetSchema)
module.exports = Asset