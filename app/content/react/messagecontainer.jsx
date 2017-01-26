import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import MessageComponent from './messagecomponent.jsx';

class MessageContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages: [
        {content: "hello", sender: 'alan', time: 'now'},
        {content: "goodbye", sender: 'ryan', time: 'yesterday'},
        {content: "whatsup", sender: 'tom', time: 'tomorrow'},
        {content: "seeya", sender: 'kd', time: 'next tuesday'},
      ]
    }
    
  }

  


  render(){
    return (
      <div className="message-container-box">
        {
          this.state.messages.map(message => {
            return <MessageComponent content={message.content} sender={message.sender} time={message.time} />
          })
        }
      </div>
    )
  }
}

const mapStateToProps = function(state){
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = function(dispatch){
  return {

  }
}

export default MessageContainer;