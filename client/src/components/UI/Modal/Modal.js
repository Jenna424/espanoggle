import React from 'react';
import styles from './Modal.module.css';

const Modal = props => (
  <div className={styles.modal}>
    {props.children}
  </div>
)

export default Modal;

{/*
// Modal functional component just receives props and returns JSX,
// namely, a <div> to wrap around dynamic content, i.e., props.children
// to provide styling
*/}