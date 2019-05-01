import React from 'react';
import { NavLink } from 'react-router-dom';

const highlight = {
  fontWeight: 'bold',
  color: 'skyblue',
  backgroundColor: 'lightyellow'
};

const Navbar = () => (
  <div className="ui top menu">
    <div className="item" style={{ backgroundColor: 'lightyellow' }}>
      <i className="argentina flag"></i>
    </div>
    <NavLink exact to="/reglas" className="item" activeStyle={highlight}>Reglas del Juego</NavLink>
    <NavLink exact to="/" className="item" activeStyle={highlight}>Jugar al Españoggle</NavLink>
  </div>
)

export default Navbar;