const { Routines_users } = require("../../db_connection");
import { Request, Response } from "express";

const putUserRoutineDateCheck = async (req: Request, res: Response) => {
  const { idUser, idRoutine, Date, hour } = req.body;

  if (!idUser || !idRoutine || !Date || !hour) {
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
    const checkToUpdate = newDates.find((date: { Date: string; hour: string; }) => date.Date === Date && date.hour === hour);

    if(!checkToUpdate.complete){
        checkToUpdate.complete = true;
    }else{
        checkToUpdate.complete = false;
    }
    
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

module.exports = putUserRoutineDateCheck;
