import React, { Component } from 'react';
import './index.css';
import './App.css';
import Header from './Header.js';
import Main from './Main.js';

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

  // this function just makes a dummy blank array as an empty start state
  // the main screen is an 8x8 grid of dots; the array is 8 items with each item as an array of 8
  newBlankArray = () => {
    const tempArray = [];
    for (let i = 0; i < 8; i++) {
      const subArray = [];
      for (let i = 0; i < 8; i++) {
        subArray.push(0);
      }
      tempArray.push(subArray);
    }
    // now we set our global state array to the blank array
    this.setState({
      gridArray: tempArray,
    });
  }

  changeArrayColor = (row, column, newColor) => {
    const tempArray= [];
    // cant alter state.gridArray[x][y] directly. Duplicate it, then change the value in tempArray[x][y], then setState
    tempArray = this.state.gridArray.map((row) => {
      return (row.map(column))
    });
    tempArray[row][column] = newColor;
    this.setState({
      gridArray: tempArray,
    });
  }

  changeSelectedColor = (newColor) => {
    this.setState({ selectedColor: newColor });
  }

  render() {
    return (
      <div className="App">
        <Header changeSelectedColor={this.changeSelectedColor} resetGrid={this.newBlankArray} />
        <Main selectedColor={this.state.selectedColor} gridArray={this.state.gridArray} />
      </div>
    );
  }
}

export default App;
