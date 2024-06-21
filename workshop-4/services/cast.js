const {Cast} = require('../models/Cast')
const { getMovieByIdlean } = require('./movie')
const {Movie} =require('../models/Movie')
// get all casts
async function getAllCast(){
    const cast = await Cast.find({}).lean()
    return cast
}
// get cast by id
async function getCastById(id){
    const cast = await Cast.findById(id).lean()
    return cast 
}
function uuid(){
    return 'xxxx-xxxx'.replace(/x/g,()=>(Math.random()*16|0).toString(16))
}
// Create cast
async function createCast(CastData){
    const id = uuid()
    const cast = new Cast({
        id,
        name : CastData.name,
        age : CastData.age,
        born : CastData.born,
        nameInMovie : CastData.nameInMovie,
        castImage : CastData.castImage,
        movie:CastData.movie
    })
    await cast.save()
    return cast
}

// Attach cast to movie
async function attachCastToMovieService(movieId,castId){
    const movie = await Movie.findById(movieId)
    console.log(movie)
    console.log(movie.cast)
    movie.cast.push(castId)
    await movie.save()
    return movie
}

module.exports = {
    getAllCast,
    getCastById,
    createCast,
    attachCastToMovieService
}