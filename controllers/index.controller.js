const controller = {}
const path = require('path')
const tittle = 'INDEX CON PUG TEST'

controller.index = (req,res)=>{
    res.render('index')
}

module.exports = controller