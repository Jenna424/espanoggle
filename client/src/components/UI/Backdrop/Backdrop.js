import React from 'react';
import styles from './Backdrop.module.css';

const Backdrop = props => (
  props.viewable ? <div className={styles.backdrop} onClick={props.hide}></div> : null
);

export default Backdrop;

{/*
// If props.viewable is true, i.e. I want to display the modal and the backdrop, 
// return a <div> to hold the backdrop's styling found in Backdrop.module.css
// Otherwise, I return null (i.e. nothing gets rendered)
// I'll render this Backdrop component in my Modal.js file because the two are closely linked.
// If the Modal is displayed, I want the Backdrop to be displayed;
// if the Modal is hidden, I want the Backdrop to be hidden
*/}