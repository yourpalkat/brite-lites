import React, { Component } from 'react';
import './index.css';
import './App.css';

class Bulb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: this.props.initialColor,
    }
  }

  assignColor = (newColor) => {
    this.setState({
      color: newColor,
    });
  }

  toggleColor = () => {
    if(this.state.color === this.props.selColor) {
      this.setState({ color: 0});
    } else {
      this.setState({ color: this.props.selColor });
    }
  }

  render() {
    const bulbClass = "bulb bulb-color" + this.state.color;
    console.log('from bulb', this.props.selColor);
    return(
      <div onClick={this.toggleColor} className={bulbClass}></div>
    );
  }
}

export default Bulb;