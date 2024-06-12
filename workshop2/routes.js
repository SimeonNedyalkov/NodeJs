const { forOFourController } = require('./controllers/404Controller')
const {aboutController} = require('./controllers/aboutController')
const { attachController, attachCastToMovie } = require('./controllers/attachCastController')
const {createCastController, createCastPost} = require('./controllers/createCastController')
const {createController, createForm} = require('./controllers/createController')
const {detailsController} = require('./controllers/detailsController')
const {homeController} = require('./controllers/homeController')
const {searchController} = require('./controllers/searchController')

const router = require('express').Router()

router.get('/',homeController)
// Get movie create new movie
router.get('/create/movie',createController)
router.post('/create/movie',createForm)
// Get cast create new cast 
router.get('/create/cast',createCastController)
router.post('/create/cast',createCastPost)
// /attach/cast/:id – should render the cast page about attaching new cast to a movie,
router.get('/attach/cast/:id',attachController)
router.post('/attach/cast/:id',attachCastToMovie)
// TODO HERE above
router.get('/search',searchController)
router.get('/about',aboutController)
router.get('/details/:id',detailsController)
router.get('/**',forOFourController)
module.exports = {router}