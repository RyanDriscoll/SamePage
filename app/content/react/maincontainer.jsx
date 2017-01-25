import React, { Component } from 'react';
import {connect} from 'react-redux';

class MainContainer extends React.Component{
  constructor(props){
    super(props);
    this.sideBarStyle = {
      position: 'fixed',
      right: '0px',
      top: '0px',
      width: '30vw',
      height: '100%',
      backgroundColor: 'blue',
      float: 'right',
      marginLeft: '20px'
    }
  }

  render(){
    return (
      <div style={this.sideBarStyle}>I just injected you!</div>
    )
  }
}

export default MainContainer;