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
        return res.status(409).send({ error: 'Token invalid', lugar: 'checkRole' })
      } else {
        const user = await getDetail(verifysing.id_user)
        if (user) {
          if (Array.isArray(roles) && roles.includes(user.role)) {
            return next()
          } else {
            return res.status(401).send({ error: 'You are not allowed to view this content' })
          }
        } else {
          return res.status(401).send({ error: 'You do not have permissions' })
        }
      }
    } catch (error:any) {
      return res.status(500).send({ error: error.message })
    }
  }

module.exports = checkRole
