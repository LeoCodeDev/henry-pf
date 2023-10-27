const { Routines_users } = require('../../db_connection');
import { Request, Response } from 'express';

const putUserRoutineNewDate = async (req: Request, res: Response) => {
  const { idUser, idRoutine, originDate, originHour, newDate, newHour } = req.body;

  
  if (!idUser || !idRoutine || !originDate ||  !newDate ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userRoutineDate = await Routines_users.findOne({
      where: { RoutineIdRoutine: idRoutine, UserIdUser: idUser },
    });

    if (!userRoutineDate) {
      return res.status(404).json({ error: 'Routine not found' });
    }

    let newDates = userRoutineDate.date;

    const dateToUpdate = newDates.find((date: { Date: string; hour: string; }) => date.Date === originDate && date.hour === originHour);

    if (!dateToUpdate) {
      return res.status(404).json({ error: 'Date not found in the routine' });
    }

    // Actualiza la fecha y la hora en el objeto local
    dateToUpdate.Date = newDate;
    if(newHour)dateToUpdate.hour = newHour;
    

    // Usa el método update para actualizar la propiedad date en la base de datos
    await Routines_users.update(
        { date: newDates }, // Filtra la fecha que coincida
      { where: { RoutineIdRoutine: idRoutine, UserIdUser: idUser } }
    );

    // Recupera el objeto actualizado desde la base de datos
    const updatedUserRoutineDate = await Routines_users.findOne({
      where: { RoutineIdRoutine: idRoutine, UserIdUser: idUser },
    });

    return res.status(200).json(updatedUserRoutineDate);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = putUserRoutineNewDate;
