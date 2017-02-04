import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import ReactTransitionGroup from 'react-addons-transition-group';
import MessageContainer from './messagecontainer.jsx';
import UserContainer from './UserContainer.jsx';
import SendMessageComponent from './sendmessagecomponent.jsx';
import ScrollLock from 'react-scroll-lock-component';


class ChatContainer extends React.Component{
  constructor(props){
    super(props);

    this.stopScroll = this.stopScroll.bind(this);
    this.startScroll = this.startScroll.bind(this);
  }

  stopScroll() {
    console.log('stopScroll', document.body)
    document.body.style.overflow = 'hidden';
  }

  startScroll() {
    console.log('startScroll', document.body)
    document.body.style.overflow = 'scroll';
  }



  render(){
    return (
      <div className={this.props.animation} onMouseEnter={this.stopScroll} onMouseLeave={this.startScroll}>
        <UserContainer />
          <MessageContainer />
        <SendMessageComponent />
      </div>
    );
  }
}

export default ChatContainer;
