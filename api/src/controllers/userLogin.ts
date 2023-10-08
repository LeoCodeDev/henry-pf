const { User, Team} = require('../db_connection')
import { Request, Response } from 'express'
const {generateAccessToken}= require ('./JWT')


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
          const accessToken= generateAccessToken({username:userFound.username,id_user:userFound.id_user })
          // const refreshToken = generateRefreshToken({username:userFound.username,id_user:userFound.id_user }); 
          // const expiresAt = new Date();
          // expiresAt.setDate(expiresAt.getDate() + 15); 
          // const newRefreshToken = await RefreshToken.create({
          //   token: refreshToken,
          //   expiresAt: expiresAt,
          //   UserId: userFound.id_user, // Assuming userFound is the authenticated user
          // });
          res.status(200).json({
            username: userFound.username,
            first_name: userFound.first_name,
            email: userFound.email,
            avatar: userFound.avatar,
            role: userFound.role,
            TeamIdTeam: userFound.TeamIdTeam,
            active:userFound.active,
            teamName,
            access: true,
            accessToken
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
