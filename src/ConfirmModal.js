import React, { Component } from 'react';


class ConfirmModal extends Component {

  cancelModal = () => {
    this.props.toggleModal('modal');
  }
  
  proceedModal = () => {
    this.props.toggleModal('modal');
    this.props.resetGrid();
  }

  render() {
    return(
      <div className={"confirmModal " + (this.props.isHidden ? 'isHidden' : null)} >
        <div className="modalBorder silver-border">
          <div className="modalBody">
            <h3>Are you sure?</h3>
            <p>This will erase the current picture.</p>
            <button onClick={this.cancelModal} className="control-button button-clear">Never mind</button>
            <button onClick={this.proceedModal} className="control-button button-save">Go ahead!</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmModal;