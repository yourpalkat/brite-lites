import React, { Component } from 'react';
import './index.css';
import './App.css';

// ColorPicker receives the changeSelectedColor method and the selectedColor, Color and modalActive value via props
// this component is one of the individual things you click on to choose the draw color
class ColorPicker extends Component {
  //passed-in color value is passed to this method as colorChoice
  handleClick = (colorChoice) => {
    // change the global state's selectedColor value (ie, the current draw color) by passing this component's color to 
    // the changeSelectedColor method via this callback
    this.props.changeColor(colorChoice);
  }

  render() {
    // the passed in 'color' value determines the appearance of this component
    let classString = "bulb selector-color" + this.props.color;
    if (this.props.selectedColor === this.props.color) { classString = classString + " bulb-color" + this.props.color}
    return(
      <button onClick={() => this.handleClick(this.props.color)} className={classString} tabIndex={this.props.modalActive} >
      </button>
    );
  }
}

export default ColorPicker;