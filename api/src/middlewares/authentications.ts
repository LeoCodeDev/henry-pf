import { Request, Response, NextFunction } from 'express'
const { verifyToken } = require('../controllers/JWT')
const { User } = require('../db_connection')

// Definir una interfaz que extienda la interfaz Request y agregue la propiedad user
interface CustomRequest extends Request {
  user?: any // Ajusta el tipo de 'user' según lo que esperes
}

const checkToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const trueAccesTokend = req.cookies.accessToken ? true : false
    const accessToken = req.cookies.accessToken || req.cookies.refreshToken

    const verifysing = verifyToken(accessToken, trueAccesTokend)
    if (!verifysing) {
      return res.status(401).send({ error: 'Token invalid', verifyToken: verifysing })
    } else {
      const userDetail = await User.findByPk(verifysing.id_user)
      req.user = userDetail
      return next()
    }
  } catch (error: any) {
    return res.status(500).send({
      aviso: 'Something ocurred in the auth middleware',
      error: error.message,
    })
  }
}

module.exports = checkToken
