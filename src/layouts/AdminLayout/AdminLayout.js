import React, { useState, useEffect } from 'react'
import { Switch } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import classNames from 'classnames'
import SongList from '../../views/SongList/SongList'
import SongEditor from '../../views/SongEditor/SongEditor'
import ArtistEditor from '../../views/ArtistEditor/ArtistEditor'
import ArtistList from '../../views/ArtistList/ArtistList'
import AdminLogin from '../../views/AdminLogin/AdminLogin'
import AdminNav from '../../components/AdminNav/AdminNav'
import AdminSidebar from '../../components/AdminSideBar/AdminSideBar'
import AuthenticatedRoute from '../../routes/AuthenticatedRoute'
import UnauthenticatedRoute from '../../routes/UnauthenticatedRoute'
import './AdminLayout.css'

const WIDTH_LIMIT = 768

const AdminLayout = () => {
  const [isOpen, setOpen] = useState(window.innerWidth > WIDTH_LIMIT)
  const [prevWidth, setPrevWidth] = useState(-1)
  const [isAuthenticated, setAuthenticated] = useState(false) 

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
      {isAuthenticated && <AdminNav toggle={toggleSidebar} />}
      {isAuthenticated && <AdminSidebar isOpen={isOpen} />}
      <Container  
        fluid
        className={classNames({ 
          'AdminLayoutContainer--is-open': isOpen && isAuthenticated, 
          AdminLayoutContainer: isAuthenticated 
        })}
      >
        <Row className={classNames({ 'vh-100': !isAuthenticated })}>
          <Col className={classNames({ 'my-auto': !isAuthenticated })}>
            <Switch>
              <UnauthenticatedRoute 
                path="/admin/login" 
                component={AdminLogin} 
                appProps={{ isAuthenticated }}
                redirect={'/admin'}
              />
              <AuthenticatedRoute 
                exact 
                path="/admin/artists" 
                component={ArtistList} 
                appProps={{ isAuthenticated }}
                redirect={'/admin/login'}
              />
              <AuthenticatedRoute 
                path="/admin/artists/new" 
                component={ArtistEditor} 
                appProps={{ isAuthenticated }}
                redirect={'/admin/login'}
              />
              <AuthenticatedRoute 
                path="/admin/artists/:id/edit" 
                component={ArtistEditor} 
                appProps={{ isAuthenticated }}
                redirect={'/admin/login'}
              />
              <AuthenticatedRoute 
                exact 
                path="/admin/songs" 
                component={SongList} 
                appProps={{ isAuthenticated }}
                redirect={'/admin/login'}
              />
              <AuthenticatedRoute 
                path="/admin/songs/new" 
                component={SongEditor} 
                appProps={{ isAuthenticated }}
                redirect={'/admin/login'}
              />
              <AuthenticatedRoute 
                path="/admin/songs/:id/edit" 
                component={SongEditor} 
                appProps={{ isAuthenticated }}
                redirect={'/admin/login'}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminLayout