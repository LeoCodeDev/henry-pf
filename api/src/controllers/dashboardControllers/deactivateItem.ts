import { Request, Response } from "express";
const { User, Rating, Product } = require('../../db_connection');

const deactivateItem = async (req: Request, res: Response) => {
try {
    const { type, itemId, active } = req.params;
    let entity;
    switch (type) {
    case "User":
        entity = await User.findByPk(itemId);
        break;
    case "Comment":
        entity = await Rating.findByPk(itemId);
        break;
    case "Product":
        entity = await Product.findByPk(itemId);
        break;
    default:
        return res.status(400).json({ error: "Invalid type" });
    }
    if (!entity) {
        return res.status(404).json({ error: "Entity not found" });
    }
    await entity.update({ active });
    return res.status(200).json({ message: `${type} deactivated successfully` });
} catch (error: any) {
    return res.status(500).json(error.message);
}
};

export default deactivateItem;
