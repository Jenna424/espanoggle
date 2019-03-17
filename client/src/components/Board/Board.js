import React from 'react';
import Cube from '../Cube/Cube';

const Board = props => (
  props.board.map(row => (
  	row.map(cube => (
  	  <Cube key={rowNum + colNum} rowNum={cube.r} colNum={cube.c} character={cube.landedLetter} />
  	))
  ))
)

export default Board;

// Board is a stateless functional component that just receives props from its parent and renders valid JSX
// When Board component is rendered from BoggleGame's render method, it receives this object as its props:
// {
//   board: the array of nested arrays stored in BoggleGame's local state,
//   handleOnClick: callback arrow function object (I'll have to pass this down further to Cube component)
// }
// .map() invokes the provided callback function once on each array element & returns an array of resulting values
// Using .map(), iterate through the 4 row array elements of the outermost array
// Call .map() on each row. For each cube object element in each row, which looks something like this 
// { r: row number here, c: column number here, landedLetter: "string letter that landed face up here" },
// render a Cube functional component
// When each Cube component is rendered from inside the .map() iteration, it receives this object as its props:
// { rowNum: row number here, colNum: column number here, character: "string letter that landed face up here" }
// The resulting JSX from rendering the array of Cube components will be injected into the <div> to populate the game board