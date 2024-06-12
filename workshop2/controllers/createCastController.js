const {createCast} = require('../services/cast.js')
module.exports = {
    createCastController:(req,res)=>{
        res.render('createCast')
    },
    createCastPost:async(req,res)=>{
        await createCast(req.body)
        res.redirect('/')
    }
}