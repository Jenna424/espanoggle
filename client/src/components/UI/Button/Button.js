import React from 'react';
import styles from './Button.module.css';

const Button = props => (
  <button onClick={props.handleButtonClick} className={[styles.boggleButton, styles[props.buttonType]].join(' ')}>
    {props.children}
  </button>
);

export default Button;

{/*
// Above, I created a separate Button functional component so that I can wrap multiple buttons
// used throughout my application with some shared styling
// This allows me to keep my code DRY
// However, I do need some variation in styling for different types of buttons, 
// e.g., botón de inicio, botón para jugar de nuevo, etc.

// I must pass a string to the className property of the <button>
// I added an array because I always want to assign the standard class of 'boggleButton',
// but I also want to conditionally add specific classes, such as 'aprobar', 'rechazar', 'iniciar', 'enviar'
// I dynamically extract the class I want by using the buttonType prop.
// I then convert the array of string elements into a single string by joining them with a space
*/}