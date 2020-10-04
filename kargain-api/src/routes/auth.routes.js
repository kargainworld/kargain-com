const cors = require('cors')
const router = require('express').Router()
const corsMiddleware = require('../middlewares/cors.middleware')
const authMiddleware = require('../middlewares/auth.middleware')
const passportMiddleware = require('../middlewares/passport')
const authController = require('../controllers/auth.controller')

router.get('/authorize',
    corsMiddleware.manualCors,
    authMiddleware.byPassAuth(['garage', 'favorites']),
    authController.authorizeAction
)

router.options('/sso-register', cors(corsMiddleware.authedCors))
router.post('/sso-register',
    corsMiddleware.manualCors,
    authController.ssoRegister,
    authController.loginAction
)

router.options('/login', cors(corsMiddleware.authedCors))
router.post('/login',
    corsMiddleware.manualCors,
    authController.loginValidation,
    passportMiddleware.authenticate('local', { session: false }),
    authController.loginAction
)

router.options('/register', cors(corsMiddleware.clientCors))
router.post('/register',
    cors(corsMiddleware.clientCors),
    authController.registerAction,
    authController.sendEmailActivation
)

router.options('/register-pro', cors(corsMiddleware.clientCors))
router.post('/register-pro',
    cors(corsMiddleware.clientCors),
    authController.registerProAction,
    authController.sendEmailActivation
)

router.options('/ask-email-activation', cors(corsMiddleware.clientCors))
router.post('/ask-email-activation',
    cors(corsMiddleware.clientCors),
    authController.findUserByEmailMiddleware,
    authController.sendEmailActivation
)

router.options('/confirm-account/:token', cors(corsMiddleware.clientCors))
router.put('/confirm-account/:token',
    cors(corsMiddleware.clientCors),
    authController.confirmEmailTokenAction
)

router.options('/logout', cors(corsMiddleware.authedCors))
router.post('/logout',
    corsMiddleware.manualCors,
    authController.logoutAction
)

router.options('/forgot-password', cors(corsMiddleware.clientCors))
router.post('/forgot-password',
    cors(corsMiddleware.clientCors),
    authController.forgotPasswordAction
)

router.options('/reset-password', cors(corsMiddleware.clientCors))
router.post('/reset-password',
    cors(corsMiddleware.clientCors),
    authController.resetPasswordAction
)

module.exports = router
