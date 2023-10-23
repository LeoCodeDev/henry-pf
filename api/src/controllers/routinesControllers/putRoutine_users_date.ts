const { Routines_users } = require("../../db_connection");
import { Request, Response } from "express";

const putUserRoutineDate = async (req: Request, res: Response) => {
  const { idUser, idRoutine, Date, hour } = req.body;

  if (!idUser || !idRoutine || !Date || !hour) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const date = {
    Date: Date,
    hour: hour,
    complete: false,
  };

  try {
    const userRoutineDate = await Routines_users.findOne({
      where: { RoutineIdRoutine: idRoutine, UserIdUser: idUser },
    });
    if (!userRoutineDate) {
      return res.status(404).json({ error: "Routine not found" });
    }

    let newDates = userRoutineDate.date;
    newDates.push(date);

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

module.exports = putUserRoutineDate;
