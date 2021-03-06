import React from 'react';
import Cube from '../Cube/Cube';
import styles from './Board.module.css';

const Board = ({ board, handleCubeClicked, isClickable, chosenCubes }) => {
  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) => 
        <div key={rowIndex} style={{display: 'flex'}}>
          {row.map(cubeObject => {
            return (
              <Cube
                key={cubeObject.c}
                cube={cubeObject}
                chosenCubes={chosenCubes}
                handleCubeClicked={handleCubeClicked}
                isClickable={isClickable} />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Board;

/*
// Board is a stateless functional component that just receives props from its parent and renders valid JSX
// When Board component is rendered from BoggleGame's render method, it receives this object as its props:
// {
//   board: the array of nested arrays stored in BoggleGame's local state,
//   handleCubeClick: callback arrow function object (I must pass this down to Cube component)
// }
// .map() invokes the provided callback function once on each array element & returns an array of resulting values
// Using .map(), iterate through the 4 row array elements of the outermost array
// Call .map() on each row. For each of 4 cube object elements in each row, which looks something like this 
// { r: row number, c: column number, landedLetter: "string letter that landed face up" },
// render a Cube functional component
// When each Cube child component is rendered from inside the .map() iteration, it receives this object as its props:
// { 
//   cube: current cube object in the iteration, which contains row number (r), column number (c), string letter that landed face up (landedLetter) 
//   handleCubeClick: callback arrow function object 
// }
// I should only pass down the minimal amount of props necessary from parent to child, but Cube component needs r, c AND landedLetter
// The resulting JSX from rendering the array of Cube components will be injected into the <div> to populate the game board
*/