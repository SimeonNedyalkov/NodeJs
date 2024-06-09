const { forOFourController } = require('./controllers/404Controller')
const {aboutController} = require('./controllers/aboutController')
const {createController, createForm} = require('./controllers/createController')
const {detailsController} = require('./controllers/detailsController')
const {homeController} = require('./controllers/homeController')
const {searchController} = require('./controllers/searchController')

const router = require('express').Router()

router.get('/',homeController)
router.get('/create',createController)
router.post('/create',createForm)
router.get('/search',searchController)
router.get('/about',aboutController)
router.get('/details/:id',detailsController)
router.get('/**',forOFourController)
module.exports = {router}