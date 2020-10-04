const jwt = require('jsonwebtoken')
const { uuid } = require('uuidv4')
const pwdGenerator = require('generate-password')
const config = require('../config')
const authMailer = require('../components/mailer').auth
const Errors = require('../utils/errors')
const Messages = require('../utils/messages')
const User = require('../models').User

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*\d).{4,16}$/ //min 4, max 8

exports.findUserByEmailMiddleware = async (req, res, next) => {
    if (!req.body.email) {return next(Errors.NotFoundError())}
    try {
        /*eslint require-atomic-updates:0*/
        req.user = await User.findByEmail(req.body.email)
        next()
    } catch (err) {
        return next(err)
    }
}

exports.loginValidation = (req, res, next) => {
    const { email, password } = req.body
    if (!password) {return next(Errors.Error(Messages.errors.missing_password))}
    if (!email || !EMAIL_REGEX.test(email)) {return next(Errors.Error(Messages.errors.missing_or_invalid_email))}
    if (!PASSWORD_REGEX.test(password)) {return next(Errors.Error(Messages.errors.password_not_valid))}
    else {next()}
}

exports.ssoRegister = async (req, res, next) => {
    const data = req.body
    
    try {
        const user = await User.findByEmail(data.email)
        if (!user) {
            const pwd = pwdGenerator.generate({ length: 16 })
            const newUser = new User({
                ...data,
                sso: true,
                password: pwd,
                clear_password: pwd
            })
            req.user = await newUser.save()
        } else {
            req.user = user
        }
        next()
    } catch (err) {
        return next(err)
    }
}

exports.loginAction = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    
    const user = req.user
    const expirationTimeSeconds = Date.now() + 1000 * 60 * 60 * 24 * 10
    const token = jwt.sign({
        exp: Math.floor(expirationTimeSeconds / 1000), // 10days (seconds)
        uid: user._id
    },
    config.jwt.encryption
    )
    
    // Adds a new cookie to the response
    return res.cookie('token',
        token, {
            expires: new Date(expirationTimeSeconds), // 10days (milliseconds)
            httpOnly: true,
            // secure: !!config.isProd,
            sameSite: false
        }
    ).json({
        success: true,
        data: user
    })
}

exports.logoutAction = async (req, res, next) => {
    req.logout()
    return res
        .cookie('token',
            null, {
                maxAge: 0,
                httpOnly: true
            }
        ).json({
            success: true,
            data : 'logged out'
        })
}

exports.registerAction = async (req, res, next) => {
    const { email, password } = req.body
    if (!password) {return next(Errors.Error(Messages.errors.missing_password))}
    if (!email || !EMAIL_REGEX.test(email)) {return next(Errors.Error(Messages.errors.missing_or_invalid_email))}
    if (!PASSWORD_REGEX.test(password)) {return next(Errors.Error(Messages.errors.password_not_valid))}
    
    const user = new User(req.body)
    
    try {
        req.user = await user.save()
        next()
    } catch (err) {
        return next(err)
    }
}

exports.registerProAction = async (req, res, next) => {
    const { email, password } = req.body
    if (!password) {return next(Errors.Error(Messages.errors.missing_password))}
    if (!email || !EMAIL_REGEX.test(email)) {return next(Errors.Error(Messages.errors.missing_or_invalid_email))}
    if (!PASSWORD_REGEX.test(password)) {return next(Errors.Error(Messages.errors.password_not_valid))}
    
    const user = new User({
        ...req.body,
        pro: true
    })
    
    try {
        req.user = await user.save()
        next()
        
    } catch (err) {
        next(err)
    }
}

exports.confirmEmailTokenAction = async (req, res, next) => {
    const { token } = req.params
    try {
        const decoded = await jwt.verify(token, config.jwt.encryption)
        if (!decoded.email) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
        const updated = await User.confirmUserEmail(decoded.email)
        return res.json({
            success: true,
            data: updated
        })
    } catch (err) {
        return next(err)
    }
}

exports.sendEmailActivation = async (req, res, next) => {
    if (!req.user) {return next(Errors.NotFoundError(Messages.errors.user_not_found))}
    
    const token = jwt.sign({ email: req.user.email },
        config.jwt.encryption,
        { expiresIn: '1h' }
    )
    
    await authMailer.confirmAccount({
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        email: req.user.email,
        link: token ? `${config.frontend}/auth/confirm-account?token=${token}` : null
    })
    
    return res.json({
        success: true,
        data : {
            msg : Messages.success.user_successfully_registered
        }
    })
}

exports.authorizeAction = async (req, res) => {
    return res.json({
        success: true,
        data: req.user
    })
}

exports.forgotPasswordAction = async (req, res, next) => {
    const { email } = req.body
    try {
        const user = await User.findByEmail(email)
        const token = jwt.sign({
            email: user.email
        }, config.jwt.encryption, { expiresIn: '1h' }
        )
        
        user.pass_reset = uuid()
        const document = await user.save()
        
        const emailResult = await authMailer.resetPassword({
            firstname: document.firstname,
            lastname: document.lastname,
            email: document.email,
            report_link: `${config.frontend}/auth/report`,
            reset_link: token ? `${config.frontend}/auth/reset-password?token=${token}` : null
        })
        
        return res.json({
            success: true,
            data: emailResult
        })
    } catch (err) {
        next(err)
    }
}

exports.resetPasswordAction = async (req, res, next) => {
    const { token, password } = req.body
    try {
        const decoded = await jwt.verify(token, config.jwt.encryption)
        if (!decoded) {return next(Errors.NotFoundError(Messages.errors.user_not_found))}
        const { email } = decoded
        const updated = await User.resetPassword(email, password)
        return res.json({
            success: true,
            data: updated
        })
    } catch (err) {
        next(err)
    }
}
