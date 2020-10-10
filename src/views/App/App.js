import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import Home from '../../views/Home/Home'
import About from '../../views/About/About'
import Header from '../../components/Header/Header'

const App = () => 
  <div className="App">
    <Header/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </Switch>
  </div>

export default App;
