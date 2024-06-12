const data = require('../config/database.json')
const {getAllMovies} = require('../services/movie.js')
module.exports = {
    homeController:async (req,res)=>{
        const movies = await getAllMovies()
        res.render('home',{movies})
    }
}