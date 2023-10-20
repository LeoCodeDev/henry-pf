import { Request, Response, NextFunction } from 'express'
const { verifyToken } = require('../controllers/JWT')
const { User } = require('../db_connection')

const getDetail = async (id: number) => {
  return await User.findByPk(id)
}

//TODO: ['user','admin']
const checkRole =
  (roles: string | string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trueAccesTokend = req.cookies.accessToken ? true : false
      const accessToken = req.cookies.accessToken || req.cookies.refreshToken

      const verifysing = verifyToken(accessToken, trueAccesTokend)
      if (!verifysing) {
        res.status(409)
        res.send({ error: 'Token invalid', lugar: 'checkRole' })
      } else {
        const user = await getDetail(verifysing.id_user)
        if (user) {
          if (Array.isArray(roles) && roles.includes(user.role)) {
            next()
          } else {
            // console.log(user)
            // console.log(user.role)

            res.status(401)
            res.send({ error: 'No tienes permisos' })
          }
        } else {
          res.status(401)
          res.send({ error: 'No tienes permisos' })
        }
      }
    } catch (e) {
      console.log('___Error auth___')
      res.status(409)
      res.send({ error: 'Algo sucedio en el middleware authRol' })
    }
  }

module.exports = checkRole
