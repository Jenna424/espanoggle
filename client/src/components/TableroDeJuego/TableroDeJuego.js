import React, { Component, Fragment } from 'react';
import Cubo from '../Cubo/Cubo';
import PalabraFormada from '../components/PalabraFormada/PalabraFormada';
import PalabrasPresentadas from '../components/PalabrasPresentadas/PalabrasPresentadas';

// TableroDeJuego is a React container class component. Therefore, I can define a local state.
class TableroDeJuego extends Component {
  state = { // setting initial state
    dragging: false, // When the first cube is clicked (onMouseDown event), this local state will be updated using setState() to set dragging key = true
    chosenCubes: [], // chosenCubes eventually stores an array of cube objects, where each cube object element has k/v pairs for r (row coordinate), c (column coordinate) and landedLetter (letter that landed face up on cube)
    palabraCreada: "", // palabraCreada eventually stores the string word being formed (accumulation of landed letters)
    palabrasFormadas: {} // palabrasFormadas ultimately stores an object in which each key is a string word formed and its corresponding value is the number of points awarded for that word
  }

  isValidLength = word => word.length >= 3 ? true : false

  isUnique = word => Object.keys(this.state.palabrasFormadas).length === 0 || 
  (Object.keys(this.state.palabrasFormadas).length > 0 && !Object.keys(this.state.palabrasFormadas).includes(word))

  cubeCopies = (cube1, cube2) => (cube1.r === cube2.r && cube1.c === cube2.c) ? true : false

  copiesOrContiguousCubes = (cubeA, cubeB) => {
    if (this.cubeCopies(cubeA, cubeB)) { // If I'm clicking the last cube clicked to deselect it 
      return true
    } else if (this.state.chosenCubes.includes(cubeB)) {
      return false
    } else {
      const rowsApart = Math.abs(cubeA.r - cubeB.r);
      const columnsApart = Math.abs(cubeA.c - cubeB.c);
      return (rowsApart <= 1 && columnsApart <= 1)
    }
  }

  isSelectable = cubeObject => {
    if (this.props.status !== 'comenzado') { // If I did NOT start the game (by clicking botón de inicio), I should NOT be able to click letter cubes!
      return false;
    }

    if (!this.state.chosenCubes.length) { // If no cube was chosen yet (i.e. if no word is currently being created), every letter cube is selectable
      return true;
    }

    const lastCubeChosen = this.state.chosenCubes[this.state.chosenCubes.length - 1];

    return this.copiesOrContiguousCubes(lastCubeChosen, cubeObject)
  }

  handleButtonDepressed = cube => {
    if (this.props.status !== 'comenzado') {
      return;
    }

    this.setState({
      dragging: true,
      chosenCubes: [cube],
      palabraCreada: cube.landedLetter
    })
  }

  enviarPalabra = () => {
    const word = this.state.palabraCreada;
    if (this.isValidLength(word) && this.isUnique(word)) {
      this.setState(prevState => ({
        ...prevState,
        palabrasFormadas: {...prevState.palabrasFormadas, [word]: [word.length - 2]},
        palabraCreada: '',
        chosenCubes: []
      }))
    } else {
      this.setState(prevState => ({
        ...prevState, 
        palabraCreada: '', 
        chosenCubes: []
      }))
    }
  }


  handleDragOverCube = cube => {
    if (this.isSelectable(cube)) {
      this.setState(prevState => {
        const { chosenCubes, palabraCreada } = prevState;
        let modifiedCubes, palabraModificada;
        if (chosenCubes[chosenCubes.length - 1] === cube) { // If the user clicked the cube that was just added to the word 
          modifiedCubes = chosenCubes.slice(0, -1) // I'm still maintaining immutability because .slice() is NOT destructive
          palabraModificada = palabraCreada.slice(0, -1)
        } else {
          modifiedCubes = [...chosenCubes, cube]
          palabraModificada = palabraCreada.concat(cube.landedLetter) // this is okay because .concat() is nondestructive
        }
        return {
          chosenCubes: modifiedCubes,
          palabraCreada: palabraModificada
        }
      })
    }
  }

  render() {
    const { palabraCreada, palabrasFormadas } = this.state;
    return (
      <Fragment>
        <div className={styles.tableroDeJuego}>
          {this.props.board.map((row, rowIndex) =>
            <div key={rowIndex} style={{display: 'flex'}}>
              {row.map(cubeObject => (
                <Cubo
                  key={cubeObject.c}
                  cube={cubeObject}
                  handleButtonDepressed={cubeObject => this.handleButtonDepressed(cubeObject)}
                  handleDragOverCube={cubeObject => this.handleDragOverCube(cubeObject)}
                  enviarPalabra={this.enviarPalabra}
                  chosenCubes={this.state.chosenCubes}
                  status={this.props.status}
                />
              ))}
           </div>
          )}
        </div>
        <PalabraFormada palabraCreada={palabraCreada} />
        <PalabrasPresentadas palabrasFormadas={palabrasFormadas} palabraCreada={palabraCreada} />
      </Fragment>
    )
  }
}

export default TableroDeJuego;