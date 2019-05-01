import React, { Component } from 'react';
import styles from './Cubo.module.css';

class Cubo extends Component {
  handleOnMouseDown = event => {
    this.props.handleButtonDepressed(this.props.cube)
  }

  handleOnMouseOver = event => {
    if (event.shiftKey || event.ctrlKey) {
      this.props.handleDragOverCube(this.props.cube)
    }
  }

  handleOnMouseUp = () => {
    if (this.props.status === 'comenzado') {
      this.props.enviarPalabra()
    }
  }

  render() {
    const { chosenCubes, cube } = this.props;
    const cubeClasses = ['tiny ui button', styles.cubo];

    if (chosenCubes.includes(cube)) {
      cubeClasses.push('tiny ui yellow button')
    }

    return (
      <div>
        <button
          className={cubeClasses.join(' ')}
          onMouseDown={this.handleOnMouseDown}
          onMouseOver={this.handleOnMouseOver}
          onMouseUp={this.handleOnMouseUp}>
          {cube.landedLetter}
        </button>
      </div>
    )
  }
}

export default Cubo;