
import { Response , Request } from "express";
import cloudinary from 'cloudinary'

const delImage = async (req: Request, res: Response) =>{
    const {image} = req.body;  
    try {
        await cloudinary.v2.api
            .delete_resources([image], 
                { type: 'upload', resource_type: 'image' })
            
        return res.status(200).json({message: "Image Updated"});
    } catch (error:any) {
        return res.status(500).json({error: error.message})
    }
}


module.exports = delImage
