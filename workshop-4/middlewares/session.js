const { verifyToken } = require("../services/token")

function session(){
    return function(req,res,next){
        const token = req.cookies.token
        try{
            const payload = verifyToken(token)
            req.user = payload
            res.locals.hasUser = true
        }catch(err){
            res.clearCookie(token)
            res.locals.hasUser = false
        }
        next()
    }
}
module.exports={
    session
}