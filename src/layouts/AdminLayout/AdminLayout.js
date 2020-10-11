import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import classNames from 'classnames'
import SongEditor from '../../views/SongEditor/SongEditor'
import AdminNav from '../../components/AdminNav/AdminNav'
import AdminSidebar from '../../components/AdminSideBar/AdminSideBar'
import './AdminLayout.css'

const AdminLayout = () => {
  const [isOpen, setOpen] = useState(true)

  const toggleSidebar = () => setOpen(!isOpen)

  return (
    <div>
      <AdminNav toggle={toggleSidebar} />
      <AdminSidebar isOpen={isOpen} />
      <Container  
        fluid
        className={classNames('AdminLayoutContainer', { 'AdminLayoutContainer--is-open': isOpen })}
      >
        <Row>
          <Col>
            <Switch>
              <Route path="/admin/songs/new" component={SongEditor} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminLayout