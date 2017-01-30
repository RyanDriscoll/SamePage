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
    this.chatButtonRaktUnclicked = {
      position: 'fixed',
      top: '93vh',
      left: '96vw',
      zIndex: 99999,
      background: '#2c75ea',
      height: '110px',
      width: '110px',
      borderRadius: '50%',
      border: '2px solid blue',
    }
    this.chatButtonRaktClicked = {
      position: 'fixed',
      top: '93vh',
      left: '96vw',
      zIndex: 99999,
      background: '#ea452c',
      height: '110px',
      width: '110px',
      borderRadius: '50%',
      border: '2px solid blue',
    }
  }

  toggleChatDisplay(e){
    e.preventDefault();
    
    chrome.runtime.sendMessage({type: 'joinRoom'}, null)

    this.setState({animate: !this.state.animate})
    if(this.state.displayChat){
      setTimeout( () => {
        this.setState({displayChat: !this.state.displayChat});
      }, 500)
    } else this.setState({displayChat: !this.state.displayChat});

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
            <div style={this.state.displayChat ? this.chatButtonRaktClicked : this.chatButtonRaktUnclicked} onClick={this.toggleChatDisplay} />
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