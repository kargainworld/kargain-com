const express = require('express')
const cors = require('cors')
const routes = express.Router()
const passportMiddleware = require('../middlewares/passport')
const paymentController = require('../controllers/payments.controller')
const corsMiddleware = require('../middlewares/cors.middleware')

routes.get('/secret/:intent_id',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    paymentController.getIntent
)

routes.options('/create-payment-intent', cors(corsMiddleware.clientCors)) // enable pre-flights
routes.post('/create-payment-intent',
    cors(corsMiddleware.clientCors),
    passportMiddleware.authenticate('cookie', { session: false }),
    paymentController.createPaymentIntent
)

routes.options('/create-user-subscription', cors(corsMiddleware.authedCors)) // enable pre-flights
routes.post('/create-user-subscription',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    paymentController.createUserSubscription
)

module.exports = routes
