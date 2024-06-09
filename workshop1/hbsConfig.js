const engine = require('express-handlebars')
const path = require('path')

function hbsConfig(app){
    const handlebars = engine.create({extname:'.hbs'})
    app.engine('.hbs',handlebars.engine)
    app.set('view engine','.hbs')
    
}


module.exports = { hbsConfig }