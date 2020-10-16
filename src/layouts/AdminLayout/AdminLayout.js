import React, { useState, useEffect } from 'react'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'
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
import { getToken } from '../../helpers/adminLogin'
import { SET_ADMIN_TOKEN } from '../../constants/actionTypes'
import './AdminLayout.css'

const WIDTH_LIMIT = 768

const mapStateToProps = state => ({
  token: state.adminToken,
})

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch({ type: SET_ADMIN_TOKEN, payload: token })
})

const AdminLayout = ({ token, setToken }) => {
  const [isOpen, setOpen] = useState(window.innerWidth > WIDTH_LIMIT)
  const [prevWidth, setPrevWidth] = useState(-1)
  const [authenticated, setAuthenticated] = useState(!!getToken())

  useEffect(() => {
    setToken(getToken())
  }, [setToken])

  useEffect(() => {
    setAuthenticated(!!token || !!getToken())
  }, [token])

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
      {authenticated && <AdminNav toggle={toggleSidebar} />}
      {authenticated && <AdminSidebar isOpen={isOpen} />}
      <Container  
        fluid
        className={classNames({ 
          'AdminLayoutContainer--is-open': isOpen && authenticated, 
          AdminLayoutContainer: authenticated 
        })}
      >
        <Row className={classNames({ 'vh-100': !authenticated })}>
          <Col className={classNames({ 'my-auto': !authenticated })}>
            <Switch>
              <AuthenticatedRoute 
                exact 
                path="/admin/artists" 
                component={ArtistList} 
                appProps={{ authenticated }}
                redirect={'/admin/login'}
              />
              <AuthenticatedRoute 
                path="/admin/artists/new" 
                component={ArtistEditor} 
                appProps={{ authenticated }}
                redirect={'/admin/login'}
              />
              <AuthenticatedRoute 
                path="/admin/artists/:id/edit" 
                component={ArtistEditor} 
                appProps={{ authenticated }}
                redirect={'/admin/login'}
              />
              <AuthenticatedRoute 
                exact 
                path="/admin/songs" 
                component={SongList} 
                appProps={{ authenticated }}
                redirect={'/admin/login'}
              />
              <AuthenticatedRoute 
                path="/admin/songs/new" 
                component={SongEditor} 
                appProps={{ authenticated }}
                redirect={'/admin/login'}
              />
              <AuthenticatedRoute 
                path="/admin/songs/:id/edit" 
                component={SongEditor} 
                appProps={{ authenticated }}
                redirect={'/admin/login'}
              />
              <UnauthenticatedRoute 
                path="/admin/login" 
                component={AdminLogin} 
                appProps={{ authenticated }}
                redirect={'/admin/artists'}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout)