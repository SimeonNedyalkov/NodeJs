const mongoose = require('mongoose')

const connectionString = 'mongodb://localhost:27017/movie-magic'
async function configDatabase(){
    await mongoose.connect(connectionString)
}

module.exports = {configDatabase}