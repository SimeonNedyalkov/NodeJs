const express = require('express')
const hbsConfig = require('./config/hbsConfig.js')
const { router } = require('./routes')
const {expressConfig} = require('./config/expressConfig')
const {configDatabase} = require('./config/database.js')

const PORT = process.env.PORT || 3000


async function start(){
    const app = express()
    await configDatabase()
    hbsConfig.hbsConfig(app)
    expressConfig(app)
    app.use(router)
    
    app.listen(PORT,console.log(`The app is running on port: ${PORT}`))
}

start()
