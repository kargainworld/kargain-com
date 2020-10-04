const mongoose = require('mongoose')

const mediaS3Schema = new mongoose.Schema({
    originalName: String,
    filename: String,
    etag: String,
    key: String,
    location: String,
    mimeType: String,
    size: Number
}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})

mediaS3Schema.virtual('src').get(function () {
    return this.location
})

mediaS3Schema.virtual('id').get(function () {
    return this._id
})

// Export mongoose model
module.exports = mongoose.model('Media', mediaS3Schema)
