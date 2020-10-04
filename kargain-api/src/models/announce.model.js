const mongoose = require('mongoose')
const AnnounceSchema = require('../schemas/announce.schema')
const AnnounceModel = mongoose.model('Announce', AnnounceSchema)

AnnounceModel.on('index', function (err) {
    if(err){
        console.log('error building indexes: ' + err)
    }
})

module.exports = AnnounceModel
