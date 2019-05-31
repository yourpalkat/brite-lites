import React, { Component } from 'react';
import './index.css';
import './App.css';
// Bulb receives key,  row, column, selColor (the global state: selectedColor), 
// assignedColor (the color at this [row, column] position in the global state array), 
// and updateArrayColor (a callback to the global updateArrayColor() method) via props

class Bulb extends Component {
  constructor(props) {
    super(props);
  }

  toggleColor = () => {
    if(this.props.assignedColor === this.props.selColor) {
      this.props.updateArrayColor(this.props.row, this.props.column, 0);
    } else {
      this.props.updateArrayColor(this.props.row, this.props.column, this.props.selColor);
      }
  }

  render() {
    let bulbClass = "bulb bulb-color" + this.props.assignedColor;
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