import React, { Fragment } from 'react';
import styles from './PalabrasPresentadas.module.css';

const PalabrasPresentadas = ({ palabrasFormadas }) => {
  const puntosPorCadaPalabra = Object.keys(palabrasFormadas).map(palabra =>
  	<li className={styles.palabra} key={palabra}><strong>{palabra}</strong>: {palabrasFormadas[palabra]}</li>
  )

  return (
    <div>
      <h3>El Recuento de Puntos</h3>
      <p><em>A continuación, podés encontrar una lista de palabras y sus respectivos valores númericos:</em></p>
      <ul className={styles.scrollable}>
        {puntosPorCadaPalabra}
      </ul>
    </div>
  )
}

export default PalabrasPresentadas;