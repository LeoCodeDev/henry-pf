const {User, Team}= require("../../db_connection")
import { Request, Response } from "express";
import geoLocation from '../geolocation'
interface CustomRequest extends Request {
    clientIp?: any; // Ajusta el tipo de 'user' según lo que esperes
}

const postUser= async (req: CustomRequest, res: Response) => {

    const ip = req.clientIp

     const ip_location = await geoLocation(ip)
     
    try {
        const { username, first_name, last_name, password, avatar, email, birth_date, role, team} = req.body;
        if (username!== "" && first_name!== "" && last_name!== "" && password!== "" && email!== ""&& avatar!== "" && birth_date!== "" && role!== "") {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) return res.status(400).json({ message: 'Username is already in use' });
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: {
                username,
                first_name,
                last_name,
                password,
                avatar,
                email,
                birth_date,
                role, 
                ip_location
            },
            include:Team
        } 
        );
        if (created) {
            const associatedTeam= await Team.findOne({ where: { name: team || "Users" } });
            if(associatedTeam){
                await user.setTeam(associatedTeam)
            }
            return res.status(200).json({ message: 'User created successfully', });
        } else {
            return res.status(200).json({ message: 'Email already registered'});
        }
    } else {
       return res.status(400).json({ message: 'Missing data' });
    }
    }
    catch (error:any) {
        return res.status(500).json({error:error.message});
    }
}

module.exports = postUser