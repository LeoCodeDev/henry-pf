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
            if (!existingReview.active) {
                existingReview.comment = comment;
                existingReview.rating = rating;
                existingReview.active = true;
                await existingReview.save();
                
                await ratingService.updateProductRating(productId);

                return res.status(200).json({ message: "Review updated succesfully", existingReview });
            } else {
                return res.status(400).json({ message: "Review is not active" });
            }
        }

        const newReview = await Rating.create({
            comment,
            rating,
            userId,
            productId,
            active: true,
        });
        await ratingService.updateProductRating(productId);
        return res.status(201).json({ message: "Review posted succesfully", newReview });
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = postProductReview;
