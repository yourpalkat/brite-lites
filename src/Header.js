import React, { Component } from 'react';
import ColorPicker from './ColorPicker';
import ControlButtons from './ControlButtons.js';
import LoadMenu from './LoadMenu.js';
import ConfirmModal from './ConfirmModal.js';

class Header extends Component {
  constructor(props){
    super(props);

    this.state = {
      loadMenuHidden: true,
      modalHidden: true,
      clearGrid: false,
    };
  }

  toggleModal = (which) => {
    if (which === 'modal') {
      const newState = !this.state.modalHidden;
      this.setState({
        modalHidden: newState,
      });
    } else if (which === 'load') {
      const newState = !this.state.loadMenuHidden;
      this.setState({
        loadMenuHidden: newState,
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="silver-border">
          <header>
            <h1>brite lites</h1>
            <div className="color-picker-block">
              <ColorPicker color={1} changeColor={this.props.changeSelectedColor} />
              <ColorPicker color={2} changeColor={this.props.changeSelectedColor} />
              <ColorPicker color={3} changeColor={this.props.changeSelectedColor} />
              <ColorPicker color={4} changeColor={this.props.changeSelectedColor} />
              <ColorPicker color={5} changeColor={this.props.changeSelectedColor} />
              <ColorPicker color={6} changeColor={this.props.changeSelectedColor} />
              <ColorPicker color={7} changeColor={this.props.changeSelectedColor} />
              <ColorPicker color={8} changeColor={this.props.changeSelectedColor} />
            </div>

            <ControlButtons selectedColor={this.props.selectedColor} resetGrid={this.props.resetGrid} saveGrid={this.props.saveGrid} loadGrid={this.props.loadGrid} drawGrid={this.props.drawGrid} toggleLoad={this.toggleLoadMenu} toggleModal={this.toggleModal} />

            <LoadMenu loadArray={this.props.loadArray} drawGrid={this.props.drawGrid} isHidden={this.state.loadMenuHidden} toggleLoad={this.toggleModal} />

            <ConfirmModal isHidden={this.state.modalHidden} toggleModal={this.toggleModal} clearGrid={this.state.clearGrid} resetGrid={this.props.resetGrid} />
          </header>
        </div>
      </div>
    );
  }
}

export default Header;