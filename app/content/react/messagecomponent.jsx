import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';

class MessageComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
    
  }

  


  render(){
    return (
      <div className="message-component">
        <div className="message-component-part" >{this.props.sender}</div>
        <div className="message-component-part" >{this.props.time}</div>
        <div className="message-component-part" >{this.props.content}</div>
      </div>
    )
  }
}


export default MessageComponent;