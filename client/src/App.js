import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import Reglas from './components/Reglas/Reglas';
//import BoggleGame from './containers/BoggleGame';
import Juego from './containers/Juego';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Juego} />
      <Route path="/reglas" component={Reglas} />
    </Fragment>
  )
}

export default App;

{/*
// To revert back to click selection, replace Juego import statement and route with:
// import BoggleGame from './containers/BoggleGame';
// <Route exact path="/" component={BoggleGame} />

// For the drag-to-select version, replace BoggleGame import statement and route with:
// import Juego from './containers/Juego';
// <Route exact path="/" component={Juego} />
*/}