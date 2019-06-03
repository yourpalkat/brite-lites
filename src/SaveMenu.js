import React, { Component } from 'react';
import firebase from './firebase.js';

// this component builds the save grid modal. It receives its own isHidden state and the toggleModal method 
// from Header.js and the loadArray & arraySize states of App.js passed to it via props from Header.js
class SaveMenu extends Component {
  constructor() {
    super();
    this.state = {
      userInput: '',
    }
  }

  // click handler for 'cancel' button hides this component by calling the toggleModal method of Header.js
  closeMenu = () => {
    this.setState({ userInput: "" });
    this.clearErrorMessages();
    this.props.toggleSave('save');
  }

  clearErrorMessages = () => {
    if (!document.getElementById('dupeError').classList.contains('isHidden')) {
      document.getElementById('dupeError').classList.add('isHidden');
    }
    if (!document.getElementById('lettError').classList.contains('isHidden')) {
      document.getElementById('lettError').classList.add('isHidden');
    }
    if (!document.getElementById('nameError').classList.contains('isHidden')) {
      document.getElementById('nameError').classList.add('isHidden');
    }
  }
  
  attemptSave = () => {
    // make sure our error messages are hidden
    this.clearErrorMessages();

    // create ref to firebase
    const dbRef = firebase.database().ref();

    // make sure something's been entered at all
    if (this.state.userInput) {
      // screen input to only allow A-Z, a-z, 0-9, or _
      const regex = /[^\w]/;
      if (this.state.userInput.search(regex) === -1) {
        // compare this name to others in the database, to screen out duplicates
        const comparisonList = this.getSavedList();
        if( comparisonList.includes(this.state.userInput) ) {
          // show 'no duplicates' error message
          document.getElementById('dupeError').classList.remove('isHidden');
        } else {
          // if these criteria are all met, we can actually save the grid to firebase
          // make an object that contains the user-entered name, the current state of gridArray, and the grid size
          const saveObject = {
            pictureName: this.state.userInput,
            pictureGrid: this.props.gridArray,
            arraySize: this.props.arraySize,
          };
          // push that object to firebase
          dbRef.push(saveObject);
          // set input field back to empty
          this.setState({ userInput: "" });
          // close modal
          this.props.toggleSave('save');
        }
      } else {
        // show 'no non-alpha chars' error message
        document.getElementById('lettError').classList.remove('isHidden');
      }
    } else {
      // show 'please enter a thing' message
      document.getElementById('nameError').classList.remove('isHidden');
    } 
  }

  // gets the names of items saved in firebase, to use when making sure of no name duplication
  getSavedList = () => {
    let savedList = this.props.loadArray.map((pictureObject) => {
      return pictureObject.pictureName;
    });
    return savedList;
  }

  handleChange = (event) => {
    // tell React to update the state of our component to be 
    // equal to whatever is currently the value of the input field
    this.setState({ userInput: event.target.value })
  }

  render(){
    return(
      <div className={"saveMenu " + (this.props.isHidden ? 'isHidden': null)}>
        <div className="modalBorder silver-border">
          <div className="saveMenuBody modalBody">
            <h2>Save your masterpiece!</h2>
            <label htmlFor="pictureName">Enter a name for your drawing! Use letters, numbers and underscores only, please.</label>
            <input type="text" id="pictureName" name="pictureName" className="pictureName" placeholder="Enter a name!" onChange={this.handleChange} value={this.state.userInput} />
            <p id="nameError" className="error isHidden">Please enter a name!</p>
            <p id="lettError" className="error isHidden">Please only use letters, numbers, and underscores!</p>
            <p id="dupeError" className="error isHidden">That name is already in use! Please pick another.</p>
            <button onClick={this.closeMenu} className="control-button button-clear" >Cancel</button>
            <button onClick={this.attemptSave} className="control-button button-save" >Save</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SaveMenu;