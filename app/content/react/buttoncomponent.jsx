import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import ChatContainer from './ChatContainer.jsx';

class ButtonComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      displayChat: false,
      animate: false
    }
    this.toggleChatDisplay = this.toggleChatDisplay.bind(this);
  }

  toggleChatDisplay(e){
    e.preventDefault();
    this.setState({animate: !this.state.animate})
    if(this.state.displayChat){
      setTimeout( () => {
        this.setState({displayChat: !this.state.displayChat});
      }, 500)
    } else this.setState({displayChat: !this.state.displayChat})
  }


  render(){
    return (
      <div>
        {
          this.state.displayChat ?
            <ChatContainer animation={this.state.animate ? 'chatBoxx-rakt-in' : 'chatBoxx-rakt-out'}/>
            :
            null
        }
        {
          this.props.user ?
            <div className={this.state.displayChat ? 'chatButton-rakt-clicked' : 'chatButton-rakt-unclicked'} onClick={this.toggleChatDisplay} />
            :
            null
        }
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonComponent);