import React, { Component } from 'react';

class LoadListItem extends Component {
  constructor(props) {
    super(props);
  }

  selectPicture = () => {
    this.props.drawGrid(this.props.pictureGrid);
    this.props.closeMenu();
  }

  render() {
    return (
      <div className="loadItem">
        <button onClick={this.selectPicture}>{this.props.name}</button>
      </div>
    );
  }
}

export default LoadListItem;