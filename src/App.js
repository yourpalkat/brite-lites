import React, { Component } from 'react';
import './index.css';
import './App.css';
import Header from './Header.js';
import Main from './Main.js';
import Bulb from './Bulb.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedColor: 2,
      gridArray: [],
    };
  }
  // on load, set the grid to be blank
  componentDidMount(){
    this.newBlankArray();
  }

  // this function builds the display grid of 'bulb' components
  // the main screen is an 8x8 grid of dots; the array is 8 items with each item as an array of 8
  newBlankArray = () => {
    const tempArray = [];
    for (let ti = 0; ti < 8; ti++) {
      const subArray = [];
      for (let si = 0; si < 8; si++) {
        const keyString = ti + "-" + si;
        subArray.push(<Bulb key={keyString} selColor={this.state.selectedColor} initialColor={0} />);
      }
      tempArray.push(subArray);
    }
    // now we set our global state array to the blank array
    this.setState({
      gridArray: tempArray,
    });
  }

  changeArrayColor = (row, column, newColor) => {
    let tempArray= [];
    // cant alter state.gridArray[x][y] directly. Duplicate it, then change the value in tempArray[x][y], then setState
    tempArray = this.state.gridArray.map((row) => {
      return (row.map(column))
    });
    tempArray[row][column] = newColor;
    this.setState({
      gridArray: tempArray,
    });
  }

  resetGrid = () => {
    for(let rowi = 0; rowi < this.state.gridArray.length; rowi++) {
      for(let coli = 0; coli < this.state.gridArray[rowi].length; coli++) {
        // this.state.gridArray[rowi][coli].assignColor(0);
        console.log(this.state.gridArray[rowi][coli]);
      }
    }
  }

  changeSelectedColor = (newColor) => {
    this.setState({ selectedColor: newColor });
    console.log('from App', this.state.selectedColor);
  }

  render() {
    return (
      <div className="App">
        <Header changeSelectedColor={this.changeSelectedColor} resetGrid={this.resetGrid} />
        <Main selectedColor={this.state.selectedColor} gridArray={this.state.gridArray} />
      </div>
    );
  }
}

export default App;
