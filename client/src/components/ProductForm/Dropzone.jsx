import axios from 'axios'
import { useState } from 'react'
import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const DropAndCrop = ({ endpoint }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [crop, setCrop] = useState({
    unit: '%',
    width: 100,
    aspect: 1,
  })

  const [croppedImage, setCroppedImage] = useState(null)

  const onDrop = (acceptedFiles) => {
    return acceptedFiles.length === 1
      ? (setSelectedFile(acceptedFiles[0]), setImageUrl(URL.createObjectURL(acceptedFiles[0])))
      : setSelectedFile(null)
  }

  const getCroppedImg = async (image, crop) => {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWith / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob)
        },
        'image/jpeg',
        1
      )
    })
  }

  const handleAcceptCrop = async () => {
    if (!selectedFile) return

    const croppedImageUrl = await getCroppedImg(selectedFile, crop)

    try {
      const formData = new FormData()
      formData.append('image', croppedImageUrl)

      const response = await axios.post(endpoint, formData)

      console.log({ response })

      response.status === 200
        ? (setSelectedFile(null), setCroppedImage(null))
        : null
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const handleCancelCrop = () => {
    setSelectedFile(null)
    setCroppedImage(null)
  }

  return (
    <div>
      {!selectedFile ? (
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>Drag and drop some files here, or click to select files</p>
            </div>
          )}
        </Dropzone>
      ) : !croppedImage ? (
        <>
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
          >
            <img src={imageUrl} />
            </ReactCrop>
          <button onClick={handleAcceptCrop}>Crop</button>
          <button onClick={handleCancelCrop}>Reset</button>
        </>
      ) : (
        <>
          <img src={croppedImage} alt="Image preview" />
          <button onClick={handleCancelCrop}>Reset</button>
        </>
      )}
    </div>
  )
}

export { DropAndCrop }
