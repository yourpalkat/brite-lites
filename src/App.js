import React, { Component } from 'react';
import firebase from './firebase.js';
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
      loadObjects: [],
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

  saveGridArray = () => {
    // create ref to firebase
    const dbRef = firebase.database().ref();
    // ask user for a name to save it under
    const gridName = prompt("Please enter a name for your creation");
    // map state.gridArray to a tempArray
    let tempArray = this.state.gridArray.map((tempRow) => {
      return (tempRow.map((tempColumn) => {
        return (tempColumn);
      }));
    });
    // make an object that contains that name and tempArray
    const saveObject = {
      pictureName: gridName,
      pictureGrid: tempArray
    };
    // push that object to firebase
    dbRef.push(saveObject);
  }

  loadGrid = () => {
    // create ref to database
    const dbRef = firebase.database().ref();
    // get list of picture objects in firebase and store them in state:
    // this event listener takes a callback function which we will use to get our data
    // from the database and call it response
    dbRef.on('value', (response) => {
      // create a temporary array to store the objects from firebase
      const newState = [];

      // store the response from our query to Firebase inside of a variable called data
      // .val() is a Firebase method that gets us the information we want
      const data = response.val();

      //data is an object, so we iterate through it using a for in loop to access each picture object 
      for (let key in data) {
        // inside the loop, we push each picture object to our temporary newState array
        newState.push(data[key]);
      }
      // assign value of temporary newState array to state.loadObjects
      this.setState({
        loadObjects: newState
      });

    });
    // display list of object.pictureName
    // user chooses one
    // set state of gridArray to selected object.pictureArray
  }

  drawGrid = (chosenGrid) => {
    // set state on state.gridArray to match chosenGrid
    this.setState({
      gridArray: chosenGrid
    });
  }

  updateArrayColor = (row, column, newColor) => {
    // cant alter state.gridArray[x][y] directly. Duplicate it, then change the value in tempArray[x][y], then setState
    let tempArray = this.state.gridArray.map((tempRow) => {
      return (tempRow.map((tempColumn) => {
        return (tempColumn);
      }));
    });

    tempArray[row][column] = newColor;
    this.setState({
      gridArray: tempArray,
    });
    ;
  }

  changeSelectedColor = (newColor) => {
    this.setState({ selectedColor: newColor });
  }


  render() {
    return (
      <div className="App">
        <Header changeSelectedColor={this.changeSelectedColor} resetGrid={this.newBlankArray} saveGrid={this.saveGridArray} loadGrid={this.loadGrid} />
        <Main selectedColor={this.state.selectedColor} gridArray={this.state.gridArray} updateArrayColor={this.updateArrayColor} loadArray={this.state.loadObjects} drawGrid={this.drawGrid} />
      </div>
    );
  }
}

export default App;
