import React from 'react';
import Bulb from './Bulb.js';

const Main = (props) => {

  // then we map over that array recursively to display a grid of turned-off bulb objects
  return (
    <main>
      <div className="wrapper">
        <div className="silver-border">
          <div className="light-board">
            {
              props.gridArray.map((row, rowIndex) => {
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