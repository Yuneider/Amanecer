const controller = {}
const path = require('path')

let navItemSelected

controller.index = (req,res)=>{
    navItemSelected = 'login'
    res.render('login',{navItemSelected})
}

controller.sign_in = (req,res)=>{
    navItemSelected = 'signin'
    res.render('signin',{navItemSelected})
}

module.exports = controller