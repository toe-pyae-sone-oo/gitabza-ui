import React, { useState } from 'react'
import { Form, Col, Button, Card } from 'react-bootstrap'
import { validate } from '../../validators/songs'
import { getCapo } from '../../helpers/songs'
import './SongEditor.css'

const SongEditor = () => {

  const [form, setForm] = useState({
    title: '',
    slug: '',
    artist: '',
  })

  const [errors, setErrors] = useState({
    title: '',
    slug: '',
    artist: '',
  })

  const handleChange = e => {
    const key = e.target.name
    const val = e.target.value
    setForm({
      ...form,
      [key]: val,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setErrors(validate(form))
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Add New Song</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                name="title" 
                placeholder="Title" 
                value={form.title}
                onChange={handleChange}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formSlug">
              <Form.Label>Slug</Form.Label>
              <Form.Control 
                name="slug"
                placeholder="Slug" 
                value={form.slug}
                onChange={handleChange}
                isInvalid={!!errors.slug}
              />
              <Form.Control.Feedback type="invalid">
                {errors.slug}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formArtist">
              <Form.Label>Artist</Form.Label>
              <Form.Control 
                name="artist"
                as="select" 
                value={form.artist}
                onChange={handleChange}
                isInvalid={!!errors.artist}
              >
                <option value={null} disabled>
                  Choose Artist, Song Writer, Band, etc...
                </option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.artist}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formTypes">
                <Form.Label>Types</Form.Label>
                <Form.Control as="select" defaultValue="Choose Type">
                  <option value={null} disabled>Choose Type</option>
                  <option value={null}>None</option>
                  <option>Bass</option>
                  <option>Chords</option>
                  <option>Drum</option>
                  <option>Tabs</option>
                  <option>Ukelele</option>
                </Form.Control>
              </Form.Group>
              
              <Form.Group as={Col} controlId="formDifficulty">
                <Form.Label>Difficulty</Form.Label>
                <Form.Control as="select" defaultValue="Choose Difficulty">
                  <option value={null} disabled>Choose Difficulty</option>
                  <option value={null}>None</option>
                  <option>Novice</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formCapo">
                <Form.Label>Capo</Form.Label>
                <Form.Control as="select" defaultValue="Choose Capo">
                  <option value={null} disabled>Choose Capo</option>
                  <option value={null}>None</option>
                  {[...Array(12).keys()].map(i => 
                    <option key={i}>{getCapo(i + 1)}</option>
                  )}
                </Form.Control>
              </Form.Group>
              
              <Form.Group as={Col} controlId="formVersion">
                <Form.Label>Version</Form.Label>
                <Form.Control placeholder="Version" />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formLyrics">
              <Form.Label>Lyrics & Chords</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={10} 
                placeholder="Lyrics & Chords"
                className="SongEditorForm__lyrics" 
              />
            </Form.Group>

            <Form.Group controlId="formYoutube">
              <Form.Label>Youtube</Form.Label>
              <Form.Control placeholder="https://" />
            </Form.Group>

            <Button 
              className="SongEditorForm__btn-submit mr-2" 
              type="submit"
              variant="warning"
            >Submit</Button>
            <Button variant="secondary">Cancel</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
  

export default SongEditor