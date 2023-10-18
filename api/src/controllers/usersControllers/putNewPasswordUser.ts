const { User } = require("../../db_connection");
import { Request, Response} from "express";



const putNewPasswordUser = async (req : Request, res : Response) => {
    const {resetToken, actualPassword , newPassword , newPasswordAgain} = req.body;
    const { id } = req.params;  
    const resetTokenCookies=req.cookies.resetToken;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (actualPassword !== user.password) return res.status(401).json({ message: "Incorrect password" });
      if (newPassword !== newPasswordAgain)
        return res.status(401).json({ message: "Passwords do not match" });
        if(resetTokenCookies!==resetToken) return res.status(401).json({ message: "Incorrect token" })
      user.password = newPassword;
      await user.save();  
      return res.status(200).json({ message: "updated password " });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = putNewPasswordUser;