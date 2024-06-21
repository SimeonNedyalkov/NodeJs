// guards
const {isGuest,isUser} = require('./middlewares/guards')
// controllers
const { forOFourController } = require('./controllers/404Controller')
const {aboutController} = require('./controllers/aboutController')
const { attachController, attachCastToMovie } = require('./controllers/attachCastController')
const {createCastController, createCastPost} = require('./controllers/createCastController')
const {detailsController} = require('./controllers/detailsController')
const {homeController} = require('./controllers/homeController')
const {searchController} = require('./controllers/searchController')
const { userRouter } = require('./controllers/userController')
const { movieRouter } = require('./controllers/movieController')
const router = require('express').Router()

router.get('/',homeController)

// cast
router.get('/create/cast',isUser(),createCastController)
router.post('/create/cast',isUser(),createCastPost)
router.get('/attach/cast/:id',isUser(),attachController)
router.post('/attach/cast/:id',isUser(),attachCastToMovie)

router.use(userRouter)
router.use(movieRouter)
router.get('/search',searchController)
router.get('/about',aboutController)
router.get('/details/:id',detailsController)
router.get('/**',forOFourController)
module.exports = {router}