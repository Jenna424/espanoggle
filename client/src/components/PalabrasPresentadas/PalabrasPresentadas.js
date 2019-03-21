import React, { Fragment } from 'react';
import styles from './PalabrasPresentadas.module.css';

const PalabrasPresentadas = ({ palabrasFormadas, palabraCreada }) => {
  const puntosPorCadaPalabra = Object.keys(palabrasFormadas).map(palabra =>
  	<li className={styles.palabra} key={palabra}><strong>{palabra}</strong>: {palabrasFormadas[palabra]}</li>
  )

  return (
    <div>
      {Object.keys(palabrasFormadas).length > 0 &&
        <Fragment>
          <h3>El Recuento de Puntos</h3>
          <p><em>A continuación, podés encontrar una lista de palabras y sus respectivos valores númericos:</em></p>
          <ul className={styles.scrollable}>
            {puntosPorCadaPalabra}
          </ul>
        </Fragment>
      }

      <br />

      {palabraCreada === '' && Object.keys(palabrasFormadas).length === 0 &&
        <span><em>Haz clic en los cubos para deletrear una palabra válida en español.</em></span>
      }
    </div>
  )
}

export default PalabrasPresentadas;