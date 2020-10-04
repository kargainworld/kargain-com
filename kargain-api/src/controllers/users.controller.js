const moment = require('moment')
const Errors = require('../utils/errors')
const Messages = require('../utils/messages')
const functions = require('../utils/helpers')
const UserModel = require('../models').User
const AnnounceModel = require('../models').Announce
const NewsletterSubscriber = require('../models').NewsletterSubscriber
const ContactMessage = require('../models').ContactMessage
const usersMailer = require('../components/mailer').users

exports.getUsersAdminAction = async (req, res, next) => {
    const page = (req.query.page && parseInt(req.query.page) > 0) ? parseInt(req.query.page) : 1
    let size = 50
    
    let sorters = {
        createdAt: -1
    }
    
    if (req.query.size && parseInt(req.query.size) > 0 && parseInt(req.query.size) < 500) {
        size = parseInt(req.query.size)
    }
    
    const skip = (size * (page - 1) > 0) ? size * (page - 1) : 0
    
    try {
        const total = await UserModel.estimatedDocumentCount().exec()
        const rows = await UserModel
            .find({
                $or: [
                    { removed: false },
                    { removed: { $exists: false } }
                ]
            }, '-location -favorites')
            .skip(skip)
            .sort(sorters)
            .limit(size)
        
        const data = {
            page: page,
            pages: Math.ceil(total / size),
            total,
            size: size,
            rows
        }
        return res.json({ success: true, data })
    } catch (err) {
        return next(err)
    }
}

exports.getUserByUsername = async (req, res, next) => {
    const username = req.params.username
    const isSelf = req.user?.username === username
    const isAdmin = req.user?.isAdmin
    
    //means visitor
    const garageFilters = (!isSelf && !isAdmin) ? {
        activated: true,
        visible: true,
        status: 'active'
    } : {}
    
    try {
        const user = await UserModel.findOne({
            username,
            $or: [
                { removed: false },
                { removed: { $exists: false } }
            ]}
        )
            .populate({
                path: 'favorites',
                populate: 'comments',
                match: garageFilters
            })
            .populate({
                path: 'followers.user',
                model: 'User',
                select: 'avatarUrl firstname username lastname email'
            })
            .populate({
                path: 'followings.user',
                model: 'User',
                select: 'avatarUrl firstname username lastname email'
            })
            .populate({
                path: 'garage',
                populate: 'user comments',
                match: garageFilters
            })
        
        if (!user) {return next(Errors.NotFoundError(Messages.errors.user_not_found))}
        
        return res.json({
            success: true,
            data: {
                isAdmin,
                isSelf,
                user
            }
        })
    } catch (err) {
        next(err)
    }
}

exports.saveAuthedUser = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    try {
        const doc = await req.user.save()
        return res.status(200).json({ success: true, data: doc })
    } catch (err) {
        next(err)
    }
}

exports.saveUserByUsername = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ username: req.params.username })
        if (!user) {return next(Errors.NotFoundError(Messages.errors.user_not_found))}
        const doc = await user.save()
        return res.status(200).json({ success: true, data: doc })
    } catch (err) {
        next(err)
    }
}

exports.updateUser = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    
    const allowedFieldsUpdatesSet = [
        'firstname',
        'lastname',
        'about',
        'phone',
        'company.name',
        'company.siren',
        'company.owner',
        'countrySelect',
        'socials.facebook',
        'socials.twitter',
        'address.housenumber',
        'address.street',
        'address.postCode',
        'address.city',
        'address.fullAddress',
        'address.country'
    ]
    
    const updatesSet = allowedFieldsUpdatesSet.reduce((carry, key) => {
        const value = functions.resolveObjectKey(req.body, key)
        if (value) {return { ...carry, [key]: value }}
        else {return carry}
    }, {})
    
    try {
        const doc = await UserModel.updateOne(
            {
                _id: req.user.id
            },
            {
                $set: updatesSet
            },
            {
                returnNewDocument: true,
                runValidators: true
            }
        )
        return res.status(200).json({ success: true, data: doc })
    } catch (err) {
        return next(err)
    }
}

exports.updateAdminUser = async (req, res, next) => {
    const { username } = req.params
    if (!username) {return next(Errors.NotFoundError(Messages.errors.user_not_found))}
    
    //TODO email notifications
    try {
        const doc = await UserModel.updateOne(
            { username },
            { $set: req.body },
            {
                returnNewDocument: true,
                runValidators: true
            }
        )
    
        return res.json({
            success: true,
            data: doc
        })
    } catch (err) {
        return next(err)
    }
}

exports.uploadAvatar = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    req.user.avatar = req.uploadedFiles?.avatar?.[0]
    
    try {
        const document = await req.user.save()
        return res.json({ success: true, data: document })
    } catch (err) {
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const doc = await UserModel.updateOne(
            { username: req.params.username },
            { removed: true }
        )
        return res.json({ success: true, data: doc })
    } catch (err) {
        return next(err)
    }
}

exports.addFavoriteAnnounceAction = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    const { announce_id: announceId } = req.params
    const announce = await AnnounceModel.findById(announceId)
    
    if (!announce) {return next(Errors.NotFoundError(Messages.errors.announce_not_found))}
    if (req.user.id.toString() === announce.user.toString()) {return next(Errors.Error(Messages.errors.not_allowed))}
    
    try {
        const insertion = await UserModel.updateOne(
            {
                _id: req.user.id
            },
            {
                $addToSet: {
                    favorites: announceId
                }
            },
            {
                runValidators: true
            }
        )
        
        return res.json({
            success: true,
            data: insertion
        })
    } catch (err) {
        return next(err)
    }
}

exports.rmFavoriteAnnounceAction = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    
    const { announce_id: announceId } = req.params
    const announce = await AnnounceModel.findById(announceId)
    if (!announce) {return next(Errors.NotFoundError(Messages.errors.announce_not_found))}
    
    try {
        const suppression = await UserModel.updateOne(
            { _id: req.user.id },
            {
                $pull: {
                    favorites: announceId
                }
            },
            {
                runValidators: true
            }
        )
        
        return res.json({
            success: true,
            data: suppression
        })
    } catch (err) {
        return next(err)
    }
}

exports.followUserAction = async (req, res, next) => {
    const { user_id: userId } = req.params
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    if (req.user.id.toString() === userId) {return next(Errors.Error(Messages.errors.not_allowed))}
    
    try {
        const insertion = await UserModel.updateOne(
            { _id: userId },
            {
                $addToSet: {
                    followers: {
                        user: req.user.id
                    }
                }
            },
            {
                runValidators: true
            }
        )
        
        if (!insertion) {return next(Errors.NotFoundError(Messages.errors.user_not_found))}
        const doc = await UserModel.updateOne(
            { _id: req.user.id },
            {
                $addToSet: {
                    followings: {
                        user: userId
                    }
                }
            })
        
        return res.json({
            success: true,
            data: {
                doc,
                insertion
            }
        })
    } catch (err) {
        return next(err)
    }
}

exports.unFollowUserAction = async (req, res, next) => {
    const { user_id: userId } = req.params
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    if (req.user.id.toString() === userId) {return next(Errors.Error(Messages.errors.not_allowed))}
    
    try {
        const suppression = await UserModel.updateOne(
            { _id: userId },
            {
                $pull: {
                    followers: {
                        user: req.user.id
                    }
                }
            },
            {
                runValidators: true
            }
        )
        
        if (!suppression) {return next(Errors.NotFoundError(Messages.errors.user_not_found))}
        const doc = await UserModel.updateOne(
            { _id: req.user.id },
            {
                $pull: {
                    followings: {
                        user: userId
                    }
                }
            }
        )
        
        return res.json({
            success: true,
            data: {
                doc,
                suppression
            }
        })
    } catch (err) {
        return next(err)
    }
}

exports.subscribeNewsletter = async (req, res, next) => {
    const email = req.body.email
    if (!email) {return next(Errors.NotFoundError(Messages.errors.missing_or_invalid_email))}
    
    try {
        const doc = await NewsletterSubscriber.updateOne({ email }, {
            email,
            active: req.body.active ?? true
        }, { upsert: true })
        return res.json({ success: true, data: doc })
    } catch (err) {
        return next(err)
    }
}

exports.contact = async (req, res, next) => {
    const { email, subject, message } = req.body
    if (!email) {return next(Errors.NotFoundError(Messages.errors.missing_or_invalid_email))}
    
    try {
        const post = new ContactMessage({
            email,
            subject,
            message
        })
        
        const doc = await post.save()
        const date = moment(doc.createdAt).format('YYYY-MM-DD-HH-MM')
        await usersMailer.contactFormToAdmin({
            email,
            subject,
            message,
            date
        })
        
        return res.json({
            success: true
        })
    } catch (err) {
        return next(err)
    }
}
