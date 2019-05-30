import React, { Component } from 'react';
import './index.css';
import './App.css';
// Bulb receives key,  row, column, selColor (the global state: selectedColor), 
// assignedColor (the color at this [row, column] position in the global state array), 
// and updateArrayColor (a callback to the global updateArrayColor() method) via props

class Bulb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: this.props.assignedColor,
    }
  }

  assignColor = () => {
    this.setState({
      color: this.props.selColor,
    });
  }

  toggleColor = () => {
    if(this.state.color === this.props.selColor) {
      this.setState({ color: 0});
      this.props.updateArrayColor(this.props.row, this.props.column, 0);
    } else {
      this.props.updateArrayColor(this.props.row, this.props.column, this.props.selColor);
      this.assignColor();
      }
      // 'clear' works to clear the state's gridArray, but the bulb components aren't updating visually.
  }

  render() {
    const bulbClass = "bulb bulb-color" + this.state.color;
    return(
      <div onClick={this.toggleColor} className={bulbClass}></div>
    );
  }
}

export default Bulb;