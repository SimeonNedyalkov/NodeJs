const data = require('../config/database.json')
const { getMovieById } = require('../services/movie')
module.exports = {
    detailsController: async (req,res)=>{
        const id = req.params.id
        
        const movie = await getMovieById(id)
        if(!movie){
            res.render('404')
            return
        }
        console.log(movie)
        res.render('details',{movie})
        
        
    }
}
