require('dotenv').config()
// eslint-disable-next-line no-undef
const processEnv = process.env
const env = processEnv.NODE_ENV || 'production'
const isProd = env === 'production'
const frontend = isProd ? 'https://kargain.com' : 'http://localhost:3000'

const db = {
    mongo_location: processEnv.MONGODB_URI || 'mongodb://localhost:27017/kargain'
}

module.exports = {
    isProd,
    env,
    frontend,
    db,
    api_path: '/v1',
    whileListDomains: [
        'http://localhost:8080',
        'http://localhost:3000',
        'http://localhost:5000',
        'https://kargain.com',
        'https://kargain.web.app',
        'https://kargain-api.now.sh',
        'https://kargain-app.vercel.app'
    ],
    externalsAPI: {
        vindecoderFree: {
            API_URL: 'https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues'
        },
        vindecoder: {
            API_URL: 'http://api.carmd.com/v3.0',
            'partner-token': '74563ccc0b0c4ca98e7cd7292b513716',
            authorization: 'Basic MWM2MWE4NGMtMGQzZC00MDA2LTkxMGItMmZlNDUyN2QxMTc1'
        }
    },
    logDNA : {
        apiKey : processEnv.LOGDNA_KEY
    },
    stripe: {
        public_key: processEnv.STRIPE_PUBLIC_KEY,
        secret_key: processEnv.STRIPE_PRIVATE_KEY
    },
    
    aws: {
        s3: {
            S3_KEY: processEnv.AWS_S3_KEY,
            S3_SECRET: processEnv.AWS_S3_SECRET,
            BUCKET_NAME: processEnv.AWS_S3_BUCKET_NAME,
            BUCKET_REGION: processEnv.AWS_S3_BUCKET_REGION
        }
    },
    mailer: {
        from: {
            name: 'Contact Kargain',
            email: processEnv.ADMIN_EMAIL_FROM
        },
        mailjet: {
            API_KEY: processEnv.MAILJET_API_KEY,
            password: processEnv.MAILJET_API_PASSWORD,
            smtp: {
                host: processEnv.MAILJET_SMTP_HOST || 'in-v3.mailjet.com',
                port: processEnv.MAILJET_SMTP_PORT || 587,
                auth: {
                    user: processEnv.MAILJET_SMTP_USER,
                    pass: processEnv.MAILJET_SMTP_PASSWORD
                }
            }
        }
    },
    redis: {
        host: processEnv.REDIS_HOST,
        port: processEnv.REDIS_PORT || 10042,
        password: processEnv.REDIS_PASSWORD
    },
    port: parseInt(processEnv.PORT) || 8080,
    jwt: {
        encryption: processEnv.JWT_ENCRYPTION || 'myS3cr3tK3y',
        expiration: processEnv.JWT_EXPIRATION || 20000
    }
}
