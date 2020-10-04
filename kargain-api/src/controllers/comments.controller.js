const AnnounceModel = require('../models').Announce
const CommentModel = require('../models').Comment
const Errors = require('../utils/errors')
const Messages = require('../utils/messages')

exports.getCommentsByAnnounce = async (req, res, next) => {
    const { announce_id } = req.params
    const announce = await AnnounceModel.findById(announce_id).exec()
    if (!announce) {throw Errors.NotFoundError(Messages.errors.announce_not_found)}
    const comments = await CommentModel.find({ announce: announce_id, enabled: true }).exec()
    return res.json({ success: true, data: comments })
}

exports.createComment = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    const { announce_id, message } = req.body
    const announce = await AnnounceModel.findById(announce_id).exec()
    if (!announce) {throw Errors.NotFoundError(Messages.errors.announce_not_found)}
    if (!message) {return next(Messages.errors.comment_is_empty)}
    
    try {
        const comment = new CommentModel({
            announce: announce_id,
            user: req.user.id,
            message
        })
        
        const doc = await comment.save()
        announce.comments.push(doc._id)
        await announce.save()
        
        return res.json({
            success: true,
            data: doc
        })
    } catch (err) {
        throw err
    }
}

exports.enableComment = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    const { comment_id } = req.params
    const update = await CommentModel.findOneAndUpdate(
        { _id: comment_id },
        { enabled: true })
        .exec()
    return res.json({ success: true, data: update })
}

exports.disableComment = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    const { comment_id } = req.params
    const update = await CommentModel.findOneAndUpdate(
        { _id: comment_id },
        { enabled: false })
        .exec()
    return res.json({ success: true, data: update })
}
exports.createCommentResponse = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    const { comment_id: commentId, message } = req.body
    const comment = await CommentModel.findById(commentId).exec()
    if (!comment) {return next(Errors.NotFoundError(Messages.errors.comment_not_found))}
    if (!message) {return next(Errors.Error(Messages.errors.message_not_found))}
    
    try {
        const CommentResponse = {
            user: req.user.id,
            message
        }
        
        if (!comment.responses) {comment.responses = []}
        comment.responses.push(CommentResponse)
        const document = await comment.save()
        
        const populatedComment = await document
            .populate('user')
            .populate('responses.user')
            .execPopulate()
        
        return res.json({
            success: true,
            data: populatedComment
        })
    } catch (err) {
        return next(err)
    }
}


exports.removeComment = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    const { comment_id } = req.params
    
    const document = await CommentModel.findOneAndDelete({ _id: comment_id }).exec()
    return res.json({ success: true, data: document })
}

exports.createCommentLike = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    const { comment_id: commentId } = req.params
    const comment = await CommentModel.findById(commentId).exec()
    if (!comment) {return next(Errors.NotFoundError(Messages.errors.comment_not_found))}
    if (!comment.likes) {comment.likes = []}
    
    comment.likes.push({
        user: req.user.id
    })
    
    const document = await comment.save()
    return res.json({ success: true, data: document })
}

exports.removeCommentLike = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    
    const { comment_id: commentId, likeIndex } = req.params
    const comment = await CommentModel.findById(commentId).exec()
    if (!comment) {return next(Errors.NotFoundError(Messages.errors.comment_not_found))}
    comment.likes = comment.likes.slice(0, likeIndex).concat(comment.likes.slice(likeIndex + 1, comment.likes.length))
    
    const document = await comment.save()
    return res.json({ success: true, data: document })
}

exports.createCommentResponseLike = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    
    const { comment_id: commentId, responseIndex } = req.params
    const comment = await CommentModel.findById(commentId).exec()
    if (!comment) {return next(Errors.NotFoundError(Messages.errors.comment_not_found))}
    
    const response = comment.responses && comment.responses[responseIndex]
    if (!response) {return next(Errors.NotFoundError(Messages.errors.response_not_found))}
    
    response.likes.push({
        user: req.user.id
    })
    
    const document = await comment.save()
    return res.json({ success: true, data: document })
}

exports.removeCommentResponseLike = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    const { comment_id: commentId, responseIndex, likeIndex } = req.params
    
    const comment = await CommentModel.findById(commentId).exec()
    if (!comment) {return next(Errors.NotFoundError(Messages.errors.comment_not_found))}
    
    const response = comment.responses && comment.responses[responseIndex]
    if (!response) {return next(Errors.NotFoundError(Messages.errors.response_not_found))}
    response.likes = response.likes.slice(0, likeIndex).concat(comment.likes.slice(likeIndex + 1, response.likes.length))
    
    const document = await comment.save()
    return res.json({ success: true, data: document })
}
