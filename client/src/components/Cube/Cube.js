import React, { PureComponent } from 'react';
import styles from './Cube.module.css';
import PropTypes from 'prop-types';
// Here, I'm extending PureComponent to avoid unnecessary re-renders of all cubes when a single cube is clicked. Only the cube that was clicked (and contiguous cubes) should be affected.
class Cube extends PureComponent {
  handleOnClick = () => {
    if (this.props.isClickable(this.props.cube)) {
      this.props.handleCubeClicked(this.props.cube)
    }
  }

  render() {
    return (
      <div>
        <button 
          className={`tiny ui button ${styles.cube}`} 
          onClick={this.handleOnClick}>{this.props.cube.landedLetter}
        </button>
      </div>
    )
  }
}

export default Cube;

