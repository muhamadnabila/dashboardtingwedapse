if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
    require('dotenv').config();
}
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const route = require('./routes')
const app = express()
const port = 3000

// let database = 'mongodb://localhost:27017/tingwedapse'
let database = 'mongodb+srv://root:root@cluster0.qtp0t.gcp.mongodb.net/tingwedapse?retryWrites=true&w=majority'
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true }, function(err){
    if(err) console.log(err,'connection error')
    else console.log('mongoose is connected')
})
mongoose.set('useFindAndModify', false)

app.use(cors())
app.use(express.urlencoded({extender: false}))
app.use(express.json())
app.use(express.static('public'))
app.use(route)
app.listen(process.env.PORT || 5000,() => {
    console.log(`'I love u: ${port}`)
})