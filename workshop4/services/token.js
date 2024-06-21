const jwt = require('jsonwebtoken')

const secret = 'jwt secret'

function createToken(user){
    const payload = {
        _id:user._id,
        email:user.email
    }
    const token = jwt.sign(payload,secret,{expiresIn:'2d'})
    return token
}
function verifyToken(token){
    const tokenToReturn = jwt.verify(token,secret)
    return tokenToReturn
}

module.exports = {createToken,verifyToken}