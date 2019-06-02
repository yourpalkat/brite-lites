import React, { Component } from 'react';

// this Component makes the three load/save/clear buttons
// it gets the resetGrid, loadGrid, saveGrid, drawGrid and toggleModal methods 
// and the global selectedColor and modalActive states passed to it via props
class ControlButtons extends Component {
  // handler for 'clear' button calls the toggleModal method of Header.js
  clearBoard = () => {
    this.props.toggleModal('modal');
  }
  // handler for 'save' button calls the saveGridArray method of App.js
  saveGrid = () => {
    this.props.saveGrid();
  }

  // handler for 'load' button calls the toggleModal method of Header.js and the loadGrid method of App.js
  loadGrid = () => {
    this.props.loadGrid();
    this.props.toggleModal('load');
  }


  render(){
    return(
      <div className="button-block">
        <button onClick={this.clearBoard} className="control-button button-clear" tabIndex={this.props.modalActive}>Clear</button>
        <button onClick={this.loadGrid} className="control-button button-load" tabIndex={this.props.modalActive}>Load</button>
        <button onClick={this.saveGrid} className="control-button button-save" tabIndex={this.props.modalActive}>Save</button>
      </div>
    );
  }
}

export default ControlButtons;