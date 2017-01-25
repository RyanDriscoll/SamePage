import React, { Component } from 'react';
import {connect} from 'react-redux';

class MainContainer extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div>I just injected you!</div>
    )
  }
}

export default MainContainer;