import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import ImageUpload from '../../components/ImageUpload/ImageUpload'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import './ArtistEditor.css'

const ArtistEditor = () => 
  <>
    <Card>
      <Card.Body>
        <Card.Title>Add New Artist</Card.Title>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Slug</Form.Label>
            <Form.Control
              name="slug"
              placeholder="Slug"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Picture</Form.Label>
            <ImageUpload onUpload={console.log} />
          </Form.Group>
          <PrimaryButton className="mr-2">Save</PrimaryButton>
          <Button variant="secondary">Cancel</Button>
        </Form>
      </Card.Body>
    </Card>
  </>

export default ArtistEditor