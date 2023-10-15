const jwt = require("jsonwebtoken");
const { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } = process.env;

function sign(payload: object, isAccessToken: boolean) {
  return jwt.sign(
    payload,
    isAccessToken ? SECRET_ACCESS_TOKEN : SECRET_REFRESH_TOKEN,
    { algorithm: "HS256", expiresIn: isAccessToken ? "1h" : "15d" }
  );
}

function generateAccessToken(user: Object) {
  return sign(user, true);
}

function generateRefreshToken(user: Object) {
  return sign(user, false);
}

function generateResetToken(user: Object) {
  return jwt.sign(user, SECRET_ACCESS_TOKEN, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
}

function verifyToken (token : string)  {
    console.log(token)
    try {
        const tokenVerify = jwt.verify(token,SECRET_ACCESS_TOKEN )
        console.log('___Token verificado___', tokenVerify)
        return tokenVerify
    } catch (error : any) {
        console.log('__Algo fallo___', error.message)
        return null
    }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  verifyToken
};
