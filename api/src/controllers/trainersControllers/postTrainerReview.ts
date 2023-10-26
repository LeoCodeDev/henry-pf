const { Trainers_users,User } = require('../../db_connection');
import { Request, Response } from "express";


const postTrainerReview = async (req: Request, res: Response) => {
    try {
        const { comment, rating, userId, trainerId } = req.body;

        let existingReview = await Trainers_users.findOne({
            where: {
                user_id: userId,
                trainer_id: trainerId
            },
        });

        if (existingReview) {
            // Si existe una revisión, debería preguntarme si esta tiene borrado lógico
            if (!existingReview.active) {
                await existingReview.update({comment: comment, rating: rating})

                return res.status(200).json({ message: "Reseña actualizada exitosamente", existingReview });
            } else {
                return res.status(400).json({ message: "No puedes actualizar una revisión inactiva." });
            }
        }


        // Si no existe una revisión previa, crea una nueva revisión
        const newReview = await Trainers_users.create({
            comment,
            rating,
            trainer_id:trainerId,
            user_id:userId
        }, {includes: User});
        ;
        
        // Después de crear la reseña, llama a la función para actualizar el rating del Trainero

        return res.status(201).json({ message: "Reseña publicada exitosamente", newReview });
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = postTrainerReview;
