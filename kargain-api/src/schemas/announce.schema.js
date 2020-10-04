const mongoose = require('mongoose')
const shortid = require('shortid')
const LikeSchema = require('./like.schema')
const utils = require('../utils/helpers')

const AnnounceSchema = new mongoose.Schema({
 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // autopopulate: { maxDepth: 1 }
    },
 
    title: {
        type: String,
        trim: true
    },
 
    showCellPhone: {
        type: Boolean,
        default: true
    },
 
    //need admin validation
    activated: {
        type: Boolean,
        default: false
    },
 
    //draft mode
    visible: {
        type: Boolean,
        default: true
    },
 
    status: {
        type: String,
        enum: ['rejected', 'deleted', 'archived', 'active'],
        default: 'active'
    },
 
    description: {
        type: String,
        trim: true
    },
 
    expirationDate: {
        type: Date
    },
 
    slug: {
        type: String,
        trim: true
    },
 
    price: {
        type: Number,
        default: 0,
        min: 0,
        max: 999999
    },
 
    vinNumber: String,
 
    adType: {
        type: String,
        required: true,
        enum : ['sale', 'sale-pro', 'rent']
    },
 
    // car, moto etc ...
    vehicleType: {
        type: String,
        required: true,
        enum : ['car', 'moto', 'bus', 'camper', 'utility']
    },
 
    // e:g moto => quad, scooter ...
    vehicleFunctionType: {
        label: String,
        value: String
    },
 
    // neuf, occas
    vehicleGeneralState: {
        label: String,
        value: String
    },
 
    // personal, taxi, driving-school ...
    vehicleFunctionUse: {
        label: String,
        value: String
    },
 
    // taxi, personal
    vehicleFunction: {
        label: String,
        value: String
    },
 
    vehicleEngineType: {
        label: String,
        value: String
    },
 
    vehicleEngineGas: {
        label: String,
        value: String
    },
 
    vehicleEngineCylinder: {
        value: String,
        label: Number
    },
    
    makeRef: {
        type: String,
        required: true,
        enum: ['buses_makes', 'campers_makes', 'cars_makes', 'motorcycles_makes', 'trucks_makes']
    },
    
    modelRef: {
        type: String,
        required: true,
        enum: ['buses_models', 'campers_models', 'cars_models', 'motorcycles_models', 'trucks_models']
    },
    
    manufacturer: {
        make: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'makeRef',
            autopopulate: true
        },
        model: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'modelRef',
            autopopulate: true
        },
        generation: {
            label: String,
            value: String
        },
        year: {
            label: String,
            value: String
        }
    },
 
    mileage: {
        type: Number,
        default: 0,
        min: 0,
        max: 999999
    },
 
    powerKm: {
        type: Number,
        default: 0
    },
 
    powerCh: {
        type: Number,
        default: 0
    },
 
    consumptionMixt: {
        type: Number,
        default: 0
    },
 
    consumptionCity: {
        type: Number,
        default: 0
    },
 
    consumptionRoad: {
        type: Number,
        default: 0
    },
 
    consumptionGkm: {
        type: Number,
        default: 0
    },
 
    equipments: [
        {
            _id: false,
            label: String,
            value: String
        }
    ],
 
    ownersCount: {
        label: String,
        value: String
    },
 
    damages: [
        {
            _id: false,
            position: {
                left: Number,
                top: Number
            },
            text: {
                type: String,
                trim: true
            }
        }
    ],
 
    doors: {
        label: String,
        value: String
    },
 
    seats: {
        label: String,
        value: String
    },
    
    //essieux (utility)
    axles : {
        label: String,
        value: String
    },
    
    driverCabins: {
        label: String,
        value: String
    },
 
    bunks: {
        label: String,
        value: String
    },
 
    beds: {
        label: String,
        value: String
    },
 
    bedType: {
        label: String,
        value: String
    },
 
    paint: {},
    materials: {},
    externalColor: {},
    internalColor: {},
    emission: {},
 
    location: {
        coordinates: {
            type: [Number],
            default: [0, 0] //long, lat
        },
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        }
    },
 
    countrySelect: {
        label: String,
        value: String
    },
 
    address: {
        housenumber: Number,
        street: {
            type: String,
            trim: true
        },
        postCode: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        fullAddress: {
            type: String,
            trim: true
        }
    },
 
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
        autopopulate: true
    }],
 
    tags: [{
        index: true,
        _id: false,
        type: String
    }],
 
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
 
    likes: [LikeSchema]
 
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: {
        virtuals: true
    },
    strict: false
})

AnnounceSchema.path('tags').validate((arr) => {
    return arr.length <= 10
}, 'too much tags provided')

AnnounceSchema.index({
    '$**': 'text'
})

AnnounceSchema.index({ location: '2dsphere' })

// AnnounceSchema.plugin(require('mongoose-explain'));
AnnounceSchema.plugin(require('mongoose-autopopulate'))

// hashing a password before saving it to the database
AnnounceSchema.pre('save', function (next) {
    if (this.isNew) {
        const announce = this
        const date = new Date()
        const adType = announce.adType?.value?.toLowerCase()
        const vehicleType = announce.vehicleType?.value?.toLowerCase()
        const titleParts = [
            adType,
            vehicleType,
            this.title,
            shortid.generate()
        ].join(' ')
        this.slug = utils.stringToSlug(titleParts)
        this.expirationDate = new Date(date.setMonth(date.getMonth() + 1))
    }
    next()
})

AnnounceSchema.post('update', function () {
    console.log('Update finished.')
})

AnnounceSchema.statics.findByUser = async function (uid) {
    return await this.model('Announce').find({ user: uid })
        .exec()
}

AnnounceSchema.virtual('id').get(function () {
    const announce = this
    return announce._id
})

AnnounceSchema.virtual('priceHT').get(function () {
    const announce = this
    if(announce.price){
        return Number(announce.price * 0.8).toFixed(0)
    }
})

module.exports = AnnounceSchema
