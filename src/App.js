import React from 'react'
import { Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'

const App = () => 
  <div className="App">
    <Switch>
      <Route exact path="/" component={DefaultLayout} />
      <Route path="/admin" component={AdminLayout} />
    </Switch>
  </div>

export default App;
