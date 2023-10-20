const jwt = require('jsonwebtoken')
const { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } = process.env

function sign(payload: object, isAccessToken: boolean) {
  return jwt.sign(
    payload,
    isAccessToken ? SECRET_ACCESS_TOKEN : SECRET_REFRESH_TOKEN,
    { algorithm: 'HS256', expiresIn: isAccessToken ? '1h' : '15d' }
  )
}

function generateAccessToken(user: object) {
  return sign(user, true)
}

function generateRefreshToken(user: object) {
  return sign(user, false)
}

function generateResetToken(user: object) {
  return jwt.sign(user, SECRET_ACCESS_TOKEN, {
    algorithm: 'HS256',
    expiresIn: '1h',
  })
}

function verifyToken(token: string, isAccessToken: boolean) {
  try {
    const tokenVerify = jwt.verify(
      token,
      isAccessToken ? SECRET_ACCESS_TOKEN : SECRET_REFRESH_TOKEN
    )
    return tokenVerify
  } catch (error: any) {
    console.error('Error al verificar el token:', error.message)
    return null
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  verifyToken,
}
