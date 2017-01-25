import React, { Component } from 'react';
import {connect} from 'react-redux';

class MainContainer extends React.Component{
  constructor(props){
    super(props);
    this.sideBarStyle = {
      position: 'fixed',
      top: '86vh',
      left: '92vw',
      zIndex:'9999',
      background: '#2c75ea',
      height: '85px',
      width: '85px',
      borderRadius: '50%'
    }
  }


  render(){
    return (
      <div style={this.sideBarStyle}>I just injected you!</div>
    )
  }
}

export default MainContainer;