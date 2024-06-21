const data = require('../config/database.json')
const { getMovieByIdlean } = require('../services/movie')
module.exports = {
    detailsController: async (req,res)=>{
        const id = req.params.id
        const movie = await getMovieByIdlean(id)
        if(!movie){
            res.render('404')
            return
        }
        movie.isAuthor = req.user && req.user._id == movie.author.toString()
        res.render('details',{movie})
    }
}
