import React, { Component } from 'react';

// this Component displays each individual picture that goes in the list of things available to load
// it gets its name, the parent component's closeMenu method, and the drawGrid method of App.js passed to it
// via props from LoadMenu.js
class LoadListItem extends Component {

  // click handler for this component 
  selectPicture = () => {
    // replace the main grid by calling the drawGrid method of App.js, passing it this item's picture grid
    this.props.drawGrid(this.props.pictureGrid);
    // close the load menu by calling the closeMenu method of LoadMenu.js
    this.props.closeMenu();
  }

  render() {
    return (
      <div className="loadItem">
        <button onClick={this.selectPicture} className="loadItemButton">{this.props.name}</button>
      </div>
    );
  }
}

export default LoadListItem;