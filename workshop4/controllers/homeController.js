const data = require('../config/database.json')
const {getAllMovies} = require('../services/movie.js')
const jwt = require('jsonwebtoken')
module.exports = {
    homeController:async (req,res)=>{
        const movies = await getAllMovies()
        for(movie of movies){
            movie.isAuthor = req.user && req.user._id == movie.author.toString()
        }
        res.render('home',{movies})
    }
}