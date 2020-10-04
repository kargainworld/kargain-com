const express = require('express')
const cors = require('cors')
const routes = express.Router()
const passportMiddleware = require('../middlewares/passport')
const conversationController = require('../controllers/conversations.controller')
const corsMiddleware = require('../middlewares/cors.middleware')

routes.get('/',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    conversationController.getCurrentUserConversations
)

routes.get('/profile/:profileId',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    conversationController.getConversationsWithProfile
)

routes.options('/', cors(corsMiddleware.authedCors)) // enable pre-flights
routes.post('/',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    conversationController.postConversationMessage
)

module.exports = routes
