const mongoose = require('mongoose')
const LikeSchema = require('../like.schema')

const AnswerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    message: {
        type: String,
        trim: true
    },
    enabled: {
        type: Boolean,
        default: true
    },
    likes : [LikeSchema]
}, {
    _id : false,
    timestamps: true,
    toJSON: { virtuals: true },
    strict: false
})

AnswerSchema
    .plugin(require('mongoose-autopopulate'))
    // .plugin(require('mongoose-timezone'));

module.exports = AnswerSchema
