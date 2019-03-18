import React, { PureComponent } from 'react';
import styles from './Cube.module.css';

{/*
// PureComponent executes shouldComponentUpdate lifecycle method behind the scenes
// I'm using PureComponent here to avoid unnecessary re-renders of every cube in the boggle board when one is clicked. 
// Only the cube that was clicked (and maybe some adjacent cubes) should re-render.
*/}

class Cube extends PureComponent {
  handleOnClick = () => {
    if (this.props.isClickable(this.props.cube)) {
      this.props.handleCubeClicked(this.props.cube)
    }
  }

  render() {
    return (
      <button 
        className={`big ui button ${styles.cube}`} 
        onClick={this.handleOnClick}>{this.props.character}
      </button>
    )
  }
}

export default Cube;