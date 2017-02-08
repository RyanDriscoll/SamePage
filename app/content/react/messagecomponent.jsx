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

  componentDidMount() {
    if (this.props.messageOwner) {
      TweenLite.fromTo(this.message, 0.3, {
        x: 300
      }, {
        x: 0
      });
    } else {
      TweenLite.fromTo(this.message, 0.3, {
        x: -300
      }, {
        x: 0
      });
    }
  }

  render(){
    return (
      <div
        className="message-component"
        ref={el => {this.message = el;}}
        >
        {
          this.props.messageOwner ?
          <div className="message-component-self shadow">

            <div className="message-component-content-self" >{this.props.content}</div>
            <div className="message-component-date" >{this.time}</div>
          </div>
          :
          <div className="message-component-others shadow">
            <div className="message-component-username" >{this.props.sender}</div>
            <div className="message-component-content-others" >{this.props.content}</div>
            <div className="message-component-date" >{this.time}</div>
          </div>
        }
      </div>
    )
  }
}

// <div className="message-component-username" >{this.props.sender}</div>


export default MessageComponent;