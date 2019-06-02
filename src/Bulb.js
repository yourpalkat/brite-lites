import React, { Component } from 'react';
import './index.css';
import './App.css';
// this component is every bulb you can turn on and off in the grid
// Bulb receives key,  row, column, selColor (the global state: selectedColor), modalActive, 
// assignedColor (the color at this [row, column] position in the global state array), 
// and updateArrayColor (a callback to the global updateArrayColor() method) via props

class Bulb extends Component {
  // click handler for this object to change the color
  toggleColor = () => {
    // if the selected color is the same as this bulb's current color
    if(this.props.assignedColor === this.props.selColor) {
      // turn the bulb off by calling the global state's updateArrayColor method 
      // changing the color in that array changes the color of this component
      this.props.updateArrayColor(this.props.row, this.props.column, 0);
    } else {
      // otherwise, change the color of this bulb to the selected color
      this.props.updateArrayColor(this.props.row, this.props.column, this.props.selColor);
      }
  }

  render() {
    // the color of this bulb is controlled by the color in its corresponding position in the global state
    let bulbClass = "bulb bulb-color" + this.props.assignedColor;
    // this controls the offset-grid look: odd rows are nudged to the left, even to the right
    if (this.props.isOdd !== 0) { 
      bulbClass = bulbClass + " oddRow"; 
    } else {
      bulbClass = bulbClass + " evenRow";
    }

    let ariaLabelString = "";
    // assignedColor is a number but we need the word for it for the aria label
    switch (this.props.assignedColor) {
      case 0:
        ariaLabelString = " ";
        break;
      case 1:
        ariaLabelString = "Red";
        break;
      case 2:
        ariaLabelString = "Orange";
        break;
      case 3:
        ariaLabelString = "Yellow";
        break;
      case 4:
        ariaLabelString = "Green";
        break;
      case 5:
        ariaLabelString = "Blue";
        break;
      case 6:
        ariaLabelString = "Purple";
        break;
      case 7:
        ariaLabelString = "Pink";
        break;
      case 8:
        ariaLabelString = "White";
        break;
      default:
        ariaLabelString = " ";
        break;
    }

    return(
      <button onClick={this.toggleColor} className={bulbClass} aria-label={ariaLabelString} tabIndex={this.props.modalActive} >
      </button>
    );
  }
}

export default Bulb;