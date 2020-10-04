const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
    name: String
})

// Export mongoose model
module.exports = mongoose.model('Tag', TagSchema)
