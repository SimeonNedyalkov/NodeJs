const mongoose = require('mongoose')
const Cast = require('../models/Cast')
const {Movie} = require('../models/Movie')
const {User} = require('../models/User')

const connectionString = 'mongodb://localhost:27017/movie-magic'
async function configDatabase(){
    await mongoose.connect(connectionString)
    // await migrateMovies()
}
// async function migrateMovies() {
//     const firstUser = await User.findOne()
//     await Movie.updateMany( {} , { $set:{author:firstUser._id} })
// }

module.exports = {configDatabase}