import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import ChatContainer from './ChatContainer';

class ButtonComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      displayChat: false
    }
    this.toggleChatDisplay = this.toggleChatDisplay.bind(this);
  }

  toggleChatDisplay(e){
    e.preventDefault();
    this.setState({displayChat: !this.state.displayChat});
  }


  render(){
    return (
      <div>
        {
          this.state.displayChat ?
          <ChatContainer />
          :
          null
        }
        <div className="chatButton-rakt" onClick={this.toggleChatDisplay}>
        </div>
      </div>
    )
  }
}

export default ButtonComponent;