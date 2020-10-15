import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, Form } from 'react-bootstrap'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import { validateAdminLoginForm } from '../../validators'
import { login } from '../../api/adminLogin'
import { saveToken } from '../../helpers/adminLogin'
import { SET_ADMIN_TOKEN } from '../../constants/actionTypes'
import './AdminLogin.css'

const mapStateToProps = state => ({
  loading: state.loading,
})

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch({ type: SET_ADMIN_TOKEN, payload: token })
})

const AdminLogin = ({ loading, setToken, history, location }) => {
  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({ username: '', password: '' })

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleToken = ({ token }) => {
    saveToken(token)
    setToken(token)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const _errors = validateAdminLoginForm(form)
    setErrors(_errors)

    const valid = Object.values(_errors).every(err => !err)
    if (valid) {
      login(form)
        .then(handleToken)
        .then(() => {
          const q = new URLSearchParams(location.search)
          const redirect = q.has('redirect') ? q.get('redirect') : '/admin'
          history.push(redirect)
        })
        .catch(({ response }) => {
          if (
            response && 
            response.data && 
            response.status === 401
          ) {
            const { message } = response.data
            if (message === 'user not found') {
              setErrors({ password: '', username: message })
            } else if (message === 'wrong password') {
              setErrors({ username: '', password: message })
            }
          }
        })
    }
  }

  return (
    <>
      <Card className="AdminLogin__card mx-auto">
        <Card.Body>
          <h1 className="text-center">Gita B Za</h1>
          <p className="text-center text-secondary">
            Guitar Chords Library For Myanmar Songs
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                name="username"
                type="text"
                placeholder="Username"
                size="lg"
                value={form.username}
                onChange={handleChange}
                isInvalid={errors.username}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                size="lg"
                value={form.password}
                onChange={handleChange}
                isInvalid={errors.password}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <PrimaryButton 
              type="submit" 
              block 
              size="lg"
              disabled={loading}
            >Login</PrimaryButton>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin)