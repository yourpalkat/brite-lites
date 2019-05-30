import React, { Component } from 'react';
import LoadListItem from './LoadListItem.js'

class LoadMenu extends Component {
  constructor(props){
    super(props);
  }

  closeMenu = () => {
    this.props.toggleLoad();
  }

  makeOptionList = () => {
    let optionList = this.props.loadArray.map((pictureObject, index) => {
      return(
        <LoadListItem key={'ll'+ index} name={pictureObject.pictureName} drawGrid={this.props.drawGrid} pictureGrid={pictureObject.pictureGrid} closeMenu={this.closeMenu} />
      )
    });

    return(optionList);
  }

  render(){
    return(
      <div className={"loadMenu " + (this.props.isHidden ? 'isHidden': null)}>
        <h2>Choose a picture!</h2>
        { this.makeOptionList() }
      </div>
    );
  }
}

export default LoadMenu;