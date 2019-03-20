import React, { Fragment } from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => (
  <Fragment>
    <Backdrop viewable={props.viewable} hide={props.closed}/> // If the Modal is displayed, the Backdrop is also displayed
    <div
      className={styles.modal}
      style={{transform: props.viewable ? 'translateY(0)' : 'translateY(-100vh)', 
      opacity: props.viewable ? '1' : '0'}}>
      {props.children}
    </div>
  </Fragment>
)

export default Modal;

{/*
// Modal functional component just receives props and returns JSX,
// namely, a <div> to wrap around dynamic content, i.e., props.children
// to provide styling

// vh is a unit that refers to viewport height
// consequently, the modal will slide off the screen
// opacity '0' means it's not visible
*/}