import React from 'react';
import Bulb from './Bulb.js';

// this just makes a dummy blank array as an empty start state
// the main screen is an 8x8 grid of dots; the array is 8 items, each item is an array of 8
const Main = (props) => {
  const gridArray = [];
  for(let i=0; i<8; i++) {
    const subArray = [];
    for (let i=0; i<8; i++) {
      subArray.push(0);
    }
    gridArray.push(subArray);
  }
  // then we map over that array recursively to display a grid of turned-off bulb objects
  return (
    <main>
      <div className="wrapper">
        <div className="silver-border">
          <div className="light-board">
            {
              gridArray.map((row, rowIndex) => {
                return (row.map((column, colIndex) => {
                  const keyString = rowIndex + "-" + colIndex;
                  return (
                    <Bulb key={keyString} selColor={props.selectedColor} />
                  );
                }))
              })
            }
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;