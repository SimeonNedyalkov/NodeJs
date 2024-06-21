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
async function createMovie(MovieData,authorId){
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
        author:authorId
    })
    await movie.save()
    return movie
}

// update movie
async function updateMovie(movieId,authorId,MovieData){
    const movie = await Movie.findById(movieId)
    if(!movie){
        throw new Error(`Movie with ${movieId} not found!` )
    }
    if(movie.author.toString() != authorId){
        throw new Error('Access denied')
    }
    movie.title = MovieData.title;    
    movie.genre = MovieData.genre;
    movie.director = MovieData.director;
    movie.year = MovieData.year;
    movie.imageURL = MovieData.imageURL;
    movie.rating = MovieData.rating;
    movie.description= MovieData.description;
    await movie.save()
    return movie
}

// delete movie
async function deleteMovie(movieId,userId){
    const movie = await Movie.findById(movieId)
    if(!movie){
        throw new Error(`Movie with ${movieId} not found!` )
    }
    if(movie.author.toString() != userId){
        throw new Error('Access denied')
    }
    await Movie.findByIdAndDelete(movieId)
}

module.exports = {
    getAllMovies,
    getMovieByIdlean,
    createMovie,
    getMovieByIdNOTlean,
    updateMovie,
    deleteMovie
}