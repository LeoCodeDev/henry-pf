const {User, Team}= require("../db_connection")
import { Request, Response } from "express";


const postUser= async (req: Request, res: Response) => {
    try {
        const { username, first_name, last_name, password, avatar, email, birth_date, active,  role, team} = req.body;
        if (username!== "" && first_name!== "" && last_name!== "" && password!== "" && email!== ""&& avatar!== "" && birth_date!== "" && team!== "" && role!== "") {        
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
                active,
                role 
            },
            include:Team
        } 
        );
        if (created) {
            console.log('user', user)
            if(role==="User"){
            const [associatedTeam, _created]= await Team.findOrCreate({ where: { name: team } });
            if(associatedTeam){
                await user.setTeam(associatedTeam)
            }}
            res.status(201).json({ message: 'User created successfully', data: user});
        } else {
            res.status(200).json({ message: 'Email already registered', data: user });
        }
    } else{
        res.status(400).json({ message: 'Missing data' });
    }
    }
    catch (error) {
        console.error('Error creating users:', error);
        res.status(500).json(error);
    }
}

module.exports = postUser