import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';

class SendMessageComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currMessage: '',
    }
    this.sendChat = this.sendChat.bind(this);
    this.handleChatChange = this.handleChatChange.bind(this);
  }

  sendChat(e){
    e.preventDefault();
    // this.props.dispatch(this.state.currMessage);
    this.setState({currMessage: ''});
  }

  handleChatChange(e){
    e.preventDefault();
    this.setState({currMessage: e.target.value});
  }


  render(){
    return (
      <div className="sendchat-component">
        <form action="submit" onSubmit={this.sendChat}>
          <input type="text" placeholder="Send Message" value={this.state.currMessage} onChange={this.handleChatChange}/>
          <button className="sendchat-btn" onClick={this.sendChat} >Send</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = function(state){
  return {

  }
}

const mapDispatchToProps = function(dispatch){
  return {

  }
}

export default SendMessageComponent;