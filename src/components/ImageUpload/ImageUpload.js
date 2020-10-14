import React, { useState, useEffect } from 'react'
import { Form, Image } from 'react-bootstrap'
import './ImageUpload.css'

const ImageUpload = ({ url, onUpload, width = 150, height = 150 }) => {

  const [file, setFile] = useState(undefined)
  const [fileUrl, setFileUrl] = useState(undefined)

  useEffect(() => {
    setFileUrl(url)
  }, [url])

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
    <div 
      className="ImageUpload"
      onClick={handleClick}
      style={{ width, height }}
    >
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
        src={fileUrl ?? `${window.location.origin}/logo192.png`} 
      />
    </div>
  ) 
}

export default ImageUpload