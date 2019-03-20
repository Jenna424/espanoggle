import React, { Fragment } from 'react';
import styles from './ScoreSummary.module.css';

const ScoreSummary = ({ wordsOnBoard }) => {
  const palabrasGanadas = Object.keys(wordsOnBoard).map(wordEntry =>
    <li className={styles.word} key={wordEntry}><strong>{wordEntry}</strong>: {wordsOnBoard[wordEntry]}</li>
  )

  return (
  	<Fragment>
  	  <h3>El Recuento de Puntos</h3>

  	  <p><em>A continuación, podés encontrar una lista de palabras y sus respectivos valores númericos:</em></p>
     
  	  <ul className={styles.scrollable}>
        {palabrasGanadas}
      </ul>

      <strong>Puntuación Total</strong>:

      <p>Vos has conseguido una suma de {Object.values(wordsOnBoard).reduce((acc, number) => acc + number, 0)} puntos.</p>

  	  <p>¿Querés jugar al Españoggle otra vez?</p>
  	</Fragment>
  )
}

export default ScoreSummary;
