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
      <Route path="/reglas" component={Reglas} />
      <Route path="/jugar" component={Juego} />
      //<Route path="/jugar" component={BoggleGame} />
    </Fragment>
  )
}

export default App;