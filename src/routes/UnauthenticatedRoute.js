import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({ component: C, appProps, redirect, ...rest }) => 
  <Route
    {...rest}
    render={props =>
      !appProps.authenticated
        ? <C {...props} {...appProps} />
        : <Redirect to={redirect} />}
  />