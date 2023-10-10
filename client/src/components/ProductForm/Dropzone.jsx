import axios from 'axios'
import { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button } from '@mui/material'

const DropAndCrop = ({ endpoint, setProductImageURL }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [crop, setCrop] = useState({
    unit: '%',
    width: 100,
    height: 100,
  })

  const [croppedImage, setCroppedImage] = useState(null)

  useEffect(() => {
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile)
      setImageUrl(objectURL)

      const img = new Image()
      img.src = objectURL
      img.onload = () => {
        setImage(img)
      }
    }
  }, [selectedFile])

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length !== 1) {
      setSelectedFile(null)
      return
    }

    
    const objectURL = URL.createObjectURL(acceptedFiles[0])
    setImageUrl(objectURL)

    const img = new Image()
    img.src = objectURL
    img.onload = () => {
      setSelectedFile(acceptedFiles[0])
      setImage(img)
    }
  }

  const getCroppedImg = async (image, crop) => {
    if (!image) return null

    const canvas = document.createElement('canvas')
    const scaleX = (x) => (x * image.naturalWidth) / 100
    const scaleY = (y) => (y * image.naturalHeight) / 100
    canvas.width = scaleX(crop.width)
    canvas.height = scaleY(crop.height)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      scaleX(crop.x),
      scaleY(crop.y),
      scaleX(crop.width),
      scaleY(crop.height),
      0,
      0,
      scaleX(crop.width),
      scaleY(crop.height)
    )

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob)
        },
        'Blob',
        1
      )
    })
  }

  const handleAcceptCrop = async () => {
    if (!selectedFile || !image) return

    const croppedBlob = await getCroppedImg(image, crop)

    try {
      const formData = new FormData()
      formData.append('image', croppedBlob)
      

      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 200) {
        setCroppedImage(URL.createObjectURL(croppedBlob))
        setImage(null)
        setProductImageURL(response.data.url)
      } else {
        console.error({ response })
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const handleCancelCrop = () => {
    setCroppedImage(null)
    setImage(null)
    setImageUrl(null)
    setSelectedFile(null)
  }

  return (
    <div>
      {!selectedFile ? (
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone">
              <input
                {...getInputProps({ multiple: false, accept: 'image/*' })}
              />
              <p>Drag and drop some files here, or click to select files</p>
            </div>
          )}
        </Dropzone>
      ) : !croppedImage ? (
        <>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => {
              setCrop(percentCrop)
            }}
          >
            <img src={imageUrl} />
          </ReactCrop>
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={handleAcceptCrop}
            sx={{ mt: 3, mb: 2 }}
          >
            Crop
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={handleCancelCrop}
            sx={{ mt: 3, mb: 2 }}
          >
            Reset
          </Button>
        </>
      ) : (
        <>
          <img src={croppedImage} alt="Image preview" />
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={handleCancelCrop}
            sx={{ mt: 3, mb: 2 }}
          >
            Reset
          </Button>
        </>
      )}
    </div>
  )
}

export { DropAndCrop }
