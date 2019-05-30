import React, { Component } from 'react';

class ControlButtons extends Component {

  clearBoard = () => {
    this.props.resetGrid();
  }


  render(){
    return(
      <div className="button-block">
        <button onClick={this.clearBoard} className="control-button button-clear">Clear</button>
        <button className="control-button button-load">Load</button>
        <button className="control-button button-save">Save</button>
      </div>
    );
  }
}

export default ControlButtons;