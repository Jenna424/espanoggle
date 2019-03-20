import React, { Component } from 'react';
import diccionario from '../apis/diccionario'; // importing the axios instance that I created, which I'll refer to as diccionario
import Board from '../components/Board/Board';
import PalabraPresentada from '../components/PalabraPresentada/PalabraPresentada';
import Button from '../components/UI/Button/Button';
import Modal from '../components/UI/Modal/Modal';
import ScoreSummary from '../components/ScoreSummary/ScoreSummary';
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

class BoggleGame extends Component {
  state = {
    board: buildBoard(),
    lastCubeClicked: null,
    chosenCubes: [], // an array of JS cube objects. Each cube object element in this array represents a letter cube on the board that the user has clicked on and thus activated, so that she can incorporate that letter in the word she is currently building
    palabraCreada: '', // the string Spanish word that the user is creating by clicking cubes on the boggle board
    wordsOnBoard: {},
    dictionary: [],
    status: 'inicio',
    countdown: 180, // A single round of boggle lasts 3 minutes,
    error: false
  }

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

  isValidLength = word => word.length >= 3 ? true : false

  isUnique = word => !this.state.wordsOnBoard.includes(word)

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

  isDefined = word => this.state.dictionary.includes(word)
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
    const { status, chosenCubes, lastCubeClicked } = this.state;
    if (status !== 'comenzado') { // If I did NOT start the game (by clicking the COMIENZA button), I should NOT be able to click letter cubes!
      return false
    }
    
    if (!chosenCubes.length) { // If no word is currently being built, every letter cube is clickable
      return true
    }

    return this.contiguousCubes(lastCubeClicked, cube)
  }

  beginBoggle = () => {
    this.setState({ status: 'comenzado' }, () => {
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

  render() {
    const { wordsOnBoard, status, countdown } = this.state; // I'm using object destructuring to retrieve values stored in BoggleGame's local state
    return (
      <div style={{textAlign: 'center'}} className="ui-container">
        <Modal viewable={status === 'terminado'}>
          <ScoreSummary wordsOnBoard={wordsOnBoard} />
        </Modal>
        <h2 style={{color: 'red'}}><em>¡Españoggle!</em></h2>
        <Board board={this.state.board} handleCubeClicked={this.handleCubeClicked} isClickable={this.isClickable} />
        <PalabraPresentada palabraCreada={this.state.palabraCreada} />
        {status === 'inicio' && <Button buttonClick={this.beginBoggle} buttonType="success">¡Comienza!</Button>}
        {status === 'comenzado' && 
        <button className="ui icon button">
          <i class="hourglass half icon"></i>
          {countdown}
        </button>}
      </div>
    )
  }
}

export default BoggleGame;