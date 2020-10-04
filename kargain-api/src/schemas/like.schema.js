const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    _id : false,
    timestamps: true,
    strict: true
})

module.exports = LikeSchema
