import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import axios from 'axios';
//import io from 'socket.io-emitter';
// var socket = io()
import rootPath from '../../background/httpServer.jsx';


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
    console.log("ki")
    //socket.emit('create:message', {content: this.state.currMessage, user_id: 1, group_id: 1} );m platform with both dual and quad core (35W and 65W options) available to consumers along with the
    axios.post(rootPath+'messages', {content: this.state.currMessage, user_id: 1, group_id: 1} )//window.location.protocol + "://" + window.location.host + "/" + window.location.pathname
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
          <input type="text" name="msg" placeholder="Send Message" value={this.state.currMessage} onChange={this.handleChatChange} className="chat-input"/>
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