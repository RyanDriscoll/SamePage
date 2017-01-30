import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import ReactTransitionGroup from 'react-addons-transition-group';
import MessageContainer from './messagecontainer.jsx';
import UserContainer from './UserContainer.jsx';
import SendMessageComponent from './sendmessagecomponent.jsx';


class ChatContainer extends React.Component{
  constructor(props){
    super(props);
  }



  render(){
    return (
        <div className={this.props.animation}>
          <UserContainer />
          <MessageContainer />
          <SendMessageComponent />
        </div>
    );
  }
}

export default ChatContainer;
