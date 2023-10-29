import { Request, Response } from "express";
const { User, Rating, Product } = require('../../db_connection');

const deactivateItem = async (req: Request, res: Response) => {
try {
    const { type, itemId, active } = req.body;
    const parseItemId=parseInt(itemId)
    let entity;
    switch (type) {
    case "User":
        entity = await User.findByPk(parseItemId);
        break;
    case "Comment":
        entity = await Rating.findByPk(parseItemId);
        break;
    case "Product":
        entity = await Product.findByPk(parseItemId);
        break;
    default:
        return res.status(400).json({ message: "Invalid type" });
    }
    if (!entity) {
        return res.status(404).json({message: "Entity not found" });
    }
    await entity.update({ active });
    return res.status(200).json({ message: `${type} deactivated successfully` });
} catch (error: any) {
    return res.status(500).json({error:error.message});
}
};

module.exports= deactivateItem;
