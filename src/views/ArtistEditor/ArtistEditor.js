import React, { useState, useEffect } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import ImageUpload from '../../components/ImageUpload/ImageUpload'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import { create, upload, findById, update } from '../../api/artists'
import { validateArtistForm } from '../../validators'
import './ArtistEditor.css'

const mapStateToProps = state => ({
  loading: state.loading,
})

const ArtistEditor = ({ loading, history, match }) => {

  const artistId = match.params.id || undefined

  const [form, setForm] = useState({
    name: '',
    slug: '',
  })

  const [file, setFile] = useState(undefined)

  const [picUrl, setPicUrl] = useState(undefined)

  const [errors, setErrors] = useState({
    name: '',
    slug: '',
  })

  useEffect(() => {
    if (artistId) {
      findById(artistId).then(({ name, slug, picture }) => {
        setForm({ name, slug })
        setPicUrl(picture)
      })
    }
  }, [artistId])

  const handleChange = e => {
    setForm({
      ...form, 
      [e.target.name]: e.target.value,
    })
  }

  const handleUpload = _file => {
    setFile(_file)
  }

  const handleError = _errors => ({ response }) => {
    if (response && response.status === 422) {
      if (response.data && response.data.message === 'slug already exists') {
        setErrors({ ..._errors, slug: response.data.message })
      }
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const _errors = validateArtistForm(form)
    setErrors(_errors)

    const isValid = Object.values(_errors).every(err => !err)
    if (isValid) {
      // handle picture upload
      let picture
      if (file) {
        try {
          const res = await upload(file)
          picture = res.file ?? undefined
        } catch (err) {
          // TODO: handle error later
          console.log(err)
          return
        }
      }

      if (artistId) {
        // handle updating artist
        update(artistId, { ...form, picture })
          .then(() => history.push('/admin/artists'))
          .catch(handleError(_errors))
      } else {
        // handle creating new artist
        create({ ...form, picture })
          .then(() => history.push('/admin/artists'))
          .catch(handleError(_errors))
      }
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{artistId ? 'Edit Artist' : 'Add New Artist'}</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Slug</Form.Label>
              <Form.Control
                name="slug"
                placeholder="Slug"
                value={form.slug}
                onChange={handleChange}
                disabled={loading}
                isInvalid={!!errors.slug}
              />
              <Form.Control.Feedback type="invalid">
                {errors.slug}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Picture</Form.Label>
              <ImageUpload url={picUrl} onUpload={handleUpload} />
            </Form.Group>
            <PrimaryButton 
              type="submit" 
              className="mr-2" 
              disabled={loading}
            >{loading ? 'Loading...' : 'Save'}</PrimaryButton>
            <Button 
              variant="secondary"
              onClick={() => history.push('/admin/artists')}
            >Cancel</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default connect(mapStateToProps, null)(ArtistEditor)