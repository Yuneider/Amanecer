//*TO START SERVER => npm start

const express = require('express')
const app = express()
const path = require('path')
const { Dir } = require('fs')

//SERVER FUNCTIONS
app.set('view engine','pug')
app.set('views',path.join(__dirname,'/public/views'))

//STATIC FILES
app.use(express.static(path.join(__dirname,'/public')))

//ROUTERS
app.use(require('./routes/index.router'))

//LISTENING
app.listen(3000,()=>{
    console.log('SERVER LISTENING')
})