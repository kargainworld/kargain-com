const AuthMailer = require('./auth')
const AnnouncesMailer = require('./announces')
const UsersMailer = require('./users')

module.exports = {
    auth: AuthMailer,
    announces : AnnouncesMailer,
    users : UsersMailer
}
