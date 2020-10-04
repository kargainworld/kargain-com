const router = require('express').Router()
const cors = require('cors')
const corsMiddleware = require('../middlewares/cors.middleware')
const authMiddleware = require('../middlewares/auth.middleware')
const searchController = require('../controllers/search.controller')

router.get('/',
    corsMiddleware.manualCors,
    authMiddleware.byPassAuth(),
    searchController.filterSearchAction()
)

module.exports = router
