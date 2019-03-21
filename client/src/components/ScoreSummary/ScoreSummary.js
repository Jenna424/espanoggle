import React, { Fragment } from 'react';
import styles from './ScoreSummary.module.css';
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
        Vos has conseguido una suma de {Object.values(palabrasFormadas).map(stringNum => parseInt(stringNum)).reduce((acc, number) => acc + number, 0)} puntos.
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