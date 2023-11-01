const { Rating } = require('../../db_connection');
import { Request, Response } from "express";
const ratingService = require('../../services/ratingService'); 

const postProductReview = async (req: Request, res: Response) => {
    try {
        const { comment, rating, userId, productId } = req.body;

        let existingReview = await Rating.findOne({
            where: {
                userId,
                productId,
            },
        });

        if (existingReview) {
            // Si existe una revisión, debería preguntarme si esta tiene borrado lógico
            if (!existingReview.active) {
                existingReview.comment = comment;
                existingReview.rating = rating;
                existingReview.active = true;
                await existingReview.save();
                
                await ratingService.updateProductRating(productId);

                return res.status(200).json({ message: "Reseña actualizada exitosamente", existingReview });
            } else {
                return res.status(400).json({ message: "No puedes actualizar una revisión inactiva." });
            }
        }

        // Si no existe una revisión previa, crea una nueva revisión
        const newReview = await Rating.create({
            comment,
            rating,
            userId,
            productId,
            active: true,
        });

        // Después de crear la reseña, llama a la función para actualizar el rating del producto
        await ratingService.updateProductRating(productId);

        return res.status(201).json({ message: "Reseña publicada exitosamente", newReview });
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = postProductReview;
