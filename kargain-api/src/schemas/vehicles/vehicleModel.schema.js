const mongoose = require('mongoose')

const vehicleModelSchema = (type) => {
    return new mongoose.Schema({
        make_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: `${type}_makes`,
            required: true
        },

        model_id: {
            type: String,
            trim: true,
            required: true
        },

        model: {
            type: String,
            trim: true,
            required: true
        },

        model_ru: {
            type: String,
            trim: true
        },
  
        generation_id : {
            type: String,
            trim: true
        },
  
        generation : {
            type: String,
            trim: true
        },
  
        generation_ru : {
            type: String,
            trim: true
        }
    },{
        timestamps: true,
        toJSON: { virtuals: true },
        strict: false
    })
}

module.exports = vehicleModelSchema
