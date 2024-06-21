const { register } = require("../services/user")
const {createToken} = require('../services/token')
const { login } = require("../services/user")
const {Router} = require('express')
const { isGuest } = require("../middlewares/guards")
const {body,validationResult} = require('express-validator')
const {parseError} = require('../util')
const userRouter = Router()
userRouter.get('/register',isGuest(),(req,res)=>{
        res.render('register')
    }),
    userRouter.post('/register',
        isGuest(),
        body('email').trim().isEmail().withMessage('Please enter a valid email'),
        body('password').trim().isAlphanumeric().isLength({min:6}).withMessage('Please enter a valid password and atleast 6 characters long'),
        body('RePassword').trim().custom((value,{req})=>{value == req.body.password}).withMessage('Passwords do not match'),
        async(req,res)=>{
        const {email,password} = req.body

        try{
            const result = validationResult(req)
            if(result.errors.length){
                throw result.errors
            }
            
            const user = await register(email, password)
            const token = createToken(user)
            res.cookie('token',token,{httpOnly:true})
            res.redirect('/')

        }catch(err){
            res.render('register',{data:{email},errors:parseError(err).errors})
            return
        }       
    }),
    userRouter.get('/login',isGuest(),
        body('email').trim().isEmail().withMessage('Please enter a valid email'),
        body('password').trim().isAlphanumeric().isLength({min:6}).withMessage('Please enter a valid password and atleast 6 characters long'),
    (req,res)=>{
        res.render('login')
    }),
    userRouter.post('/login',isGuest(),async (req,res)=>{
        const {email,password} = req.body
        try{
            const result = validationResult(req)
            if(result.errors.length){
                throw result.errors
            }
            const user = await login(email, password)
            const token = createToken(user)
            res.cookie('token',token,{httpOnly:true})
            res.redirect('/')

        }catch(err){
            res.render('login',{data:{email},errors:parseError(err).errors})
            return
        }
    }),
    userRouter.get('/logout',(req,res)=>{
        res.clearCookie('token')
        res.redirect('/')
    })


module.exports = {userRouter}