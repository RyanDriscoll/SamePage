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
    document.body.style.overflow = 'hidden';
  }

  startScroll() {
    document.body.style.overflow = 'scroll';
  }



  render(){
    return (

      <div>
        {
          this.props.user ?
            <div className={this.props.animation} onMouseEnter={this.stopScroll} onMouseLeave={this.startScroll}>
              <UserContainer />
              <MessageContainer />
              <SendMessageComponent />
            </div>
            :
            null
        }
      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    user: state.auth
  }
}
const mapDispatchToProps = function(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
