const {createMovie} = require('../services/movie.js')

module.exports = {
    createController:(req,res)=>{
        res.render('create')
    },
    createForm:async(req,res)=>{
        console.log(req.body)
        const result = await createMovie(req.body)
        console.log(result)
        res.redirect('/')
    }
}