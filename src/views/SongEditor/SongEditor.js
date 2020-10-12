import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Col, Button, Card } from 'react-bootstrap'
import { validate } from '../../validators/songs'
import { getCapo } from '../../helpers/songs'
import { SAVE_SONG } from '../../constants/actionTypes'
import { create } from '../../api/songs'
import './SongEditor.css'

const mapDispatchToProps = dispatch => ({
  save: song => dispatch({ type: SAVE_SONG, payload: song })
})

const SongEditor = ({ save }) => {

  const [form, setForm] = useState({
    title: '',
    slug: '',
    artists: [],
    types: 'none',
    difficulty: 'none',
    capo: 'none',
    version: '',
    lyrics: '',
    youtube: '',
  })

  const [errors, setErrors] = useState({
    title: '',
    slug: '',
    artists: '',
  })

  const handleChange = e => {
    const key = e.target.name
    const val = e.target.value
    setForm({
      ...form,
      [key]: val,
    })
  }

  const handleArtists = e => {
    setForm({
      ...form,
      artists: Array.from(
        e.target.selectedOptions, 
        item => item.value
      )
    })
  }

  const handleError = ({ response }) => {
    if (response && response.status === 422) {
      if (response.data && response.data.message === 'slug already exists') {
        setErrors({ ...errors, slug: response.data.message })
      }
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const _errors = validate(form)
    setErrors(_errors)

    const isValid = Object.values(_errors).every(err => !err)
    if (isValid) {
      create(form).then(save).catch(handleError)
    }
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
              <Form.Label>Artists</Form.Label>
              <Form.Control 
                name="artists"
                as="select" 
                multiple
                value={form.artists}
                onChange={handleArtists}
                isInvalid={!!errors.artists}
              >
                <option value={null} disabled>
                  Choose Artist, Song Writer, Band, etc...
                </option>
                <option>Y Wine</option>
                <option>Lay Phyu</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.artists}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formTypes">
                <Form.Label>Types</Form.Label>
                <Form.Control 
                  name="types"
                  as="select" 
                  value={form.types}
                  onChange={handleChange}
                >
                  <option value="none">None</option>
                  <option value="bass">Bass</option>
                  <option value="chords">Chords</option>
                  <option value="drum">Drum</option>
                  <option value="tabs">Tabs</option>
                  <option value="ukelele">Ukelele</option>
                </Form.Control>
              </Form.Group>
              
              <Form.Group as={Col} controlId="formDifficulty">
                <Form.Label>Difficulty</Form.Label>
                <Form.Control 
                  name="difficulty"
                  as="select" 
                  value={form.difficulty}
                  onChange={handleChange}
                >
                  <option value="none">None</option>
                  <option value="novice">Novice</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formCapo">
                <Form.Label>Capo</Form.Label>
                <Form.Control 
                  name="capo"
                  as="select" 
                  value={form.capo}
                  onChange={handleChange}
                >
                  <option value="none">None</option>
                  {[...Array(12).keys()].map(i => 
                    <option key={i} value={getCapo(i + 1)}>{getCapo(i + 1)}</option>
                  )}
                </Form.Control>
              </Form.Group>
              
              <Form.Group as={Col} controlId="formVersion">
                <Form.Label>Version</Form.Label>
                <Form.Control 
                  name="version"
                  placeholder="Version" 
                  value={form.version}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formLyrics">
              <Form.Label>Lyrics & Chords</Form.Label>
              <Form.Control 
                name="lyrics"
                as="textarea" 
                rows={10} 
                placeholder="Lyrics & Chords"
                className="SongEditorForm__lyrics" 
                value={form.lyrics}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formYoutube">
              <Form.Label>Youtube</Form.Label>
              <Form.Control 
                name="youtube"
                placeholder="https://" 
                value={form.youtube}
                onChange={handleChange}
              />
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
  

export default connect(null, mapDispatchToProps)(SongEditor)