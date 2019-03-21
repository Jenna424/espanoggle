import React, { Component } from 'react';
import diccionario from '../apis/diccionario'; // importing the axios instance that I created, which I'll refer to as diccionario
import Board from '../components/Board/Board';
import PalabraPresentada from '../components/PalabraPresentada/PalabraPresentada';
import Button from '../components/UI/Button/Button';
import Modal from '../components/UI/Modal/Modal';
import ScoreSummary from '../components/ScoreSummary/ScoreSummary';
import PalabrasPresentadas from '../components/PalabrasPresentadas/PalabrasPresentadas';
// sixteenDice stores an array of 16 strings to represent 16 dice. Each string has 6 characters b/c a single cubic die has 6 sides
const sixteenDice = [
  'QBZJXL',
  'TOUOTO',
  'OVCRGR',
  'AAAFSR',
  'AUMEEO',
  'EHLRDO',
  'NHDTHO',
  'ADAISR',
  'UIFASR',
  'TELPCI',
  'AEAEEH',
  'SSNSEU',
  'CCÑNST',
  'TTOTEM',
  'ITATIE',
  'UOTOÑN'
];

// I'm using Fisher Yates algorithm to destructively shuffle the sixteenDice array of 16 strings
const shakeTray = diceArray => {
  for (let i = 0; i < 16; i++) {
    let arbitraryIndex = Math.floor(Math.random() * 16);
    let temporaryValue = diceArray[i];
    diceArray[i] = diceArray[arbitraryIndex];
    diceArray[arbitraryIndex] = temporaryValue;
  }
  return diceArray;
}

const buildBoard = () => {
  const board = [];
  // shakenDice stores an array of shuffled string dice
  const shakenDice = shakeTray(sixteenDice)
  // landedLetters stores an array of 16 string letter elements, 
  // in which each letter element is a randomly picked character from each string dice element in shakenDice array
  // I'm trying to model the resulting collection of letters that landed face up when each die is rolled
  const landedLetters = shakenDice.map(diceString => diceString[Math.floor(Math.random() * 6)])
  for (let r = 0; r < 4; r++) {
    const row = []; // create a row
    for (let c = 0; c < 4; c++) { // this inner loop populates a single row
      const landedLetter = landedLetters.pop();
      const cube = { r, c, landedLetter }; // object destructuring - accessing key/value pairs by just referencing the key names
      row.push(cube);
    }
    board.push(row)
  }
  return board;
}
// Declaring this initialState object makes it super easy for me to reset the game when the player clicks the play again button or the button to decline another round
const initialState = {
  board: buildBoard(),
  lastCubeClicked: null,
  chosenCubes: [], // an array of JS cube objects. Each cube object element in this array represents a letter cube on the board that the user has clicked on and thus activated, so that she can incorporate that letter in the word she is currently building
  palabraCreada: '', // the string Spanish word that the user is creating by clicking cubes on the boggle board
  palabrasFormadas: {},
  countdown: 10, // A single round of boggle lasts 3 minutes (180 seconds)
  error: false
}

class BoggleGame extends Component {
  state = {
    ...initialState,
    status: 'inicio',
    dictionary: [],
  };

  componentDidMount() { // diccionario is my imported axios instance (see src/apis/diccionario.js file)
    diccionario.get('/palabras') // json-api follows RESTful resource route architecture - I'm retrieving the 'index' of dictionary words
      .then(response => {
        const palabras = response.data // variable palabras stores array of string Spanish words that corresponds to the "palabras" key in JSON object found in api/db.json
        this.setState({
          dictionary: [...palabras] // spread operator copies over all string word elements stored in palabras array
        }) // store the data retrieved from API in local state of BoggleGame container class component
      })
      .catch(error => { // handle error if dictionary entries fail to load
        this.setState({
          error: true 
        })
      })
  }

  clearTimer = () => {
    clearInterval(this.intervalId)
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  isValidLength = word => word.length >= 3 ? true : false

  isUnique = word => Object.keys(this.state.palabrasFormadas).length === 0 || 
  (Object.keys(this.state.palabrasFormadas).length > 0 && !Object.keys(this.state.palabrasFormadas).includes(word))

  cubeCopies = (cube1, cube2) => (cube1.r === cube2.r && cube1.c === cube2.c) ? true : false

  contiguousCubes = (cubeA, cubeB) => {
    if (this.cubeCopies(cubeA, cubeB)) {
      return true
    } else {
      const rowsApart = Math.abs(cubeA.r - cubeB.r);
      const columnsApart = Math.abs(cubeA.c - cubeB.c);
      return (rowsApart <= 1 && columnsApart <= 1)
    }
  }

  //isDefined = word => this.state.dictionary.includes(word.toLowerCase())
  // Below, cubeClicked argument passed to handleCubeClick callback arrow function = a JS cube object that looks like this: 
  // { r: row number, c: column number, landedLetter: string letter that landed face-up }
  handleCubeClicked = cubeClicked => {
    this.setState(
      prevState => {
        if (prevState.status !== 'comenzado') {
          return null;
        }
        const { chosenCubes, palabraCreada } = prevState;
        let modifiedCubes, palabraModificada;
        if (chosenCubes[chosenCubes.length - 1] === cubeClicked) {
          modifiedCubes = chosenCubes.slice(0, -1)
          palabraModificada = palabraCreada.slice(0, -1)
        } else {
          modifiedCubes = [...chosenCubes, cubeClicked]
          palabraModificada = palabraCreada.concat(cubeClicked.landedLetter)
        }
        return {
          chosenCubes: modifiedCubes,
          palabraCreada: palabraModificada,
          lastCubeClicked: modifiedCubes[modifiedCubes.length - 1]
        }
      }
    )
  }
  // My criteria for a clickable cube:
  // A new game is in progress
  // No word is currently being built
  // The previous letter cube that was added to the word (i.e. the last element in chosenCubes array) is
  // adjacent (horizontally, vertically or diagonally) to the letter cube that I want to click to append to that word 
  // The cube that I want to click to REMOVE from the word is the cube that I JUST added to the word 
  isClickable = cube => {
    const { status, chosenCubes, lastCubeClicked, palabraCreada } = this.state;

    if (status !== 'comenzado') { // If I did NOT start the game (by clicking the COMIENZA button), I should NOT be able to click letter cubes!
      return false
    }
    
    if (!chosenCubes.length)  { // If no word is currently being built, every letter cube is clickable
      return true
    }

    return this.contiguousCubes(lastCubeClicked, cube)
  }

  iniciarJuego = () => {
    this.setState({ status: 'comenzado', ...initialState}, () => {
      this.intervalId = setInterval(() => {
        this.setState((prevState, props) => {
          const decrementedCountdown = prevState.countdown - 1;
          if (!decrementedCountdown) { // 0 is falsy in JS
            clearInterval(this.intervalId) // so the countdown number doesn't become negative
            return { status: 'terminado', countdown: 0 }
          }
          return { countdown: decrementedCountdown }
        })
      }, 1000)
    })
  }

  onPlayAgain = () => {
    alert('Querés jugar de nuevo. ¡Qué bárbaro!\n...Preparado, listo, ¡ya!')
    this.iniciarJuego()
  }
  
  onDeclinePlayAgain = () => {
    this.setState({ status: 'inicio', ...initialState })
    alert('Gracias por jugar al Españoggle. ¡Chau!')
  }

  handleWordSubmission = () => {
    const word = this.state.palabraCreada;
    if (this.isValidLength(word) && this.isUnique(word)) {
      this.setState(prevState => ({
        palabrasFormadas: {...prevState.palabrasFormadas, [word]: [word.length - 2]},
        palabraCreada: '',
        chosenCubes: []
      }))
    }
  }

  render() {
    const { palabrasFormadas, status, countdown, palabraCreada } = this.state;
    return (
      <div style={{textAlign: 'center'}} className="ui-container">
        <Modal viewable={status === 'terminado'} closed={this.onDeclinePlayAgain}>
          <ScoreSummary palabrasFormadas={palabrasFormadas} onPlayAgain={this.onPlayAgain} onDeclinePlayAgain={this.onDeclinePlayAgain} />
        </Modal>
        <h2 style={{color: 'red'}}><em>¡Españoggle!</em></h2>
        <i class="argentina flag"></i>&nbsp;<span><em>Una versión del juego Boggle al estilo español</em></span>&nbsp;<i class="argentina flag"></i>
        <br />
        {status !== 'comenzado' && <Button handleButtonClick={this.iniciarJuego} buttonType="iniciar">INICIO</Button>}
        {status === 'comenzado' && 
        <button style={{marginBottom: '5px', marginTop: '5px'}} className="ui icon button">
          <i className="hourglass half icon"></i>
          {countdown}
        </button>}
        <Board board={this.state.board} handleCubeClicked={this.handleCubeClicked} isClickable={this.isClickable} />
        <PalabraFormada palabraCreada={palabraCreada} enviarPalabra={this.handleWordSubmission} />
        <PalabrasPresentadas palabrasFormadas={palabrasFormadas} />
      </div>
    )
  }
}

export default BoggleGame;