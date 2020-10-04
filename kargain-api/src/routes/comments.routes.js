const express = require('express')
const cors = require('cors')
const routes = express.Router()
const passportMiddleware = require('../middlewares/passport')
const commentController = require('../controllers/comments.controller')
const corsMiddleware = require('../middlewares/cors.middleware')
const rolesMiddleware = require('../middlewares/roles.middleware')

routes.get('/:announce_id',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    rolesMiddleware.grantAccess('readAny', 'comment'),
    commentController.getCommentsByAnnounce
)

routes.options('/', cors(corsMiddleware.authedCors)) // enable pre-flights
routes.post('/',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    commentController.createComment
)

routes.options('/disable/:comment_id', cors(corsMiddleware.authedCors)) // enable pre-flights
routes.put('/disable/:comment_id',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    commentController.disableComment
)

routes.options('/enable/:comment_id', cors(corsMiddleware.authedCors)) // enable pre-flights
routes.put('/enable/:comment_id',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    commentController.enableComment
)

routes.options('/like/:comment_id', cors(corsMiddleware.authedCors)) // enable pre-flights
routes.put('/like/:comment_id',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    commentController.createCommentLike
)

routes.options('/unlike/:comment_id', cors(corsMiddleware.authedCors)) // enable pre-flights
routes.put('/unlike/:comment_id/:likeIndex',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    commentController.removeCommentLike
)

routes.options('/response', cors(corsMiddleware.authedCors)) // enable pre-flights
routes.post('/response',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    commentController.createCommentResponse
)

routes.options('/response/like/:comment_id/:responseIndex', cors(corsMiddleware.authedCors)) // enable pre-flights
routes.put('/response/like/:comment_id/:responseIndex',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    commentController.createCommentResponseLike
)

routes.options('/response/unlike/:comment_id/:responseIndex/:likeIndex', cors(corsMiddleware.authedCors)) // enable pre-flights
routes.put('/response/unlike/:comment_id/:responseIndex/:likeIndex',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    commentController.removeCommentResponseLike
)

module.exports = routes
