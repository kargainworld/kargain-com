const router = require('express').Router()
const cors = require('cors')
const corsMiddleware = require('../middlewares/cors.middleware')
const passportMiddleware = require('../middlewares/passport')
const authMiddleware = require('../middlewares/auth.middleware')
const rolesMiddleware = require('../middlewares/roles.middleware')
const announceController = require('../controllers/announce.controller')
const uploadController = require('../controllers/upload.s3.controller')

//admin
router.get('/all',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    rolesMiddleware.grantAccess('readAny', 'announce'),
    announceController.getAnnouncesAdminAction
)

router.get('/',
    corsMiddleware.manualCors,
    authMiddleware.byPassAuth({ populate: 'followings' }),
    announceController.filterAnnouncesAction(false)
)

router.get('/profile',
    corsMiddleware.manualCors,
    authMiddleware.byPassAuth(),
    announceController.filterAnnouncesAction(true, false, false)
)

router.get('/feed',
    corsMiddleware.manualCors,
    authMiddleware.byPassAuth(),
    announceController.filterAnnouncesAction(false, true, false)
)

router.get('/search',
    corsMiddleware.manualCors,
    authMiddleware.byPassAuth(),
    announceController.filterAnnouncesAction(false, false, false)
)

router.get('/count',
    corsMiddleware.manualCors,
    authMiddleware.byPassAuth(),
    announceController.filterAnnouncesAction(false, false, true)
)

router.get('/slug/:slug',
    corsMiddleware.manualCors,
    authMiddleware.byPassAuth(),
    announceController.getAnnounceBySlugAction
)

router.options('/', cors(corsMiddleware.authedCors)) // enable pre-flights
router.post('/',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    announceController.createAnnounceAction
)

router.options('/update/:slug', cors(corsMiddleware.authedCors)) // enable pre-flights
router.put('/update/:slug',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    announceController.updateAnnounceAction
)

router.options('/remove/:slug', cors(corsMiddleware.authedCors)) // enable pre-flights
router.delete('/remove/:slug',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    announceController.removeAnnounceAction
)

router.options('/addLike/:announce_id', cors(corsMiddleware.authedCors)) // enable pre-flights
router.put('/addLike/:announce_id',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    announceController.addUserLikeActionAction
)

router.options('/removeLike/:announce_id', cors(corsMiddleware.authedCors)) // enable pre-flights
router.put('/removeLike/:announce_id',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    announceController.removeUserLikeActionAction
)

router.options('/upload/:slug', cors(corsMiddleware.authedCors)) // enable pre-flights
router.post('/upload/:slug',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    announceController.getBySlugAndNextAction,
    uploadController.postObjects,
    announceController.uploadImagesAction
)

//ADMIN

router.options('/update/:slug', cors(corsMiddleware.authedCors)) // enable pre-flights
router.put('/update/:slug',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    rolesMiddleware.grantAccess('updateAny', 'announce'),
    announceController.updateAnnounceAction
)

router.options('/update-admin/:slug', cors(corsMiddleware.authedCors)) // enable pre-flights
router.put('/update-admin/:slug',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    rolesMiddleware.grantAccess('updateAny', 'announce'),
    announceController.updateAdminAnnounceAction
)

router.options('/mailto/:slug', cors(corsMiddleware.authedCors)) // enable pre-flights
router.post('/mailto/:slug',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    announceController.mailToShareAnnounce
)

module.exports = router
