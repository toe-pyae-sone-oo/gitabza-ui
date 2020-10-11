import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import classNames from 'classnames'
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
            <p className="py-5">This is a start</p>
            <p className="py-5">This is a test</p>
            <p className="py-5">This is a test</p>
            <p className="py-5">This is a test</p>
            <p className="py-5">This is a test</p>
            <p className="py-5">This is a test</p>
            <p className="py-5">This is a test</p>
            <p className="py-5">This is an end</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminLayout