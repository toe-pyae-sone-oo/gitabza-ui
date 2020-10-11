import React from 'react'
import { Navbar, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const AdminNav = ({ toggle }) =>
  <Navbar bg="dark" variant="dark" fixed="top">
    <Button 
      size="sm" 
      className="mr-1"
      onClick={toggle}
      variant="dark"
    >
      <FontAwesomeIcon icon={faBars} />
    </Button>
    <Navbar.Brand href="#home">
      Gita B Za Admin
    </Navbar.Brand>
  </Navbar>

export default AdminNav