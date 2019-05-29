import React, { Component } from 'react';
import './index.css';
import './App.css';
import Header from './Header.js';
import Main from './Main.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedColor: 2,
    };
  }

  changeSelectedColor = (newColor) => {
    this.setState({ selectedColor: newColor });
  }

  render() {
    return (
      <div className="App">
        <Header changeSelectedColor={this.changeSelectedColor} />
        <Main selectedColor={this.state.selectedColor}/>
      </div>
    );
  }
}

export default App;
