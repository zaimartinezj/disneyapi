const jwt = require('jsonwebtoken');

const newToken = (uid, name) => {
    const token = jwt.sign({uid, name}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' })
    return token
}

module.exports = newToken;