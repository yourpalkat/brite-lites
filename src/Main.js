import React from 'react';
import Bulb from './Bulb.js';

const Main = (props) => {

let displayArray = props.gridArray.map((row, rowIndex) => {
  return (row.map((column, colIndex) => {
    const keyString = rowIndex + "-" + colIndex;
    return (
      <Bulb key={keyString} row={rowIndex} column={colIndex} selColor={props.selectedColor} assignedColor={props.gridArray[rowIndex][colIndex]} updateArrayColor={props.updateArrayColor} />
    );
  }))
})

  // then we map over that array recursively to display a grid of turned-off bulb objects
  return (
    <main>
      <div className="wrapper">
        <div className="silver-border">
          <div className="light-board">
            { displayArray }
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;