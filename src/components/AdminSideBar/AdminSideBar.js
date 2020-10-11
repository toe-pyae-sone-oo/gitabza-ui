import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import Nav from 'react-bootstrap/Nav'
import './AdminSideBar.css'

const AdminSideBar = ({ isOpen }) => 
  <Nav 
    defaultActiveKey="/admin" 
    className={classNames('flex-column', 'bg-dark', 'Sidebar', { 'Sidebar--is-open': isOpen })}
    variant="pills"
  >
    <Nav.Item>
      <Nav.Link 
        as={NavLink} 
        exact 
        to="/admin" 
        className="text-light"
      >Dashboard</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link 
        as={NavLink} 
        to="/admin/artists"
        className="text-light"
      >Artists</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link 
        as={NavLink} 
        to="/admin/songs"
        className="text-light"
      >Songs</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link 
        as={NavLink} 
        to="/admin/account"
        className="text-light"
      >Account</Nav.Link>
    </Nav.Item>
  </Nav>

export default AdminSideBar