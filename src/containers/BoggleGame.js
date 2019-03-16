import React, { Component } from 'react';
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
const shakeDiceTray = diceArray => {
  for (let i = 0; i < 16; i++) {
    let arbitraryIndex = Math.floor(Math.random() * 16);
    let temporaryValue = diceArray[i];
    diceArray[i] = diceArray[arbitraryIndex];
    diceArray[arbitraryIndex] = temporaryValue;
  }
  return diceArray;
}

class BoggleGame extends Component {
  render() {
  	return (
  	  <div>Stubbing out the shell of my BoggleGame React container class component!</div>
  	)
  }
}

export default BoggleGame;