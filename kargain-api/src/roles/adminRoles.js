const adminPermissions = [
    { role: 'admin', resource: 'profile', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'profile', action: 'read:any', attributes: '*' },
    { role: 'admin', resource: 'profile', action: 'update:any', attributes: '*' },
    { role: 'admin', resource: 'profile', action: 'delete:any', attributes: '*' },
    
    { role: 'admin', resource: 'announce', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'announce', action: 'read:any', attributes: '*' },
    { role: 'admin', resource: 'announce', action: 'update:any', attributes: '*' },
    { role: 'admin', resource: 'announce', action: 'delete:any', attributes: '*' },
    
    { role: 'admin', resource: 'comment', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'comment', action: 'read:any', attributes: '*' },
    { role: 'admin', resource: 'comment', action: 'update:any', attributes: '*' },
    { role: 'admin', resource: 'comment', action: 'delete:any', attributes: '*' },
    
    { role: 'admin', resource: 'make', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'make', action: 'read:any', attributes: '*' },
    { role: 'admin', resource: 'make', action: 'update:any', attributes: '*' },
    { role: 'admin', resource: 'make', action: 'delete:any', attributes: '*' }
]

module.exports = adminPermissions
