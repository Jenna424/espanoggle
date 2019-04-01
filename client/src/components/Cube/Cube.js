import React, { PureComponent } from 'react';
import styles from './Cube.module.css';
import PropTypes from 'prop-types';
// Here, I'm extending PureComponent to avoid unnecessary re-renders of all cubes when a single cube is clicked. Only the cube that was clicked (and contiguous cubes) should be affected.
export default class Cube extends PureComponent {
  handleOnClick = () => {
    if (this.props.isClickable(this.props.cube)) {
      this.props.handleCubeClicked(this.props.cube)
    }
  }

  render() {
    const { chosenCubes, cube } = this.props;
    const cubeClasses = ['tiny ui button', styles.cube];
    
    if (chosenCubes.includes(cube)) {
      cubeClasses.push('tiny ui yellow button')
    }

    return (
      <div>
        <button 
          className={cubeClasses.join(' ')}
          onClick={this.handleOnClick}>{cube.landedLetter}
        </button>
      </div>
    )
  }
}

Cube.propTypes = {
  cube: PropTypes.object.isRequired,
  isClickable: PropTypes.func.isRequired,
  handleCubeClicked: PropTypes.func.isRequired
}