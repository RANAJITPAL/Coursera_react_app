import React from 'react';
import logo from './logo.svg';
import {Navbar, NavbarBrand} from 'reactstrap';
import './App.css';
import Menu from "./components/MenuComponents"

function App() {
  return (
    <div className="App">
      <Navbar dark color='primary'>
        <div className = 'container'>
          <NavbarBrand href="/">
            Resturent
          </NavbarBrand>
          <Menu/>
        </div>
      </Navbar>
    </div>
  );
}

export default App;
