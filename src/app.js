const express = require('express');
const app = express();
const path = require('path');
const { Dir } = require('fs');

//CONFIG UTILITY
app.use(express.urlencoded({ extended: true }));

//SERVER FUNCTIONS
app.set('view engine','pug')
app.set('views',path.join(__dirname,'/public/views'))

//STATIC FILES
app.use(express.static(path.join(__dirname,'/public')))

//ROUTERS
app.use(require('./routes/authRoutes'))
app.use(require('./routes/landingRoutes'))

module.exports = app;