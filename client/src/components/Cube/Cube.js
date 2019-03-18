import React, { PureComponent } from 'react'; // PureComponent executes shouldComponentUpdate lifecycle method behind the scenes
import styles from './Cube.module.css';
// I'm using PureComponent here to avoid unnecessary re-renders of every cube in the boggle board when one is clicked. Only the cube that was clicked (and maybe some adjacent cubes) should re-render.
class Cube extends PureComponent {
  handleOnClick = () => {
    //if (this.props.isClickable) {
      this.props.handleCubeClicked(this.props.cube)
    //}
  }

  render() {
    return (
      <button className={`big ui button ${styles.cube}`} onClick={this.handleOnClick} disabled={!this.props.isClickable}>
        {this.props.character}
      </button>
    )
  }
}

export default Cube;
