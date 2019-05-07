import React from 'react';
import styles from './Reglas.module.css';

const Reglas = () => (
  <div className={styles.reglas}>
    <h3>Criterios para Seleccionar Letras Válidas que Constituyen Una Palabra</h3>
    <p><em>~ Los cubos estampados con las letras tienen que ser únicos y adyacentes ~</em></p>
    <br />
    <h3>Instrucciones para Seleccionar Cubos con el Ratón</h3>
    <p><em>~ Haz clic en el primer cubo sin soltarlo ~</em></p>
    <p><em>~ Mantenga pulsada la tecla 'Shift' durante el proceso de selección y deselección ~</em></p>
    <p><em>~ Arrastra el ratón por encima de los cubos contiguos para seleccionar las letras subsiguientes ~</em></p>
    <p><em>~ Al soltar el botón del ratón, la palabra será enviada a la lista de palabras jugadas, a menos que sea una palabra inválida ~</em></p>
  </div>
)

export default Reglas;