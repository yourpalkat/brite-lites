import React, { Component } from 'react';
import './index.css';
import './App.css';

class Bulb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: this.props.assignedColor,
    }
  }

  assignColor = () => {
    this.setState({
      color: this.props.assignedColor,
    });
  }

  toggleColor = () => {
    if(this.state.color === this.props.selColor) {
      this.setState({ color: 0});
    } else {
      this.props.updateArrayColor(this.props.row, this.props.column);
      this.assignColor();
      console.log(this.assignedColor);
      // this.setState({ color: this.props.selColor });
      
      // OK two things are wrong. the first click doesn't register, it takes two to set the grid
      // 'clear' works to clear the state's gridArray, but the bulb components aren't updating visually.
    }
  }

  render() {
    const bulbClass = "bulb bulb-color" + this.state.color;
    return(
      <div onClick={this.toggleColor} className={bulbClass}></div>
    );
  }
}

export default Bulb;