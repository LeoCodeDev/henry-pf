import axios from 'axios'
import { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const DropAndCrop = ({ endpoint }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [crop, setCrop] = useState({
    unit: '%',
    width: 100,
    aspect: 1,
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
    const scaleX = image.naturalWidth / image.width
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
        'Blob',
        1
      )
    })
  }

  const handleAcceptCrop = async () => {
    if (!selectedFile || !image) return

    const croppedBlob = await getCroppedImg(image, crop)

    console.log(croppedBlob);

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 200) {
        setCroppedImage(URL.createObjectURL(croppedBlob))
        setImage(null)
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
          <ReactCrop crop={crop} onChange={(newCrop) => setCrop(newCrop)}>
            <img src={imageUrl} />
            <img src={croppedImage} alt="Image preview" />
          </ReactCrop>
          <button onClick={handleAcceptCrop} type="button">
            Crop
          </button>
          <button onClick={handleCancelCrop} type="button">
            Reset
          </button>
        </>
      ) : (
        <>
          <img src={croppedImage} alt="Image preview" />
          <button onClick={handleCancelCrop} type="button">
            Reset
          </button>
        </>
      )}
    </div>
  )
}

export { DropAndCrop }
