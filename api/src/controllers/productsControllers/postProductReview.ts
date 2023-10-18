// const {Rating} = require('../../db_connectionconnection');
// import {Request, Response} from "express";

// const postProductReview = async (req: Request, res: Response) =>{
//     try {
//         const {comment, rating, userId, productId} = req.body;
//         const newReview = await Rating.create({
//             comment,
//             rating,
//             userId,
//             productId,
//         });
//         return res.status(201).json({message: "Published review",newReview})
//     } catch (error:any) {
//         return res.status(500).json({error:error.message});
//     }
// }


// module.exports = postProductReview;

const { Rating } = require('../../db_connection');
import { Request, Response } from "express";
const ratingService = require('../../services/ratingService'); 

const postProductReview = async (req: Request, res: Response) => {
    try {
        const { comment, rating, userId, productId } = req.body;

        const existingReview = await Rating.findOne({
            where: {
                userId,
                productId,
            },
        });

        if (existingReview) {
            return res.status(400).json({ message: "Ya has publicado una reseña para este producto." });
        }

        const newReview = await Rating.create({
            comment,
            rating,
            userId,
            productId,
        });

        // Después de crear la reseña, llama a la función para actualizar el rating del producto
        await ratingService.updateProductRating(productId);

        return res.status(201).json({ message: "Reseña publicada exitosamente", newReview });
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = postProductReview;
