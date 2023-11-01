const { User, Team, RefreshToken } = require('../../db_connection')
import { Request, Response } from 'express'
const {generateAccessToken, generateRefreshToken}= require ('../JWT')
const domain = process.env.DOMAIN || 'localhost';

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    if (!email || !password) return res.status(400).json({ message: 'Missing data' })
    const userFound = await User.findOne({ where: { email,password } })
    if (!userFound) return res.status(401).json({ message: 'Email/Password not valid' })
    const team = await Team.findOne({
            where: { id_team: userFound.TeamIdTeam },
    })
    const teamName = team.name
    const accessToken = generateAccessToken({
            username: userFound.username,
            id_user: userFound.id_user,
            role: userFound.role,
    })
    const refreshToken = generateRefreshToken({
            username: userFound.username,
            id_user: userFound.id_user,
            role: userFound.role,
    })
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 15)
    const newRefreshToken = await RefreshToken.create({
            token: refreshToken,
            expiresAt: expiresAt,
    })
    await newRefreshToken.setUser(userFound.id_user)
    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 3600000, sameSite: 'none', secure: true, domain:domain})
    res.cookie('refreshToken', newRefreshToken.token, { httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000,  sameSite: 'none', secure: true, domain:domain})
    return res.status(200).json({
            id_user: userFound.id_user,
            username: userFound.username,
            first_name: userFound.first_name,
            email: userFound.email,
            avatar: userFound.avatar,
            role: userFound.role,
            TeamIdTeam: userFound.TeamIdTeam,
            active: userFound.active,
            teamName,
            ip_location: userFound.ip_location,
            access: true,
            accessToken: accessToken,
            refreshToken: refreshToken,
    })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = userLogin
