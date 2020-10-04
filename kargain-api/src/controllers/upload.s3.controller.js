const utilsS3 = require('../services/s3')
const { uuid } = require('uuidv4')
const shortid = require('shortid')
const MediaModel = require('../models').Media

function getWithoutExtension (filename) {
    return filename.split('.').slice(0, -1).join('.')
}

function getExtension (filename) {
    return filename.split('.').pop()
}

const getS3Config = (req, res, next) => {
    try {
        const config = utilsS3.getConfig()
        res.json({ success: true, data: { config } })
    } catch (err) {
        next(err)
    }
}

const postObjects = async (req, res, next) => {
    const date = new Date()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const baseDir = req.body.baseDir || `uploads/${date.getFullYear()}/${month}`
    const typeDir = req.body.typeDir
    const dir = typeDir ? `${baseDir}/${typeDir}` : `${baseDir}`
    const enableHash = req.body.enableHash || true
    const allowedFileNames = ['images', 'avatar']
    
    // see https://attacomsian.com/blog/uploading-files-nodejs-express
    if (!req.files) {return next()}
    
    const files = Object.keys(req.files)
        .filter(key => allowedFileNames.includes(key))
        .reduce((carry, key) => ({ ...carry, [key]: req.files[key] }), {})
    
    try {
        req.uploadedFiles = await pArray(files, enableHash, dir)
        return next()
    } catch (err) {
        return next(err)
    }
}

const pArray = async (filesObj, enableHash, baseDir) => {
    const filesKeys = Object.keys(filesObj)
    const uploads = await Promise.all(filesKeys.map(key => {
        const files = Array.isArray(filesObj[key]) ? filesObj[key] : [filesObj[key]]
        return Promise.all(files.map(image => uploadMedia(image, enableHash, baseDir)))
    }))
    
    return uploads.reduce((carry, arr, index) => {
        return { ...carry, [filesKeys[index]]: arr }
    }, {})
}

const uploadMedia = async (image, enableHash, baseDir) => {
    const dir = `${baseDir ? baseDir + '/' : ''}`
    const name = enableHash ? `${uuid()}` : `${getWithoutExtension(image.name)}_${shortid.generate()}`
    const key = `${dir}${name}.${getExtension(image.name)}`
    const uploadResponse = await utilsS3.uploadObject(image.data, key)
    
    const media = new MediaModel({
        originalName: image.name,
        mimeType: image.mimetype,
        size: image.size,
        etag: uploadResponse.ETag,
        location: uploadResponse.Location,
        filename: uploadResponse.Key,
        key
    })
    return await media.save()
}

// GET URL
const generateGetUrl = (req, res, next) => {
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    const { Key } = req.query
    utilsS3.generateGetUrl(Key)
        .then(getURL => {
            res.json({ success: true, data: { getURL } })
        })
        .catch(err => {
            next(err)
        }
        )
}

// PUT URL
const generatePutUrl = (req, res, next) => {
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    // ContentType refers to the MIME content type, in this case image/jpeg
    const { Key, ContentType } = req.query
    utilsS3.generatePutUrl(Key, ContentType).then(putURL => {
        res.json({ success: true, data: { putURL } })
    })
        .catch(err => {
            next(err)
        })
}

module.exports = { getS3Config, postObjects, generateGetUrl, generatePutUrl }
