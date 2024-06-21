const {createMovie} = require('../services/movie.js')
const {deleteMovie} = require('../services/movie')
const { getMovieByIdlean,updateMovie } = require("../services/movie")
const {Router} = require('express')
const {isUser} = require('../middlewares/guards.js')
const {parseError} = require('../util.js')
const movieRouter = Router()
movieRouter.get('/create/movie',isUser(),(req,res)=>{
    res.render('create')
})
movieRouter.post('/create/movie',isUser(),async(req,res)=>{
    console.log(req.body)
    const authorId = req.user._id
    try{
        const result = await createMovie(req.body,authorId)
        res.redirect('/details/' + result._id)
    }catch(err){
        res.render('create',{movie:req.body,errors:parseError(err).errors})
    }
})
movieRouter.get('/edit/:id',isUser(),async(req,res)=>{
    const movieId = req.params.id
    let movie
    try{
        movie = await getMovieByIdlean(movieId)
        if(!movie){
            throw new Error('Movie not found')
        }
    }catch(err){
        res.render('404')
        return
    }
    const isAuthor = req.user._id == movie.author.toString()
    if(!isAuthor){
        res.redirect('/login')
        return
    }
    res.render('edit',{movie})
})
movieRouter.post('/edit/:id',isUser(),async(req,res)=>{
    console.log(req.body)
    const movieId = req.params.id
    const authorId = req.user._id
    const errors = {
        title:!req.body.title,
        genre:!req.body.genre,
        director:!req.body.director,
        year:!req.body.year,
        imageUrl:!req.body.imageUrl,
        rating:!req.body.rating,
        description:!req.body.description
    }
    if(Object.values(errors).includes(true)){
        res.render('edit',{movie:req.body,errors})
    }
    await updateMovie(movieId,authorId,req.body)
    res.redirect('/details/'+movieId)
})
movieRouter.get('/delete/:id',isUser(),async (req,res)=>{
    const movieId = req.params.id
    let movie
    try{
        movie = await getMovieByIdlean(movieId)
        if(!movie){
            throw new Error('Movie not found')
        }
    }catch(err){
        res.render('404')
        console.log(err)
        return
    }
    const isAuthor = req.user._id == movie.author.toString()
    if(!isAuthor){
        res.redirect('/login')
        return
    }
    res.render('delete',{movie})
})
movieRouter.post('/delete/:id',isUser(),async (req,res)=>{
    const movieId = req.params.id
    const userId = req.user._id
    await deleteMovie(movieId,userId)
    res.redirect('/')
})
module.exports = {movieRouter}