import React, { Component } from 'react';
import diccionario from '../apis/diccionario'; // importing the axios instance that I created, which I'll refer to as diccionario
import Board from '../components/Board/Board';
import PalabraFormada from '../components/PalabraFormada/PalabraFormada';
import PalabrasPresentadas from '../components/PalabrasPresentadas/PalabrasPresentadas';
import Button from '../components/UI/Button/Button';
import Modal from '../components/UI/Modal/Modal';
import ScoreSummary from '../components/ScoreSummary/ScoreSummary';
// sixteenDice stores an array of 16 strings that represent 16 dice. Each string has 6 characters because a single cubic die has 6 sides.
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

// I'm using Fisher Yates algorithm to shuffle the sixteenDice array of 16 strings
const shakeDice = diceArray => {
  // First I'll use .slice() to copy the original diceArray to maintain its immutability. I'll modify the copied version.
  let copiedDice = diceArray.slice()
  // Time to shuffle!
  for (let i = 0; i < 16; i++) {
    // select a random index between i and the index position of the last element, inclusively
    let arbitraryIndex = Math.floor(Math.random() * 16);
    // swap the elements at those indices
    let temporaryValue = copiedDice[i];
    copiedDice[i] = copiedDice[arbitraryIndex];
    copiedDice[arbitraryIndex] = temporaryValue;
  }
  return copiedDice;
}

const buildBoard = () => {
  const board = [];
  // shakenDice stores an array of shuffled string dice
  const shakenDice = shakeDice(sixteenDice)
  // landedLetters stores an array of 16 string letter elements, 
  // in which each letter element is a randomly picked character from each string die element in shakenDice array
  // I'm trying to model the resulting collection of letters that landed face up upon jostling the tray of dice
  const landedLetters = shakenDice.map(diceString => diceString[Math.floor(Math.random() * 6)])
  for (let r = 0; r < 4; r++) { // Boggle board is 4 row x 4 column grid
    const row = []; // create a row
    for (let c = 0; c < 4; c++) { // this inner loop populates a single row
      const landedLetter = landedLetters.pop(); // .pop() removes & returns the last string letter in the array
      const cube = { r, c, landedLetter }; // object destructuring - accessing key/value pairs by just referencing the key names
      row.push(cube);
    }
    board.push(row)
  }
  return board;
}
// Declaring this initialState object will make it easier for me to reset the game when the player clicks the button to play again or the button to decline another round
const initialState = {
  lastCubeClicked: null,
  chosenCubes: [], // an array of JS cube objects. Each cube object element in this array represents a letter cube on the board that the user selected during word formation
  palabraCreada: '', // the string Spanish word that the user is creating by clicking cubes on the boggle board
  palabrasFormadas: {}, // Each key in this object is a valid string Spanish word, and its corresponding value is the number of points awarded for that particular word (i.e. number of characters in the word - 2).
  countdown: 60, // For testing purposes, I'll set this to 60 seconds. In reality, a single round of boggle lasts 3 minutes, so I'll have to change this to 180
  error: false
}

class BoggleGame extends Component {
  state = {
    board: buildBoard(),
    ...initialState, // using spread operator to copy over all key/value pairs from initialState object into the local state object of BoggleGame container class component
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
          error: true // I'll implement this once I replace my json-server dummy data with actual entries from a Spanish dictionary...pending API key!
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
  // Will implement once I retrieve API key
  isDefined = word => this.state.dictionary.includes(word.toLowerCase())
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
        if (chosenCubes[chosenCubes.length - 1] === cubeClicked) { // If the user clicked the cube that was just added to the word 
          modifiedCubes = chosenCubes.slice(0, -1) // I'm still maintaining immutability because .slice() is NOT destructive
          palabraModificada = palabraCreada.slice(0, -1)
        } else {
          modifiedCubes = [...chosenCubes, cubeClicked]
          palabraModificada = palabraCreada.concat(cubeClicked.landedLetter) // this is okay because .concat() is nondestructive
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
  // It's a brand new round of Españoggle.
  // No word is currently being created.
  // The previous letter cube that was added to the word (i.e. the last element in chosenCubes array) is
  // adjacent (horizontally, vertically or diagonally) to the letter cube that I want to click to append to that word 
  // The cube that I want to click to REMOVE from the word is the cube that I JUST added to the word
  // A single letter cube should not be used more than once in a given word 
  isClickable = cube => {
    const { status, chosenCubes, lastCubeClicked } = this.state;

    if (status !== 'comenzado') { // If I did NOT start the game (by clicking botón de inicio), I should NOT be able to click letter cubes!
      return false
    }
    
    if (!chosenCubes.length) { // If no word is currently being created, every letter cube is clickable
      return true
    }

    return this.copiesOrContiguousCubes(lastCubeClicked, cube)
  }

  iniciarJuego = () => {
    this.setState({ status: 'comenzado', board: buildBoard(), ...initialState}, () => {
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
    this.setState({ status: 'inicio', board: buildBoard(), ...initialState })
    alert('Gracias por jugar al Españoggle. ¡Chau!')
  }

  // Below, my letterCubes variable stores the array of cube objects that comprise the word that the user is trying to submit.
  // Self-reminder: each cube object in this array has key/value pairs for r, c, landedLetter
  // I must ensure that a letter cube is not duplicated in a given word
  // Using .map(), I'll return an array in which each element is the string row followed by the string column of a given cube object
  // Then I'll use ES6 Set object to see if the array is unique, which will indicate that a word does not contain duplicate cubes.
  uniqueCubesCompriseWord = () => {
    const letterCubes = this.state.chosenCubes;
    const stringCubeCoordinates = letterCubes.map(cube => `${cube.r}${cube.c}`);
    return stringCubeCoordinates.length === new Set(stringCubeCoordinates).size;
  }

  handleWordSubmission = () => {
    const word = this.state.palabraCreada;
    if (this.isValidLength(word) && this.isUnique(word) && this.uniqueCubesCompriseWord()) { // will add && this.isDefined(word) once I get my API key
      this.setState(prevState => ({
        ...prevState,
        palabrasFormadas: {...prevState.palabrasFormadas, [word]: [word.length - 2]},
        palabraCreada: '',
        chosenCubes: []
      }))
    } else {
      this.setState(prevState => ({
        ...prevState, palabraCreada: '', chosenCubes: []
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
        <i className="argentina flag"></i>&nbsp;<span><em>Una versión del juego Boggle al estilo español</em></span>&nbsp;<i className="argentina flag"></i>
        <br />
        {status !== 'comenzado' && <Button handleButtonClick={this.iniciarJuego} buttonType="iniciar">INICIO</Button>}
        {status === 'comenzado' && 
        <button style={{marginBottom: '5px', marginTop: '5px'}} className="ui icon button">
          <i className="hourglass half icon"></i>
          {countdown}
        </button>}
        <Board board={this.state.board} handleCubeClicked={this.handleCubeClicked} isClickable={this.isClickable} />
        <PalabraFormada palabraCreada={palabraCreada} enviarPalabra={this.handleWordSubmission} />
        <PalabrasPresentadas palabrasFormadas={palabrasFormadas} palabraCreada={palabraCreada} />
      </div>
    )
  }
}

export default BoggleGame;