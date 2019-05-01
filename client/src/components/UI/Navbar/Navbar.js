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
    <NavLink to="/reglas" className="item" activeStyle={highlight}>Reglas del Juego</NavLink>
    <NavLink to="/jugar" className="item" activeStyle={highlight}>Españogglear</NavLink>
  </div>
)

export default Navbar;