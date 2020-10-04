const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { uuid } = require('uuidv4')
const utils = require('../utils/helpers')
const Errors = require('../utils/errors')
const LikeSchema = require('../schemas/like.schema')
const UserSchema = new mongoose.Schema({
    
    firstname: {
        type: String,
        required: true,
        trim: true,
        get: v => utils.capitalizeWords(v)
    },
    
    lastname: {
        type: String,
        required: true,
        trim: true,
        get: v => utils.capitalizeWords(v)
    },
    
    //generated
    username: {
        type: String,
        trim: true
    },
    
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    
    password: {
        type: String,
        trim: true,
        required: true
    },
    
    salt: String,
    pass_reset: String,
    removed: {
        type: Boolean,
        default: false
    },
    activated: {
        type: Boolean,
        default: false
    },
    email_validated: {
        type: Boolean,
        default: false
    },
    
    role: {
        type: String,
        enum: ['basic', 'admin'],
        default: 'basic'
    },
    
    pro: {
        type: Boolean,
        default: false
    },
    
    //pro features
    company: {
        name: String,
        siren: String,
        owner: String
    },
    
    phone: {
        type: String,
        trim: true
    },
    
    //STRIPE
    subscriptionLog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        autopopulate: true
    },
    subscriptionOfferTitle: String,
    hasProPlan: {
        type: Boolean,
        default: false
    },
    
    about: {
        type: String,
        trim: true
    },
    
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
        },
        country: {
            type: String,
            trim: true
        }
    },
    
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
        autopopulate: true
    },
    
    avatarUrl: String,
    
    garage: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Announce'
    }],
    
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Announce'
    }],
    
    followers: [LikeSchema],
    followings: [LikeSchema],
    
    sso: Boolean,
    
    facebookProvider: {
        type: {
            id: String,
            token: String
        },
        select: false
    }
}, {
    timestamps: true,
    strict: false,
    toObject: {
        virtuals: true,
        transform: function (doc, ret) {
        }
    },
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret.pro
            delete ret.password
        }
    }
})

UserSchema.index({
    '$**': 'text'
})

UserSchema.plugin(require('mongoose-autopopulate'))

UserSchema.post('init', function (doc) {
    console.log('%s has been initialized from the db', doc._id)
})

UserSchema.post('remove', function (doc) {
    console.log('%s has been removed', doc._id)
})

// hashing a password before saving it to the database
UserSchema.pre('save', async function (next) {
    const user = this
    try {
        if (this.isNew) {
            const fullname = utils.stringToSlug(`${user.firstname} ${user.lastname}`)
            user.username = `${fullname}-${uuid().substr(0, 6)}`
            user.password = await hashPassword(user.password)
        }
        
        if (!user.avatarUrl) {
            const md5 = crypto.createHash('md5').update(this.email)
                .digest('hex')
            user.avatarUrl = 'https://gravatar.com/avatar/' + md5 + '?s=64&d=wavatar'
        }
        
        next()
    } catch (err) {
        next(err)
    }
})

UserSchema.post('save', async function (err, doc, next) {
    if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            return next(Errors.DuplicateError('duplicate user'))
        } else {return next(err)}
    }
    next()
})

UserSchema.statics.hashPassword = (password, salt) => hashPassword(password, salt)

const hashPassword = (password, saltRounds = 10) => bcrypt.hash(password, saltRounds)

UserSchema.statics.findByEmail = async function (email) {
    return await this.model('User').findOne({ email })
        .exec()
}

UserSchema.statics.confirmUserEmail = async function (email) {
    const user = await this.model('User').findOne({ email })
        .exec()
    if (!user) {throw new Error('user not found')}
    // if (user.activated && user.email_validated) { throw new Error('user already activated') }
    user.activated = true
    user.email_validated = true
    return await user.save()
}

UserSchema.statics.resetPassword = async function (email, password) {
    const user = await this.model('User').findByEmail(email)
    const areIdentical = await user.comparePassword(password)
    if (areIdentical) {throw new Error('Password are identical')}
    user.password = await hashPassword(password)
    return await user.save()
}

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.virtual('id').get(function () {
    const user = this
    return user._id
})

UserSchema.virtual('isPro').get(function () {
    const user = this
    return user.pro === true
})

UserSchema.virtual('config').get(function () {
    const user = this
    return {
        garageLengthAllowed: user.pro ? 100 : 5
    }
})

//TODO refacto w permissions
UserSchema.virtual('isAdmin').get(function () {
    const user = this
    return user.role === 'admin'
})

UserSchema.virtual('fullname').get(function () {
    const user = this
    return `${user.firstname} ${user.lastname}`
})

// UserSchema.methods.garageVirtual = async function () {
//     return await this.model('Announce').find({ user : mongoose.Types.ObjectId(this.id)})
// }

// Export mongoose model
module.exports = mongoose.model('User', UserSchema)
