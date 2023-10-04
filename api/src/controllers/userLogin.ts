const { User, Team } = require('../db_connection')
import { Request, Response } from 'express'

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      res.status(400).json({ message: 'Missing data' })
    } else {
      const userFound = await User.findOne({ where: { email } })
      if (userFound) {
        if (password === userFound.password) {
          const team = await Team.findOne({
            where: { id_team: userFound.TeamIdTeam },
          })
          const teamName = team.name
          res.status(200).json({
            username: userFound.username,
            first_name: userFound.first_name,
            email: userFound.email,
            avatar: userFound.avatar,
            role: userFound.role,
            TeamIdTeam: userFound.TeamIdTeam,
            teamName,
            access: true,
          })
        } else {
          res.status(401).json({ message: 'Wrong password' })
        }
      } else {
        res.status(404).json({ message: 'User not found' })
      }
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = userLogin
