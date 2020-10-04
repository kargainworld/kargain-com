const mongoose = require('mongoose')
const AnswerSchema = require('../schemas/comments/response.schema')
const LikeSchema = require('../schemas/like.schema')

const CommentSchema = new mongoose.Schema({
    announce: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Announce'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // autopopulate: true
    },
    message: {
        type: String,
        trim: true
    },
    enabled: {
        type: Boolean,
        default: true
    },
    responses: [AnswerSchema],
    likes : [LikeSchema]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    strict: false
})

CommentSchema.virtual('id').get(function () {
    const user = this
    return user._id
})

CommentSchema.plugin(require('mongoose-autopopulate'))

// Export mongoose model
module.exports = mongoose.model('Comment', CommentSchema)
