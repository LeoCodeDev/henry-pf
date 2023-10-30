import { Request, Response } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const postImage = upload.single('image')

const processImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' })
  }
  try {
    cloudinary.uploader
      .upload_stream(
        { resource_type: 'image', folder: 'healtech/products' },
        (error, result) => {
          if (error || !result) {
            return res.status(500).json({ error: error?.message })
          } else {
            return res
              .status(200)
              .json({ message: 'Image uploaded', url: result.secure_url })
          }
        }
      )
      .end(req.file.buffer)
      return
  } catch (error:any) {
    return res.status(500).json({ error:error.message })
  }
}
module.exports = { postImage, processImage }
