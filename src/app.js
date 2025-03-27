//*TO START SERVER => npm start

require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const { Dir } = require('fs');
const PORT = process.env.PORT;

//SERVER FUNCTIONS
app.set('view engine','pug')
app.set('views',path.join(__dirname,'/public/views'))

//STATIC FILES
app.use(express.static(path.join(__dirname,'/public')))

//ROUTERS
app.use(require('./routes/index.router'))

//LISTENING
app.listen(PORT,()=>{
    console.log(`SERVER LISTENING ON PORT ${PORT}`)
})