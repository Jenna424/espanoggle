import React from 'react';
import Button from '../UI/Button/Button';

const PalabraPresentada = ({ palabraCreada, enviarPalabra }) => {
  return (
  	<div style={{textAlign: 'center', paddingTop: '10px'}}>
  	  {palabraCreada.length > 0 && <p style={{color: 'navy'}}><strong>Palabra Creada</strong>:&nbsp;{palabraCreada}</p>}
  	  {palabraCreada.length > 2 && <Button buttonClick={enviarPalabra} buttonType="enviar">ENVIAR</Button>}
  	</div>
  )
}

export default PalabraPresentada;