const { User, Team } = require('../../db_connection');
import { Request, Response } from 'express';

const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, username, first_name, last_name, avatar, team } = req.body;
    const updatedUser = await User.findOne({ where: { email } });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Si el nombre de usuario está cambiando
    if (username !== updatedUser.username) {
      const existingUserWithUsername = await User.findOne({
        where: { username },
      });

      // Verifica si el nuevo nombre de usuario ya está en uso por otro usuario
      if (existingUserWithUsername && existingUserWithUsername.email !== email) {
        return res.status(400).json({ error: 'Username already exists' });
      }
    }

    const updatedUserData = {
      username,
      first_name,
      last_name,
      avatar,
    };

    await updatedUser.update(updatedUserData);

    if (team) {
      const teamUpdate = await Team.findOne({ where: { name: team } });
      
      if (!teamUpdate) {
        return res.status(404).json({ error: 'Team not found' });
      }
      
      // Actualiza el equipo del usuario
      await updatedUser.setTeam(teamUpdate);
    }

    // Devuelve los datos actualizados del usuario en la respuesta
    const updatedUserWithTeam = await User.findOne({
      where: { email },
      include: [{ model: Team, as: 'Team' }],
    });

    return res.status(200).json(updatedUserWithTeam);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = updateUser;
