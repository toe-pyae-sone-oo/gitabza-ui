import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import './SongEditor.css'

const SongEditor = () => {

  const getCapo = i => {
    switch (i) {
      case 1: return '1st fret'
      case 2: return '2nd fret'
      case 3: return '3rd fret'
      default: return `${i}th fret`
    }
  }

  return (
    <>
      <h3>Add New Song</h3>
      <Form>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control placeholder="Title" required />
        </Form.Group>

        <Form.Group controlId="formSlug">
          <Form.Label>Slug</Form.Label>
          <Form.Control placeholder="Slug" />
        </Form.Group>

        <Form.Group controlId="formArtist">
          <Form.Label>Artist</Form.Label>
          <Form.Control as="select" defaultValue="Choose Artist, Song Writer, Band, etc...">
            <option value={null} disabled>Choose Artist, Song Writer, Band, etc...</option>
          </Form.Control>
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

        <Button className="SongEditorForm__btn-submit" variant="warning">Submit</Button>{' '}
        <Button variant="secondary">Cancel</Button>
      </Form>
    </>
  )
}
  

export default SongEditor