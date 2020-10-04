const AccessControl = require('accesscontrol').AccessControl
const basicPermissions = require('./basicRoles')
const adminPermissions = require('./adminRoles')

const permissions = [
    ...basicPermissions,
    ...adminPermissions
]

const accessControlRoles = new AccessControl(permissions)

// both admin and superadmin roles inherit moderator permissions
accessControlRoles.grant('superadmin').extend('admin')

exports.roles = accessControlRoles
