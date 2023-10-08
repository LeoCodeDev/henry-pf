const jwt = require('jsonwebtoken')
const {SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN}= process.env

function sign(payload:object, isAccessToken:boolean) {
    return jwt.sign(payload, isAccessToken? SECRET_ACCESS_TOKEN : SECRET_REFRESH_TOKEN, 
        {   algorithm: 'HS256',
            expiresIn: isAccessToken ? '1h' : '15d'  }); 
    }

function generateAccessToken(user:Object) {
    return sign(user, true)
    }

function generateRefreshToken(user:Object) {
    return sign(user, false)
    
}

module.exports = {generateAccessToken, generateRefreshToken}
