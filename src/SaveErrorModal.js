import React, { Component } from 'react';


class SaveErrorModal extends Component {

  cancelModal = () => {
    this.props.toggleModal('saveError');
  }

  render() {
    return(
      <div className={"confirmModal " + (this.props.isHidden ? 'isHidden' : null)} >
        <div className="modalBorder silver-border">
          <div className="modalBody">
            <h3>Sorry!</h3>
            <p>You can't save because you haven't made any changes yet. Get clicking!</p>
            <button onClick={this.cancelModal} className="control-button button-save">OK!</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SaveErrorModal;