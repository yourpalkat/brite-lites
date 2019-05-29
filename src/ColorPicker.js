import React, { Component } from 'react';
import './index.css';
import './App.css';

class ColorPicker extends Component {
  handleClick = (colorChoice) => {
    this.props.changeColor(colorChoice);
  }

  render() {
    const classString = "bulb bulb-color" + this.props.color;
    return(
      <div onClick={() => this.handleClick(this.props.color)} className={classString}></div>
    );
  }
}

export default ColorPicker;