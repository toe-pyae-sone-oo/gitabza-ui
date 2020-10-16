import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'
import { SET_ERROR } from './constants/actionTypes'
import { removeToken } from './helpers/adminLogin'

const mapStateToProps = state => ({
  error: state.error
})

const mapDispatchToProps = dispatch => ({
  setError: error => dispatch({ type: SET_ERROR, payload: error })
})

const App = ({ error, setError, history }) => {
  const [dialog, setDialog] = useState(false)

  useEffect(() => {
    setDialog(!!error)
  }, [error])

  const closeDialog = () => {
    setDialog(false)
    setError(false)
    if (error.status === 401) {
      removeToken()
      history.push('/admin/login')
    }
  }

  return (
    <div className="App">
      <Modal 
        animation={false}
        show={dialog} 
        onHide={closeDialog}
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error ? error.message : 'Server not responding'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Switch>
        <Route exact path="/" component={DefaultLayout} />
        <Route path="/admin" component={AdminLayout} />
      </Switch>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
