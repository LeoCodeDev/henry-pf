const { Routines_users } = require("../../db_connection");
import { Request, Response } from "express";

const putUserRoutineDateMonth = async (req: Request, res: Response) => {
  const { idUser, idRoutine, Dates, Hour } = req.body;

  if (!idUser || !idRoutine || !Dates) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userRoutineDate = await Routines_users.findOne({
      where: { RoutineIdRoutine: idRoutine, UserIdUser: idUser },
    });
    if (!userRoutineDate) {
      return res.status(404).json({ error: "Routine not found" });
    }

    let newDates = userRoutineDate.date;

    Dates.forEach((date: { Date: string }) => {
      const day = {
            Date: date,
            hour: Hour ? Hour : '12:00:00',
            complete: false,
          };
      
      if (newDates === null) {
        newDates = [day];
      } else {
        newDates.push(day);
      }
    });

    // Usa el método update para actualizar la propiedad date en la base de datos
    await Routines_users.update(
      { date: newDates },
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

module.exports = putUserRoutineDateMonth;
