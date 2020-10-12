import React, { useState, useEffect } from 'react'
import { Form, Image } from 'react-bootstrap'
import './ImageUpload.css'

const ImageUpload = ({ onUpload, width = 100, height = 100 }) => {

  const [file, setFile] = useState(undefined)
  const [fileUrl, setFileUrl] = useState(undefined)

  let _file

  const handleClick = () => {
    _file.click()
  }

  const handleChange = e => {
    const upload = e.target.files[0]
    setFile(upload)
    onUpload(upload)
  }

  useEffect(() => {
    setFileUrl(file ? URL.createObjectURL(file) : undefined)
  }, [file])

  return (
    <div>
      <Form.File 
        ref={input => _file = input} 
        className="ImageUpload--file"
        accept="image/*"
        onChange={handleChange}
      />
      <Image 
        className="ImageUpload--img"
        style={{ width, height }}
        thumbnail
        src={fileUrl ? fileUrl : `${window.location.origin}/logo192.png`} 
        onClick={handleClick}
      />
    </div>
  ) 
}

export default ImageUpload