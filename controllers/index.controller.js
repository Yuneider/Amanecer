const controller = {}
const path = require('path')

let navItemSelected

controller.index = (req,res)=>{
    navItemSelected = 'log_in'
    res.render('log_in',{navItemSelected})
}

controller.sign_in = (req,res)=>{
    navItemSelected = 'sign_in'
    res.render('sign_in',{navItemSelected})
}

module.exports = controller