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

    this.sendChatComponent = {
      width: '100%',
      textAlign: 'center',
      height: '8%',
      padding: '5px'
    }
    this.chatInput = {
      width: '85%',
      height: '35%',
      margin: 'auto',
      fontSize: '11px'
    }
    this.sendChatBtn = {
      width: '29%',
      backgroundColor: 'green',
      color: 'black',
      border: '2px solid blue',
      borderRadius: '3px',
      margin: 'auto',
      height: '35%',
      fontSize: '11px',
      padding: '2px',
      lineHeight: 'normal'
    }
  }

  sendChat(e){
    e.preventDefault();
    //socket.emit('create:message', {content: this.state.currMessage, user_id: 1, group_id: 1} );m platform with both dual and quad core (35W and 65W options) available to consumers along with the
    axios.post(rootPath+'messages', {content: this.state.currMessage, user_id: this.props.user.user_id, group_id: 1} )//window.location.protocol + "://" + window.location.host + "/" + window.location.pathname
    // this.props.dispatch(this.state.currMessage);
    this.setState({currMessage: ''});
  }

  handleChatChange(e){
    e.preventDefault();
    this.setState({currMessage: e.target.value});
  }


  render(){
    return (
      <div style={this.sendChatComponent}>
        <form action="submit" onSubmit={this.sendChat} style={{height: '100%'}}>
          <input type="text" 
                name="msg" 
                placeholder="Send Message" 
                value={this.state.currMessage} 
                onChange={this.handleChatChange} 
                style={this.chatInput}/>
          <button style={this.sendChatBtn} onClick={this.sendChat} >Send</button>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageComponent);