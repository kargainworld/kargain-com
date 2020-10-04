// grant list fetched from DB (to be converted to a valid grants object, internally)
const basicPermissions = [
    { role: 'basic', resource: 'profile', action: 'create:own', attributes: '*, !rating, !views' },
    { role: 'basic', resource: 'profile', action: 'read:any', attributes: '*' },
    { role: 'basic', resource: 'profile', action: 'update:own', attributes: '*, !rating, !views' },
    { role: 'basic', resource: 'profile', action: 'delete:own', attributes: '*' },
    
    { role: 'basic', resource: 'announce', action: 'create:own', attributes: '*, !rating' },
    { role: 'basic', resource: 'announce', action: 'read:any', attributes: '*' },
    { role: 'basic', resource: 'announce', action: 'update:own', attributes: '*,' },
    { role: 'basic', resource: 'announce', action: 'delete:own', attributes: '*' },
    
    { role: 'basic', resource: 'comments', action: 'create:own', attributes: '*, !rating' },
    { role: 'basic', resource: 'comments', action: 'read:any', attributes: '*' },
    { role: 'basic', resource: 'comments', action: 'update:own', attributes: '*,' },
    { role: 'basic', resource: 'comments', action: 'delete:own', attributes: '*' }
]

module.exports = basicPermissions
