import React, { Component } from 'react';
import './index.css';
import './App.css';
// this component is every bulb you can turn on and off in the grid
// Bulb receives key,  row, column, selColor (the global state: selectedColor), 
// assignedColor (the color at this [row, column] position in the global state array), 
// and updateArrayColor (a callback to the global updateArrayColor() method) via props

class Bulb extends Component {
  constructor(props) {
    super(props);
  }

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
    if (this.props.isOdd != "0") { 
      bulbClass = bulbClass + " oddRow"; 
    } else {
      bulbClass = bulbClass + " evenRow";
    }
    return(
      <div onClick={this.toggleColor} className={bulbClass}></div>
    );
  }
}

export default Bulb;