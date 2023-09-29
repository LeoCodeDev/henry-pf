const { User } = require("../db_connection");
import { Request, Response} from "express";



const putNewPasswordUser = async (req : Request, res : Response) => {
    const {  actualPassword , newPassword , newPasswordAgain} = req.body;
    const { id } = req.params;
  
    try {


      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      if (actualPassword !== user.password) return res.status(401).json({ message: "Contraseña incorrecta" });

      if (newPassword !== newPasswordAgain)
        return res.status(401).json({ message: "Las contraseñas no coinciden" });

      user.password = newPassword;
      await user.save();
  
      return res.status(200).json({ message: "Contraseña actualizada con éxito" });
    } catch (error: any) {

      return res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = putNewPasswordUser;