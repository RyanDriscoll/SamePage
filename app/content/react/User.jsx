import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';

class User extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }

  }




  render(){
    return (
      <div className="message-component">
        <div>{this.props.username}</div>
      </div>
    )
  }
}


export default User;