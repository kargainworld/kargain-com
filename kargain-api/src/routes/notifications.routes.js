const cors = require('cors')
const router = require('express').Router()
const passportMiddleware = require('../middlewares/passport')
const corsMiddleware = require('../middlewares/cors.middleware')
const notificationsController = require('../controllers/notifications.controller')

router.get('/' )
router.get('/',
    
    passportMiddleware.authenticate('cookie', { session: false }),
    notificationsController.getCurrentUserNotifications
)

module.exports = router
