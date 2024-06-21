const {User} = require('../models/User')
const bcrypt = require('bcrypt')

async function register(email, password){
    // check if user exists -> throw error if true
    const existing = await User.findOne({email})
    if(existing){
        throw new Error('Email is already existing')
    }
    const user = new User({
        email,
        password:await bcrypt.hash(password,10)
    })
    await user.save()
    return user
    
    // hash password
    // create DB record
    // save record
}
async function login(email, password){
    // check if user exists -> throw error if true
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Email or password incorrect')
    }
        // check hashed password
    const match = await bcrypt.compare(password,user.password)
    
    if(!match){
        throw new Error('Email or password incorrect')
    }
    
    return user

    // return matched user
}
async function logout(){
    
}





module.exports = {
    register,
    login,
    logout,
}