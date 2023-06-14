import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ToDo from './Component/ToDo';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Nav from './Navigation/Nav';
import About from './Component/About';
import AddToDo from './Component/AddToDo';
function App() {
  return (
    <Router> {/*Using Routes instead of Switch in react-router v6*/}
      <div className="App">

        <Nav />
        <Switch>
          <Route path="/" exact>
            <ToDo />
          </Route>
          <Route path="/AddToDo" exact>
            <AddToDo />
          </Route>
          <Route path="/About" exact>
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
