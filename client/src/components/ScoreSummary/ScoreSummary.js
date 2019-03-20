import React, { Fragment } from 'react';
import styles from './ScoreSummary.module.css';
import Button from '../components/UI/Button/Button';

const ScoreSummary = ({ palabrasFormadas }) => {
  const palabrasGanadas = Object.keys(palabrasFormadas).map(palabra =>
    <li className={styles.word} key={palabra}><strong>{palabra}</strong>: {palabrasFormadas[palabra]}</li>
  )

  return (
  	<Fragment>
      <p style={{color: 'red'}}><strong>¡Se acabó el juego!</strong></p>

  	  <h3>El Recuento de Puntos</h3>

  	  <p><em>A continuación, podés encontrar una lista de palabras y sus respectivos valores númericos:</em></p>

      <ul className={styles.scrollable}>
        {palabrasGanadas}
      </ul>

      <strong>Puntuación Total</strong>:

      <p>Vos has conseguido una suma de {Object.values(palabrasFormadas).reduce((acc, number) => acc + number, 0)} puntos.</p>

  	  <p>¿Querés jugar al Españoggle otra vez?</p>
  	</Fragment>
  )
}

export default ScoreSummary;