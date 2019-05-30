import React, { Component } from 'react';
import Bulb from './Bulb.js';

class Main extends Component {
  constructor(props) {
    super(props)
    
  }
  
  // map over the global state's gridArray recursively to display a grid of turned-off bulb objects
  makeGrid = () => {
    let displayArray = this.props.gridArray.map((row, rowIndex) => {
      return (row.map((column, colIndex) => {
        const keyString = rowIndex + "-" + colIndex;
        return (
          <Bulb key={keyString} row={rowIndex} column={colIndex} selColor={this.props.selectedColor} assignedColor={this.props.gridArray[rowIndex][colIndex]} updateArrayColor={this.props.updateArrayColor} />
        );
      }));
    });
    return displayArray;
  }

  render(){
    return (
      <main>
        <div className="wrapper">
          <div className="silver-border">
            <div className="light-board">
              { this.makeGrid() }
            </div>
          </div>
        </div>
      </main>
    );

  }
}

export default Main;