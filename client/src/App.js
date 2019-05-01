import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import Reglas from './components/Reglas/Reglas';
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
// For implementation without drag-to-select, add:
// import BoggleGame from './containers/BoggleGame';
// <Route path="/" component={BoggleGame} />
*/}