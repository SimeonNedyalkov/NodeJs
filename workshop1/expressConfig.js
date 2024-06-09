const {urlencoded,static:staticHandler} = require('express')
const path = require('path')

function expressConfig(app){
    // TODO
    app.use(urlencoded({extended:true}))
    app.use('/static',staticHandler('static'))
}

module.exports = {expressConfig}