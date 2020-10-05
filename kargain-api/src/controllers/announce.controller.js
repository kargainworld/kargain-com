const mongoose = require('mongoose')
const config = require('../config')
const AnnounceModel = require('../models').Announce
const UserModel = require('../models').User
const Errors = require('../utils/errors')
const Messages = require('../utils/messages')
const functions = require('../utils/helpers')
const allowedFieldsUpdatesSet = require('../utils/allowedFields')
const prepareFilters = require('../components/filters/prepareFilters')
const announcesSorterMapper = require('../components/filters/announcesSorterMapper')
const AnnounceMailer = require('../components/mailer').announces
const notifier = require('../components/notifications/notifier')

const DEFAULT_RESULTS_PER_PAGE = 10

exports.getAnnouncesAdminAction = async (req, res, next) => {
    const page = (req.query.page && parseInt(req.query.page) > 0) ? parseInt(req.query.page) : 1
    const { sort_by, sort_ord } = req.query
    let size = 50

    let sorters = {
        createdAt: -1
    }

    //sorter
    if (sort_by) {
        const sortBy = announcesSorterMapper[sort_by]
        const sortOrder = sort_ord ? sort_ord === 'ASC' ? 1 : -1 : -1

        if(sortBy && sortOrder){
            sorters = {
                [sortBy]: sortOrder,
                ...sorters
            }
        }
    }

    if (req.query.size && parseInt(req.query.size) > 0 && parseInt(req.query.size) < 500) {
        size = parseInt(req.query.size)
    }

    const skip = (size * (page - 1) > 0) ? size * (page - 1) : 0

    try {
        const rows = await AnnounceModel
            .find({}, '-damages')
            .skip(skip)
            .sort(sorters)
            .limit(size)
            .populate({
                path: 'manufacturer.make'
            })
            .populate({
                path: 'manufacturer.model'
            })
            .populate({
                path: 'user',
                select: '-followings -followers -favorites -garage'
            })
            .populate({
                path: 'comments',
                select: '-announce -responses -likes',
                populate: {
                    path: 'user',
                    select: '-followings -followers -favorites -garage'
                }
            })

        const total = await AnnounceModel
            .find()
            .estimatedDocumentCount()

        const data = {
            pages: Math.ceil(total / size),
            page,
            total,
            size,
            rows
        }

        return res.json({ success: true, data })
    } catch (err) {
        return next(err)
    }
}

exports.filterAnnouncesAction = (fetchProfile = false, fetchFeed = false, returnCount = false) => async (req, res, next) => {
    const { sort_by, sort_ord } = req.query
    const page = (req.query.page && parseInt(req.query.page) > 0) ? parseInt(req.query.page) : 1
    let size = DEFAULT_RESULTS_PER_PAGE
    let sorters = {
        createdAt: -1
    }

    const qSize = parseInt(req.query.size)
    if (qSize > 0 && qSize < 500) {
        size = qSize
    }

    const skip = (size * (page - 1) > 0) ? size * (page - 1) : 0

    //sorter
    if (sort_by) {
        const sortBy = announcesSorterMapper[sort_by]
        const sortOrder = sort_ord ? sort_ord === 'ASC' ? 1 : -1 : -1

        if(sortBy && sortOrder){
            sorters = {
                [sortBy]: sortOrder,
                ...sorters
            }
        }
    }

    let defaultQuery = {}

    //fetching single profile
    const user = req.query?.user?.toString() ?? req?.user?.id?.toString()
    const isSelf =  user && req?.user?.id?.toString() === user
    const isPro = Boolean(req.user?.isPro || false)

    if(!isPro) {defaultQuery.adType = {
        $ne : 'sale-pro'
    }}

    if(fetchProfile && user){
        defaultQuery = {
            ...defaultQuery,
            user
        }

        //restrict to published announces
        if(!isSelf){
            defaultQuery = {
                ...defaultQuery,
                visible: true,
                activated: true,
                status: 'active' //enum['deleted', 'archived', 'active']
            }
        }
    }

    //fetch public announces
    else{
        //fetch user feed profiles
        if(fetchFeed){
            const followingIds = req?.user?.followings ? req.user.followings.map(following => following.user) : []
            if(followingIds.length !== 0) {
                defaultQuery = {
                    ...defaultQuery,
                    user: { $in: followingIds }
                }
            }
        }
        //search in all announces
        else {
            defaultQuery = {
                ...defaultQuery,
                visible: true,
                activated: true,
                status: 'active' //enum['deleted', 'archived', 'active']
            }
        }
    }

    let query = prepareFilters(req.query, defaultQuery)

    const { MAKE, MODEL } = req.query
    let makesFilter = !Array.isArray(MAKE) ? [MAKE] : MAKE
    let modelsFilter = !Array.isArray(MODEL) ? [MODEL] : MODEL

    makesFilter = makesFilter
        .filter(make => typeof make === 'string')
        .map(make => make.toLowerCase())

    modelsFilter = modelsFilter
        .filter(model => typeof model === 'string')
        .map(model => model.toLowerCase())

    try {
        const rows = await AnnounceModel
            .find(query, '-damages')
            .skip(skip)
            .sort(sorters)
            .limit(size)
            .populate('images')
            .populate({
                path: 'manufacturer.make'
            })
            .populate({
                path: 'manufacturer.model'
            })
            .populate({
                path: 'user',
                select: '-followings -followers -favorites -garage'
            })
            .populate({
                path: 'comments',
                select: '-announce -responses -likes',
                populate: {
                    path: 'user',
                    select: '-followings -followers -favorites -garage'
                }
            })

        const filtered = rows
            .filter(row => makesFilter.length ? makesFilter.includes(row.manufacturer?.make?.make_slug) : true)
            .filter(row => modelsFilter.length ? modelsFilter.includes(row.manufacturer?.model?.model) : true)

        const total = await AnnounceModel.find(query).count()

        const data = {
            page,
            size,
            query,
            pages: Math.ceil(total / size),
            total : filtered.length,
            rows : !returnCount ? filtered : null
        }

        return res.json({ success: true, data })
    } catch (err) {
        return next(err)
    }
}

exports.getAnnounceBySlugAction = async (req, res, next) => {
    try {
        const announce = await AnnounceModel
            .findOne({ slug: req.params.slug })
            .populate('user')
            .populate({
                path : 'likes.user',
                select: 'avatarUrl firstname username lastname email'
            })
            .populate({
                path: 'manufacturer.make'
            })
            .populate({
                path: 'manufacturer.model'
            })
            .populate({
                path: 'comments',
                match: {
                    enabled: true
                },
                populate: {
                    path : 'user',
                    select: 'avatarUrl firstname username lastname email'
                }
            })

        if (announce) {
            const isSelf = req.user ? req?.user.id.toString() === announce.user.id.toString() : false
            const isAdmin = req.user ? req.user.isAdmin : false

            if (isAdmin || isSelf) {return res.json({
                success: true,
                data: {
                    announce,
                    isSelf,
                    isAdmin
                }
            })}

            const displayAd =
                announce.activated &&
                announce.visible &&
                announce.status === 'active'

            if (displayAd) {return res.json({
                success: true,
                data: {
                    announce
                }
            })}
        }
        return next(Errors.NotFoundError(Messages.errors.announce_not_found))
    } catch (err) {
        return next(err)
    }
}

exports.getBySlugAndNextAction = async (req, res, next) => {
    try {
        const announce = await AnnounceModel
            .findOne({ slug: req.params.slug })
            .populate({
                path: 'manufacturer.make'
            })
            .populate({
                path: 'manufacturer.model'
            })

        if (announce) {
            req.announce = announce
            return next()
        }
        return next(Errors.NotFoundError(Messages.errors.announce_not_found))
    } catch (err) {
        return next(err)
    }
}

exports.createAnnounceAction = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}

    const { vehicleType, manufacturer } = req.body

    //automatically disable announce
    const disable = req.user.garage.length >= req.user.config.garageLengthAllowed
    const modelMake = require('../models').Vehicles.Makes[`${vehicleType}s`]
    const modelModel = require('../models').Vehicles.Models[`${vehicleType}s`]
    let matchMake = null
    let matchModel = null

    try {
        if (modelMake && manufacturer?.make?.value){
            matchMake = await modelMake.findOne({
                _id : mongoose.Types.ObjectId(manufacturer?.make?.value)
            })

            if(modelModel && manufacturer?.year?.value){
                matchModel = await modelModel.findOne({
                    _id : mongoose.Types.ObjectId(manufacturer?.year?.value)
                })
            }
        }

        const manufacturerTitle = [
            manufacturer?.make?.label,
            manufacturer?.model?.label,
            manufacturer?.year?.label
        ].filter(part => part).join(' - ')

        let data = {
            ...req.body,
            user: req.user,
            title : manufacturerTitle,
            activated: false,
            visible: disable,
            makeRef : `${vehicleType}s_makes`,
            modelRef : `${vehicleType}s_models`,
            address : {
                ...req.body.address,
                housenumber : Number(req.body?.address?.housenumber ?? null)
            },
            manufacturer : {
                make : matchMake?._id,
                model : matchModel?._id
            }
        }

        console.log(data)

        const announce = new AnnounceModel(data)
        const doc = await announce.save()
        await UserModel.updateOne(
            { _id: req.user.id },
            {
                $addToSet: {
                    garage: doc._id
                }
            }
        )

        const announce_link = `${config.frontend}/announces/${doc.slug}`

        await AnnounceMailer.confirmCreateAnnounce({
            email: req.user.email,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            announce_link: announce_link,
            featured_img_link: doc?.images?.[0]?.location ?? 'https://kargain.s3.eu-west-3.amazonaws.com/uploads/2020/05/30670681-d44d-468e-bf82-533733bb507e.JPG',
            manufacturer: {
                make: doc?.manufacturer?.make?.label,
                model: doc?.manufacturer?.model?.label,
                generation: doc?.manufacturer?.generation?.label
            }
        })

        await notifier.postNotification({
            uid : req.user.id,
            message : 'Announce created',
            action : announce_link
        })

        return res.json({
            success: true,
            data: doc
        })
    } catch (err) {
        next(err)
    }
}

exports.updateAnnounceAction = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}

    const updatesSet = allowedFieldsUpdatesSet.reduce((carry, key) => {
        const value = functions.resolveObjectKey(req.body, key)
        if (value) {return { ...carry, [key]: value }}
        else {return carry}
    }, {})

    try {
        const doc = await AnnounceModel.updateOne(
            { slug: req.params.slug },
            { $set: updatesSet },
            {
                returnNewDocument: true,
                runValidators: true,
                context: 'query'
            }
        )

        const announce_link = `${config.frontend}/announces/${doc.slug}`
        await notifier.postNotification({
            uid : req.user.id,
            message : 'Announce updated',
            action : announce_link
        })

        return res.json({ success: true, data: doc })
    } catch (err) {
        return next(err)
    }
}

exports.removeAnnounceAction = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    try {
        const doc = await AnnounceModel.updateOne(
            { slug: req.params.slug },
            { $set: { status: 'deleted' } },
            {
                returnNewDocument: true,
                runValidators: true,
                context: 'query'
            }
        )

        await notifier.postNotification({
            uid : req.user.id,
            message : 'An announce had been removed'
        })

        return res.json({ success: true, data: doc })
    } catch (err) {
        return next(err)
    }
}

exports.updateAdminAnnounceAction = async (req, res, next) => {
    const { slug } = req.params
    const activated = Boolean(req.body?.activated)
    if (!slug) {return next(Errors.NotFoundError(Messages.errors.announce_not_found))}

    try {
        const doc = await AnnounceModel.findOneAndUpdate(
            { slug },
            { $set: req.body },
            {
                returnNewDocument: true,
                runValidators: true
            })
            .populate({
                path: 'manufacturer.make'
            })
            .populate({
                path: 'manufacturer.model'
            })
            .populate('user')

        const announce_link = `${config.frontend}/announces/${doc.slug}`
        if (activated) {

            //send activation success mail to announce owner
            await AnnounceMailer.successConfirmAnnounce({
                title: doc.title,
                email: doc.user.email,
                firstname: doc.user.firstname,
                lastname: doc.user.lastname,
                announce_link: announce_link,
                featured_img_link: doc?.images?.[0]?.location ?? 'https://kargain.s3.eu-west-3.amazonaws.com/uploads/2020/05/30670681-d44d-468e-bf82-533733bb507e.JPG'
            })

            await notifier.postNotification({
                uid : req.user.id,
                message : 'Announce activated',
                action : announce_link
            })

        } else {
            //send rejected activation mail to announce owner
            await AnnounceMailer.rejectedConfirmAnnounce({
                email: doc.user.email,
                firstname: doc.user.firstname,
                lastname: doc.user.lastname,
                announce_link: announce_link
            })

            await notifier.postNotification({
                uid : req.user.id,
                message : 'Announce rejected',
                action : announce_link
            })
        }

        return res.json({
            success: true,
            data: doc
        })

    } catch (err) {
        return next(err)
    }
}

exports.uploadImagesAction = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    if (!req.announce) {return next(Errors.NotFoundError(Messages.errors.announce_not_found))}

    const announce = req.announce

    if (req?.uploadedFiles?.images?.length !== 0) {
        if (!announce.images) {announce.images = []}
        announce.images = [...announce.images, ...req.uploadedFiles.images]
    }

    try {
        const doc = await announce.save()
        return res.json({ success: true, data: doc })
    } catch (err) {
        next(err)
    }
}

exports.addUserLikeActionAction = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    const { announce_id } = req.params
    try {
        const updatedAnnounce = await AnnounceModel.updateOne(
            { _id: announce_id },
            { $addToSet: { likes: { user: mongoose.Types.ObjectId(req.user.id) } } },
            {
                new : true,
                runValidators: true
            }
        )

        await UserModel.updateOne(
            { _id: req.user.id },
            { $addToSet: { favorites: announce_id } },
            { runValidators: true }
        )

        const announce_link = `${config.frontend}/announces/${updatedAnnounce.slug}`
        await notifier.postNotification({
            uid : updatedAnnounce.user,
            message : 'Announce updated',
            action : announce_link
        })

        return res.json({
            success: true,
            data: {}
        })
    } catch (err) {
        return next(err)
    }
}

exports.removeUserLikeActionAction = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    const { announce_id } = req.params
    try {
        const suppressionLike = await AnnounceModel.updateOne(
            { _id: announce_id },
            { $pull: { likes: { user : mongoose.Types.ObjectId(req.user.id) } } },
            { runValidators: true }
        )
        const suppressionFavorite = await UserModel.updateOne(
            { _id: req.user.id },
            { $pull: { favorites: announce_id } },
            { runValidators: true }
        )

        return res.json({
            success: true,
            data: {
                suppressionLike,
                suppressionFavorite
            }
        })
    } catch (err) {
        return next(err)
    }
}

exports.mailToShareAnnounce = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    if(!req.body.email) {return Errors.Error(Messages.errors.missing_or_invalid_email)}

    try {
        const announce = await AnnounceModel.findOne({ slug: req.params.slug })
        if(!announce) {return Errors.NotFoundError(Messages.errors.announce_not_found)}

        await AnnounceMailer.shareAnnounceLink({
            fromFullName: req.user.fullname,
            emailTo: req.body.email,
            announce_link: `${config.frontend}/announces/${announce.slug}`,
            featured_img_link: announce?.images?.[0]?.location ?? 'https://kargain.s3.eu-west-3.amazonaws.com/uploads/2020/05/30670681-d44d-468e-bf82-533733bb507e.JPG'
        })

        return res.json({ success: true, data: { msg : 'sent' }})

    } catch (err){
        return next(err)
    }
}
