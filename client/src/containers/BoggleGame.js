import React, { Component } from 'react';
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
  const landedLetters = shakenDice.map(diceString => diceString.charAt(Math.floor(Math.random() * 6)))
  for (let r = 0; r < 4; r++) {
    const row = [];
    for (let c = 0; c < 4; c++) {
      const landedLetter = landedLetters.pop();
      const cube = {r, c, landedLetter};
      row.push(cube);
    }
    board.push(row)
  }
  return board;
}

class BoggleGame extends Component {
  state = {
    board: buildBoard()
  }

  render() {
  	return (
  	  <div>
        Stubbing out the shell of my BoggleGame React container class component!
        {this.state.board.map(array => array.map(object => console.log(object)))}
      </div>
  	)
  }
}

export default BoggleGame;