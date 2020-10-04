class CustomError extends Error {
    constructor (err, name, code = 200) {
        super()
        this.message = (err instanceof Error) ? err.message : err
        this.statusCode = code
        this.name = name || this.constructor.name
        Error.captureStackTrace(this, CustomError)
    }
}

module.exports = {
    Error : (message) => new CustomError(message, 'Error', 400),
    AnonymousError: (message, name, code) => new CustomError(message, name, code),
    AlreadyActivated: (message) => new CustomError(message, 'AlreadyActivatedError', 201),
    DuplicateError: (message) => new CustomError(message, 'DuplicateError', 205),
    ExpiredTokenError: (message) => new CustomError(message, 'ExpiredTokenError', 401),
    UnAuthorizedError: (message) => new CustomError(message, 'UnAuthorizedError', 403),
    NotFoundError: (message) => new CustomError(message, 'NotFoundError', 404)
}
