const { Routines_users } = require('../../db_connection');
import { Request, Response } from 'express';

const deleteDateRoutine = async (req: Request, res: Response) => {
  const { idUser, idRoutine, day, Hour } = req.body;

  
  if (!idUser || !idRoutine ||  !day ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userRoutineDate = await Routines_users.findOne({
      where: { RoutineIdRoutine: idRoutine, UserIdUser: idUser },
    });

    if (!userRoutineDate) {
      return res.status(404).json({ error: 'Routine not found' });
    }

    let dates = userRoutineDate.date;

    const dateToUpdate = dates.filter((date: { Date: string; hour: string; }) => !(date.Date === day && date.hour === Hour));

    if (dateToUpdate.length === dates.length) {
      return res.status(404).json({ error: 'Date not found in the routine' });
    }
    await Routines_users.update(
        { date: dateToUpdate },
      { where: { RoutineIdRoutine: idRoutine, UserIdUser: idUser } }
    );
    const updatedUserRoutineDate = await Routines_users.findOne({
      where: { RoutineIdRoutine: idRoutine, UserIdUser: idUser },
    });

    return res.status(200).json(updatedUserRoutineDate);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteDateRoutine;
