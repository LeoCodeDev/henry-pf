const { Routines_users } = require('../../db_connection');
import { Request, Response } from 'express';

const putUserRoutineDate = async (req: Request, res: Response) => {
  const { idUser, idRoutine, Date, hour } = req.body;

  const date = Date + "T" + hour;

  try {
    const userRoutineDate = await Routines_users.findOne({
      where: { RoutineIdRoutine: idRoutine, UserIdUser: idUser },
    });
    if (!userRoutineDate) {
      return res.status(404).json({ error: 'Routine not found' });
    }

    let newDates = userRoutineDate.date;
    if (newDates !== null) {
      newDates.push(date);
    } else {
      newDates = [date];
    }

    userRoutineDate.date = newDates;
    await userRoutineDate.save();

    return res.status(200).json(userRoutineDate);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = putUserRoutineDate;
