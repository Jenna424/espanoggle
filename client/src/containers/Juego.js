import React, { Component } from 'react';
import TableroDeJuego from '../containers/TableroDeJuego/TableroDeJuego';
import Button from '../components/UI/Button/Button';
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

const initialState = {
  chosenCubes: [], // an array of JS cube objects. Each cube object element in this array represents a letter cube on the board that the user selected during word formation
  palabraCreada: '', // the string Spanish word that the user is creating by clicking cubes on the boggle board
  palabrasFormadas: {}, // Each key in this object is a valid string Spanish word, and its corresponding value is the number of points awarded for that particular word (i.e. number of characters in the word - 2).
  countdown: 60 // For testing purposes, I'll set this to 60 seconds. In reality, a single round of boggle lasts 3 minutes, so I'll have to change this to 180
}

class Juego extends Component {
  state = {
    board: buildBoard(),
    ...initialState,
    status: 'inicio'
  };

  clearTimer = () => {
    clearInterval(this.intervalId)
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  iniciarJuego = () => {
    this.setState({ status: 'comenzado', board: buildBoard(), ...initialState}, () => {
      this.intervalId = setInterval(() => {
        this.setState(prevState => {
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

  render() {
    const { board, status, countdown } = this.state;
    return (
      <div style={{textAlign: 'center'}} className="ui-container">
        <h2 style={{color: 'red'}}><em>¡Españoggle!</em></h2>
        <i className="argentina flag"></i>&nbsp;<span><em>Una versión del juego Boggle al estilo español</em></span>&nbsp;<i className="argentina flag"></i>
        <br />
        {status !== 'comenzado' && <Button handleButtonClick={this.iniciarJuego} buttonType="iniciar">INICIO</Button>}
        {status === 'comenzado' && 
        <button style={{marginBottom: '5px', marginTop: '5px'}} className="ui icon button">
          <i className="hourglass half icon"></i>
          {countdown}
        </button>}
        <TableroDeJuego
          board={board}
          status={status}
          onPlayAgain={this.onPlayAgain}
          onDeclinePlayAgain={this.onDeclinePlayAgain}
        />
      </div>
    )
  }
}

export default Juego;