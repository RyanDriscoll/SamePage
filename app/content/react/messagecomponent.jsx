import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
const moment = require('moment');

class MessageComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
    this.time = moment(this.props.time).format("MMM Do YYYY, h:mm a")
  }

  render(){
    return (
      <div className="message-component">
        {
          this.props.messageOwner ?
          <div className="message-component-self">

            <div className="message-component-content" >{this.props.content}</div>
            <div className="message-component-date" >{this.time}</div>
          </div>
          :
          <div className="message-component-others">
            <div className="message-component-username" >{this.props.sender}</div>
            <div className="message-component-content" >{this.props.content}</div>
            <div className="message-component-date" >{this.time}</div>
          </div>
        }
      </div>
    )
  }
}

// <div className="message-component-username" >{this.props.sender}</div>


export default MessageComponent;