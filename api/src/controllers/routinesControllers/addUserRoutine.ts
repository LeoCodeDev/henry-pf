const { User, Routine } = require('../../db_connection');
import {Request, Response} from 'express';

const associateRoutineWithUser = async (req:Request, res:Response) => {
    try {
    const { email, routine } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const foundRoutine = await Routine.findByPk(routine);
    if (!foundRoutine) {
        return res.status(404).json({ error: 'Routine not found' });
    }
        const routinesAssociated = await user.getRoutines()
    const filtered= routinesAssociated.filter((e:any)=>(e.id_routine==routine))
    if(filtered.length){
        return res.status(400).json({ error: 'Routine already associated with user' })
    } else{
        await user.addRoutine(foundRoutine);
        return res.status(200).json({ message: 'Routine associated with user successfully' });
    }
    } catch (error:any) {
    return res.status(500).json({ error: error.message });
    }
};

module.exports = associateRoutineWithUser;