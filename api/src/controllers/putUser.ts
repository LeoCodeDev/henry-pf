const { User, Team } = require('../db_connection');
import {Request,Response} from 'express'

const updateUser = async (req:Request, res:Response) => {
    try {
    const { email, username, first_name, last_name, avatar, team } = req.body;
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername && existingUsername.email !== email) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    const updatedUser = await User.findOne({ where: { email } });
    if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
    }
    const updatedUserData = {
        username,
        first_name,
        last_name,
        avatar,
    };
    await updatedUser.update(updatedUserData);
    if (team) {
        const teamUpdate = await Team.findOne({ where: { name: team} });
        if (!teamUpdate) {
        return res.status(404).json({ error: 'Team not found' });
        }
        await updatedUser.setTeam(teamUpdate);
    }
    return res.status(200).json('User updated Succesfully');
    } catch (error:any) {
    return res.status(500).json({ error: error.message });
    }
};

module.exports = updateUser;
