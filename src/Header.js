import React, { Component } from 'react';
import ColorPicker from './ColorPicker';
import ControlButtons from './ControlButtons.js';
import LoadMenu from './LoadMenu.js';
import ConfirmModal from './ConfirmModal.js';

// Header is the component that holds the app title, the color picker components, the load/save/clear buttons,
// and the modals. It gets the changeSelectedColor, resetGrid, saveGrid, loadGrid, loadArray and drawGrid methods
// and the selectedColor, arraySize, and modalActive global states passed to it by props
class Header extends Component {
  constructor(props){
    super(props);

    this.state = {
      loadMenuHidden: true,
      modalHidden: true,
      clearGrid: false,
      colorPickerArray: [],
    };
  }

  // turns the modal on or off. Passed to ControlButtons, ConfirmModal and LoadMenu Components.
  toggleModal = (which) => {
    if (this.props.modalActive === 0) { 
      this.props.disableAllControls(-1); 
    } else {
      this.props.disableAllControls(0);
    }
    // 'which' is which thing is being asked about: clear or load
    if (which === 'modal') {
      // clear the modal by setting this component's modalHidden to its opposite
      const newState = !this.state.modalHidden;
      this.setState({
        modalHidden: newState,
      });
    } else if (which === 'load') {
      // if the user is being asked about loading, then show the load modal
      const newState = !this.state.loadMenuHidden;
      this.setState({
        loadMenuHidden: newState,
      });
    }
  }

  render() {
    let colorPickerArray = [];
    for (let i = 1; i < 9; i++) {
      colorPickerArray.push(
        <ColorPicker 
          key={"cp" + i} 
          color={i} 
          changeColor={this.props.changeSelectedColor} 
          selectedColor={this.props.selectedColor} 
          modalActive={this.props.modalActive} 
        />
      );
    }
    return (
      <div className="wrapper">
        <div className="silver-border">
          <header>
            <h1>brite lites</h1>
            <div className="color-picker-block">
              { colorPickerArray }
            </div>

            <ControlButtons 
              selectedColor={this.props.selectedColor} 
              resetGrid={this.props.resetGrid} 
              saveGrid={this.props.saveGrid} 
              loadGrid={this.props.loadGrid} 
              drawGrid={this.props.drawGrid} 
              toggleLoad={this.toggleLoadMenu} 
              toggleModal={this.toggleModal} 
              modalActive={this.props.modalActive} 
              disableAllControls={this.props.disableAllControls} 
            />

            <LoadMenu 
              loadArray={this.props.loadArray} 
              drawGrid={this.props.drawGrid} 
              isHidden={this.state.loadMenuHidden} 
              toggleLoad={this.toggleModal} 
              arraySize={this.props.arraySize} 
            />

            <ConfirmModal 
              isHidden={this.state.modalHidden} 
              toggleModal={this.toggleModal} 
              clearGrid={this.state.clearGrid} 
              resetGrid={this.props.resetGrid} 
            />
          </header>
        </div>
      </div>
    );
  }
}

export default Header;