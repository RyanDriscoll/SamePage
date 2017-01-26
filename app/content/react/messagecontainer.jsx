import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import MessageComponent from './messagecomponent.jsx';

class MessageContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages: [{content: "hello", sender: 'alan', time: 'now'}]
    }
    
  }

  


  render(){
    return (
      <div>
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