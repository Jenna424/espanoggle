import React, { PureComponent } from 'react';
import styles from './Cube.module.css';

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
          onClick={this.handleOnClick}>{this.props.character}
        </button>
      </div>
    )
  }
}

export default Cube;