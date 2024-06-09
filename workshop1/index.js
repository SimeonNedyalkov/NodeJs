const express = require('express')
const hbsConfig = require('./hbsConfig')
const { router } = require('./routes')
const {expressConfig} = require('./expressConfig')

const PORT = 3000

const app = express()

hbsConfig.hbsConfig(app)
expressConfig(app)

app.use(router)


app.listen(PORT,console.log(`The app is running on port: ${PORT}`))