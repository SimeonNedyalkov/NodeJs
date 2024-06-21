const {getMovieByIdlean,getMovieByIdNOTlean} = require('../services/movie')
const {getAllCast,getCastById,attachCastToMovieService} = require('../services/cast')

module.exports = {
    attachController:async(req,res)=>{
        const id = req.params.id
        const movie = await getMovieByIdlean(id)
        const allCasts = await getAllCast()
        res.render('attachCast',{movie,allCasts})
    },
    attachCastToMovie:async(req,res)=>{
        const movieId = req.params.id
        const chosenCastID = req.body.cast
        console.log('hello')
        if(!movieId || !chosenCastID){
            res.status(400).end()
            return
        }
        if(chosenCastID == 'none'){
            const movie = getMovieByIdlean(movieId)
            const allCasts = await getAllCast()
            res.render('cast-attach',{movie,allCasts})
        }
        attachCastToMovieService(movieId,chosenCastID)
        res.redirect('/details/' + movieId)
    }
}