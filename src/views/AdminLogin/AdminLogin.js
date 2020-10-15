import React from 'react'
import { Card, Form } from 'react-bootstrap'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import './AdminLogin.css'

const AdminLogin = () => 
  <>
    <Card className="AdminLogin__card mx-auto">
      <Card.Body>
        <h1 className="text-center">Gita B Za</h1>
        <p className="text-center text-secondary">Guitar Chords Library For Myanmar Songs</p>
        <Form onSubmit={e => e.preventDefault()}>
          <Form.Group>
            <Form.Control
              name="username"
              placeholder="Username"
              size="lg"
            />
            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              name="password"
              placeholder="Password"
              size="lg"
            />
          </Form.Group>
          <PrimaryButton type="submit" block size="lg">Login</PrimaryButton>
        </Form>
      </Card.Body>
    </Card>
  </>

export default AdminLogin