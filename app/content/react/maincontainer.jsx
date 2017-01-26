import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import ChatContainer from './ChatContainer';

class MainContainer extends React.Component{
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
    // if(this.state.displayChat){
    //   TweenLite.to(this.refs.chatBoxDiv, 1, {scale: 1.5, ease:Bounce.easeOut} );
    //   TweenLite.to(this.refs.chatBoxDiv, 0.5, {scale: 1, delay: 1} );
    // }
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

export default MainContainer;