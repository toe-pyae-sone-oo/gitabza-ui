import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import classNames from 'classnames'
import SongEditor from '../../views/SongEditor/SongEditor'
import ArtistEditor from '../../views/ArtistEditor/ArtistEditor'
import ArtistList from '../../views/ArtistList/ArtistList'
import AdminNav from '../../components/AdminNav/AdminNav'
import AdminSidebar from '../../components/AdminSideBar/AdminSideBar'
import './AdminLayout.css'

const WIDTH_LIMIT = 768

const AdminLayout = () => {
  const [isOpen, setOpen] = useState(window.innerWidth > WIDTH_LIMIT)
  const [prevWidth, setPrevWidth] = useState(-1)

  const toggleSidebar = () => setOpen(!isOpen)

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth
      const isMobile = width <= WIDTH_LIMIT
      const wasMobile = prevWidth <= WIDTH_LIMIT
  
      if (isMobile !== wasMobile) {
        setOpen(!isMobile)
      }
  
      setPrevWidth(width)
    }

    updateWidth()

    window.addEventListener('resize', updateWidth)

    return () => window.removeEventListener('resize', updateWidth)
    
  }, [prevWidth])

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
              <Route exact path="/admin/artists" component={ArtistList} />
              <Route path="/admin/artists/new" component={ArtistEditor} />
              <Route path="/admin/artists/:id/edit" component={ArtistEditor} />
              <Route path="/admin/songs/new" component={SongEditor} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminLayout