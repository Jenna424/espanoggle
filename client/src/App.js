import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import Reglas from './components/Reglas/Reglas';
import BoggleGame from './containers/BoggleGame';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Route exact path="/" component={BoggleGame} />
      <Route path="/reglas" component={Reglas} />
    </Fragment>
  )
}

export default App;

{/*
// For the drag-to-select version, replace BoggleGame import statement and route with:
// import Juego from './containers/Juego';
// <Route exact path="/" component={Juego} />
*/}