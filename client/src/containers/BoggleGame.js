import React, { Component } from 'react';
import diccionario from '../apis/diccionario'; // importing the axios instance that I created, which I'll refer to as diccionario
import Board from '../components/Board/Board';
// blankBoard stores an array of 4 arrays, in which each nested array contains 4 null elements (to simulate a blank 4x4 boggle board)
const blankBoard = new Array(4).fill(new Array(4).fill(null));
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
    chosenCubes: [], // an array of JS cube objects. Each cube object element in this array represents a letter cube on the board that the user has clicked on and thus activated, so that she can incorporate that letter in the word she is currently building
    wordBuilder: '', // the string word that the user is 'building' by clicking cubes on the boggle board
    wordsOnBoard: [],
    dictionary: [],
    status: 'new',
    initialCountdown: 180, // A single round of boggle lasts 3 minutes,
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
    if (!this.cubeCopies(cubeA, cubeB)) {
      const rowsApart = Math.abs(cubeA.r - cubeB.r);
      const columnsApart = Math.abs(cubeA.c - cubeB.c);
      return (rowsApart <= 1 && columnsApart <= 1)
    }
    return false
  }

  isDefined = word => this.state.dictionary.includes(word)
  // Below, cubeClicked argument passed to handleCubeClick callback arrow function = a JS cube object that looks like this: 
  // { r: row number, c: column number, landedLetter: string letter that landed side-up }
  handleCubeClicked = cubeClicked => {
    const { chosenCubes, wordBuilder } = this.state;
    // create a copy of the array to maintain immutability
    let chosenCubesCopy = chosenCubes.slice()
    let modifiedCubesCopy, modifiedWord; // both are currently undefined
    // if the user clicks on the last letter cube that was just added to the word
    if (chosenCubes[chosenCubes.length - 1] === cubeClicked) {
      // remove cube from copied array to indicate that its corresponding letter should NOT be included in the word being built
      modifiedCubesCopy = chosenCubesCopy.slice(0, -1)
      // remove the clicked cube's letter, i.e., the last string character in the wordBuilder string
      modifiedWord = wordBuilder.slice(0, -1) // .slice() is nondestructive
    } else { // the cube clicked on was not previously clicked
      modifiedCubesCopy = [...chosenCubes, cubeClicked]
      modifiedWord = wordBuilder.concat(cubeClicked.landedLetter) // .concat() is nondestructive
    }
    this.setState(state => {
      return {
        chosenCubes: modifiedCubesCopy,
        wordBuilder: modifiedWord
      }
    })
    console.log(wordBuilder)
  }
  //~ My criteria for a clickable cube ~
  // Adding a letter to the word: 
  // The previous letter cube that was added to the word (i.e. the last element in chosenCubes array) is
  // adjacent (horizontally, vertically or diagonally) to the letter cube that I want to click to append to the word
  // Removing a letter from the word: 
  // The cube that I want to click to REMOVE from the word is the cube that I JUST added to the word 
  // (i.e. the last element in chosenCubes array)
  // A new game is in progress and NO cubes have been clicked yet
  isClickable = cube => {
    if (this.state.status === 'over') { // If the game is over, I shouldn't be able to click a cube
      return false
    }
    // If wordBuilder is an empty string, this.state.chosenCubes.length = 0, which is falsy in JS
    if (!this.state.chosenCubes.length) {
      return true
    }

    let lastCubeChosen = this.state.chosenCubes[this.state.chosenCubes.length - 1];
    return this.contiguousCubes(lastLetterChosen, cube)
  }

  render() {
    return (
      <div className="ui-container">
        <h2 style={{'textAlign': 'center'}}><em>¡Españoggle!</em></h2>
        <Board board={this.state.board} handleCubeClicked={this.handleCubeClicked} isClickable={this.isClickable} />
      </div>
    )
  }
}

export default BoggleGame;