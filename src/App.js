import React, { Component } from 'react';
import firebase from './firebase.js';
import './index.css';
import './App.css';
import Header from './Header.js';
import Main from './Main.js';

class App extends Component {
  constructor() {
    super();
    // selectedColor is the current draw color, white by default
    // gridArray holds the on/off state and color of every bulb component in the picture
    // loadObjects gets filled with the pictures on firebase availalble to load
    this.state = {
      selectedColor: 8,
      gridArray: [],
      loadObjects: [],
      arraySize: 8,
      modalActive: 0,
    };
  }
  // on load, set the grid to be blank
  componentDidMount(){
    this.newBlankArray();
  }

  // this function just makes a dummy blank array as an empty start state
  // the main screen is an 8x8 grid of Bulb components; the array is 8 items with each item as an array of 8
  newBlankArray = () => {
    const tempArray = [];
    for (let i = 0; i < this.state.arraySize; i++) {
      const subArray = [];
      for (let i = 0; i < this.state.arraySize; i++) {
        subArray.push(0);
      }
      tempArray.push(subArray);
    }
    // now we set our global state array to the blank array
    this.setState({
      gridArray: tempArray,
    });
  }

  // saves the current state of state.gridArray to firebase with a user-submitted name
  saveGridArray = () => {
    // create ref to firebase
    const dbRef = firebase.database().ref();
    // ask user for a name to save it under
    const gridName = prompt("Please enter a name for your creation! Letters, numbers or underscores only, please.");
    if (gridName) {
      // only allow A-Z, a-z, 0-9, or _
      const regex = /[^\w]/;
      if ( gridName.search(regex) === -1 ) {
        // make an object that contains the user-entered name and the current gridArray
        const saveObject = {
          pictureName: gridName,
          pictureGrid: this.state.gridArray
        };
        // push that object to firebase
        dbRef.push(saveObject);
      }
    }
  }

  // connects to firebase, adds the list of available pictures to load to the global state's loadObjects array
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
  }

  drawGrid = (chosenGrid) => {
    // set state on state.gridArray to match chosenGrid
    this.setState({
      gridArray: chosenGrid
    });
  }

  // this toggles the tabState of everything when a modal is activated/dismissed
  disableAllControls = (modalBit) => {
    this.setState({
      modalActive: modalBit,
        })
  }

  // called when a bulb component in Main is clicked on and changes color
  updateArrayColor = (row, column, newColor) => {
    // we can't alter a single value in the global state's grid array directly, so let's duplicate it
    let tempArray = [...this.state.gridArray];

    // target the spot in our temporary array using the row & column vallues passed in, and set it to the passed-in color
    tempArray[row][column] = newColor;
    // make the global state gridArray equal to our updated temporary array
    this.setState({
      gridArray: tempArray,
    });
    ;
  }

  // called by the color selector component in Header; changes the global state of selectedColor, needed to update arrayColor
  changeSelectedColor = (newColor) => {
    this.setState({ selectedColor: newColor });
  }

  // actually draws our app
  render() {
    return (
      <div className="App">
        <Header 
          changeSelectedColor={this.changeSelectedColor} 
          resetGrid={this.newBlankArray} 
          saveGrid={this.saveGridArray} 
          loadGrid={this.loadGrid} 
          loadArray={this.state.loadObjects} 
          drawGrid={this.drawGrid} 
          selectedColor={this.state.selectedColor} 
          modalActive={this.state.modalActive} 
          disableAllControls={this.disableAllControls} 
        />
        <Main 
          selectedColor={this.state.selectedColor} 
          gridArray={this.state.gridArray} 
          updateArrayColor={this.updateArrayColor} 
          modalActive={this.state.modalActive} 
        />
      </div>
    );
  }
}

export default App;
