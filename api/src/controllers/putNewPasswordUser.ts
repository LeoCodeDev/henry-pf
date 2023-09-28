const { User } = require("../db_connection");
import { Request, Response} from "express";



const putNewPasswordUser = async (req : Request, res : Response) => {
    const { newPassword } = req.body;
    const { userId } = req.params;
  
    try {
      // Busca el usuario por su ID
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      user.password = newPassword;
      await user.save({ fields: ['password'] });
  
      return res.status(200).json({ message: "Contraseña actualizada con éxito" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = putNewPasswordUser;