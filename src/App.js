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
      arraySize: 0,
      modalActive: 0,
    };
  }

  // on first page load, set up a blank grid
  componentDidMount(){
    const width = this.getViewportWidth();
    // if the window is big enough, make it a 14x14 grid, otherwise, it's an 8x8 grid
    // newBlankArray() is passed as a callback to setState because setState is asynchronous -
    // we want to make sure setState has done it's done its job before doing what's next
    if (width > 840) {
      this.setState({ arraySize: 14 }, () => this.newBlankArray() );
    } else {
      this.setState({ arraySize: 8 }, () => this.newBlankArray() );
    }
    // add an event listener to monitor window resizing
    window.addEventListener("resize", this.updateWidth);

    // also, let's populate the loadObjects state with a list of what's available for loading
    this.loadGrid();
  }

  // does what it says on the tin
  // via https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
  getViewportWidth = () => {
    let w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
    return width;
  }

  // called by window resize event listenter: changes grid dimensions for desktop v mobile
  updateWidth = () => {
    let newSize = this.state.arraySize;
    const width = this.getViewportWidth();
    // if the screen is large enough, grid is 14x14
    if (width > 768) { 
      newSize = 14; 
    // otherwise, it's 8x8
    } else {
      newSize = 8;
    }
    // if the window has been resized to a point where the grid has to change dimensions, then:
    if (newSize !== this.state.arraySize ) { 
      // set the global arraySize state to the new grid size, and once that's done, generate a new array in the new size
      this.setState({arraySize: newSize}, () => this.newBlankArray() );
    }
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
    // update the CSS variable that tells CSS Grid how many rows/columns to make
    const html = document.getElementsByTagName('html')[0];
    html.style.setProperty('--array-size', this.state.arraySize);
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
          loadGrid={this.loadGrid} 
          loadArray={this.state.loadObjects} 
          drawGrid={this.drawGrid} 
          gridArray={this.state.gridArray} 
          selectedColor={this.state.selectedColor} 
          modalActive={this.state.modalActive} 
          disableAllControls={this.disableAllControls} 
          arraySize={this.state.arraySize} 
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
