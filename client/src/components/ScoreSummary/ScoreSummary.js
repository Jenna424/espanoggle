import React, { Fragment } from 'react';
import Button from '../../components/UI/Button/Button';
import PalabrasPresentadas from '../../components/PalabrasPresentadas/PalabrasPresentadas';

const ScoreSummary = ({ palabrasFormadas, onPlayAgain, onDeclinePlayAgain }) => {
  return (
    <Fragment>
      <p style={{color: 'red'}}><strong>¡Se acabó el juego!</strong></p>

      <PalabrasPresentadas palabrasFormadas={palabrasFormadas} />

      <br />

      <strong>Puntuación Total</strong>:

      <p>
        Vos has conseguido una suma de {Object.values(palabrasFormadas).map(stringNum => parseInt(stringNum)).reduce((acc, number) => acc + number, 0)} punto(s).
      </p>

      {Object.keys(palabrasFormadas).length > 0 && 
      <p>La mejor jugada: {Object.keys(palabrasFormadas).reduce((palabra1, palabra2) => 
        palabrasFormadas[palabra1] > palabrasFormadas[palabra2] ? palabra1 : palabra2)}
      </p>}

      <p>¿Querés jugar al Españoggle otra vez?</p>

      <Button handleButtonClick={onPlayAgain} buttonType="aprobar">&nbsp;&nbsp;SÍ&nbsp;&nbsp;</Button>&nbsp;
      <Button handleButtonClick={onDeclinePlayAgain} buttonType="rechazar">NO</Button>
    </Fragment>
  )
}

export default ScoreSummary;

// Note to self: 
// perhaps I should extract functions for calculating the sum of points earned 
// and the word worth the most points in my BoggleGame container class component
// since ScoreSummary is a presentational stateless functional component and I want to limit the amount of logic I have in here
// stateless functional components should just receive props and render JSX
// I included it here because it's very easy to compute - a word is worth 2 points less than the number of characters it contains
// Another thing to consider:
// Should the score be stored in the local state of my BoggleGame class component since it changes throughout the course of my application