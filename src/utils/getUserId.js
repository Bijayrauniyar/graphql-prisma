const jwt = require('jsonwebtoken'); 
const getUserId = (request, requireAuth = true) => {
    const header = request.request.headers.authrization
    

    if (header) {
        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisisasecret')
        return decoded.userId
    }

    if (requireAuth) {
        throw new Error('Authentication required')
    } 
    
    return null
}

module.exports = { getUserId }