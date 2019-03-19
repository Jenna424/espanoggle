import React from 'react';
import styles from './Button.module.css';

const Button = props => (
  <button onClick={props.buttonClick} className={[styles.boggleButton, styles[props.buttonType]].join(' ')}>
    {props.children}
  </button>
);

export default Button;

{/*
// I created this separate Button functional component so that I can wrap multiple buttons
// used throughout my application with some shared standard styling
// This allows me to keep my code DRY
// However, I do need SOME variation in styling for different types of buttons, 
// e.g. start button, cancel button, play again button, etc.

// Self-reminder: I must pass a string to the className property of the <button>
// I added an array because I always want to assign the standard class of 'boggleButton',
// but then I want to conditionally add specific classes, such as 'success', 'warning' or 'error'
// I dynamically extract the class I want using the buttonType prop.
// Then I convert the array of string elements into a single string by joining them with a space
*/}