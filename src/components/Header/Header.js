import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => 
  <div>
    <NavLink to="/">Home</NavLink>
    |
    <NavLink to="/about">About</NavLink>
  </div>

export default Header