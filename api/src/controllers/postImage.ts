import { Request, Response } from "express";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const postImage = upload.single('image');

const processImage = async (req: Request, res: Response) => {
  if(!req.file){
    return res.status(400).json({error: 'No image provided'})
  }
  const imageBuffer = req.file.buffer
  return res.status(200).json({message: 'Image processed', imageBuffer})
}

console.log(postImage);

module.exports = {postImage, processImage}