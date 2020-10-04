require('dotenv').config() // Loading dotenv to have access to env variables
const config = require('../config')
const AWS = require('aws-sdk') // Requiring AWS SDK.

const AWSConfig = {
    accessKeyId: config.aws.s3.S3_KEY, // stored in the .env file
    secretAccessKey: config.aws.s3.S3_SECRET, // stored in the .env file
    region: config.aws.s3.BUCKET_REGION // This refers to your bucket configuration.
}

// Configuring AWS
AWS.config = new AWS.Config(AWSConfig)

// Creating a S3 instance
const s3 = new AWS.S3()

// Retrieving the bucket name from env variable
const Bucket = config.aws.s3.BUCKET_NAME

// In order to create pre-signed GET adn PUT URLs we use the AWS SDK s3.getSignedUrl method.
// getSignedUrl(operation, params, callback) ⇒ String
// For more information check the AWS documentation: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html

function getConfig () {
    return AWSConfig
}

function uploadObject (buffer, key, contentType = 'image/jpeg', acl = 'public-read') {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket,
            Body: buffer,
            Key: key,
            ContentType: contentType,
            ACL: acl
        }
        s3.upload(params, (err, response) => {
            if (err) {
                reject(err)
            } else {
                resolve(response)
            }
        })
    })
}

// GET URL Generator
function generateGetUrl (Key) {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket,
            Key,
            Expires: 120 // 2 minutes
        }
        // Note operation in this case is getObject
        s3.getSignedUrl('getObject', params, (err, url) => {
            if (err) {
                reject(err)
            } else {
                // If there is no errors we will send back the pre-signed GET URL
                resolve(url)
            }
        })
    })
}

// PUT URL Generator
function generatePutUrl (Key, ContentType) {
    return new Promise((resolve, reject) => {
        // Note Bucket is retrieved from the env variable above.
        const params = { Bucket, Key, ContentType }
        // Note operation in this case is putObject
        s3.getSignedUrl('putObject', params, function (err, url) {
            if (err) {
                reject(err)
            }
            // If there is no errors we can send back the pre-signed PUT URL
            resolve(url)
        })
    })
}

// Finally, we export the methods so we can use it in our main application.
module.exports = { getConfig, uploadObject, generateGetUrl, generatePutUrl }
