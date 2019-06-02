import React, { Component } from 'react';
import Bulb from './Bulb.js';

// this component displays the clickable picture grid of bulbs
// it receives the global selectedColor & modalActive states, the global gridArray (which holds the color of every bulb Component)
// and the global updateArrayColor method passed to it by props from App.js
class Main extends Component {
  
  // map over the global state's gridArray recursively to display a grid of turned-off bulb objects
  makeGrid = () => {
    let displayArray = this.props.gridArray.map((row, rowIndex) => {
      return (row.map((column, colIndex) => {
        // keyString is just a unique id for each component based on its x,y value in the gridArray
        const keyString = rowIndex + "-" + colIndex;
        // isOdd is for styling, it handles the offset-grid appearance: odd row are shifted to the left, even to the right
        const isOdd = rowIndex % 2;
        return (
          <Bulb 
            key={keyString} 
            row={rowIndex} 
            column={colIndex} 
            selColor={this.props.selectedColor} 
            assignedColor={this.props.gridArray[rowIndex][colIndex]} 
            updateArrayColor={this.props.updateArrayColor} 
            isOdd={isOdd} 
            modalActive={this.props.modalActive} 
          />
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