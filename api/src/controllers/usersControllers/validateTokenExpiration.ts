import {Response, Request} from 'express';
const jwt = require('jsonwebtoken');
const {SECRET_ACCESS_TOKEN}=process.env

const getAccessTokenExpiration = async (req:Request, res:Response) => {
    const accessTokenCookie = req.cookies.accessToken;
    try {
    if (!accessTokenCookie) {
    return res.status(401).json({ error: 'No access token provided' })
    }  
    else{    
        const decodedToken = await jwt.verify(accessTokenCookie, SECRET_ACCESS_TOKEN)
        const expirationTime = decodedToken.exp;
        return res.status(200).json({ expirationTime });
    }
    }
    catch (error:any) {
    return res.status(500).json({ error: error.message }); 
    }
}

module.exports= getAccessTokenExpiration