const {User, Team}= require("../../db_connection")
import { Request, Response } from "express";
import geoLocation from '../geolocation'


const postUser= async (req: Request, res: Response) => {
    
     const ip_location = await geoLocation()
    try {
        const { username, first_name, last_name, password, avatar, email, birth_date, role, team} = req.body;
        if (username!== "" && first_name!== "" && last_name!== "" && password!== "" && email!== ""&& avatar!== "" && birth_date!== "" && team!== "" && role!== "") {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) res.status(400).json({ message: 'Username is already in use' });
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
            const associatedTeam= await Team.findOne({ where: { name: team } });
            if(associatedTeam){
                await user.setTeam(associatedTeam)
            }
            res.status(200).json({ message: 'User created successfully', });
        } else {
            res.status(200).json({ message: 'Email already registered'});
        }
    } else {
        res.status(400).json({ message: 'Missing data' });
    }
    }
    catch (error:any) {
        res.status(500).json({error:error.message});
    }
}

module.exports = postUser