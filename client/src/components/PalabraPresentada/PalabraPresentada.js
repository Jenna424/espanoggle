import React from 'react';

const PalabraPresentada = ({ palabraCreada }) => {
  return (
  	<div style={{textAlign: 'center', paddingTop: '10px'}}>
  	  {palabraCreada.length > 0 && <p style={{color: 'navy'}}><strong>Palabra Creada</strong>: {palabraCreada}</p>}
  	</div>
  )
}

export default PalabraPresentada;