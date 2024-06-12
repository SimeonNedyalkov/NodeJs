const fs = require('fs/promises')
const { Movie } = require('../models/Movie')
const { read, write } = require('fs')

const filePath = './config/database.json'


// get all movies
async function getAllMovies(){
    const movies = await Movie.find({}).lean()
    return movies
}
// get movie by id
async function getMovieByIdlean(id){
    return Movie.findById(id).lean().populate('cast')
}
async function getMovieByIdNOTlean(id){
    return Movie.findById(id)
}
function uuid(){
    return 'xxxx-xxxx'.replace(/x/g,()=>(Math.random()*16|0).toString(16))
}

// Create movie
async function createMovie(MovieData){
    const id = uuid()
    const movie = new Movie({
        id,
        title : MovieData.title,
        genre : MovieData.genre,
        director : MovieData.director,
        year : MovieData.year,
        imageURL : MovieData.imageURL,
        rating : MovieData.rating,
        description: MovieData.description,
    })
    await movie.save()
    return movie
}


module.exports = {
    getAllMovies,
    getMovieByIdlean,
    createMovie,
    getMovieByIdNOTlean
}