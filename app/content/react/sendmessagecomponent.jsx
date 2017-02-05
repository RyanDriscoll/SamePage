import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import axios from 'axios';
import rootPath from '../../background/httpServer.jsx';


class SendMessageComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currMessage: '',
    }
    this.sendChat = this.sendChat.bind(this);
    this.handleChatChange = this.handleChatChange.bind(this);

    // this.sendChatComponent = {
    //   width: '100%',
    //   textAlign: 'center',
    //   height: '8%',
    //   padding: '5px'
    // }
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
    if(this.state.currMessage.length){
      const groupId = this.props.tabs[this.props.tabs.active].activeGroup
      axios.post(rootPath + 'messages', {
        content: this.state.currMessage,
        user_id: this.props.user.id,
        group_id: groupId
      });
      this.setState({currMessage: ''});
    }
  }

  handleChatChange(e){
    e.preventDefault();
    this.setState({currMessage: e.target.value});
  }


  render(){
    return (
      <div className="send-chat-component">
        <form className="send-chat-form" action="submit" onSubmit={this.sendChat} >
          <input
              className="send-chat-input"
              type="textarea"
              name="msg"
              placeholder="Send Message"
              value={this.state.currMessage}
              onChange={this.handleChatChange}
              // style={this.chatInput}
              />
          <button className="btn-success" onClick={this.sendChat} >Send</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = function(state){
  return {
    user: state.auth,
    active: state.active,
    tabs: state.tabs
  }
}

const mapDispatchToProps = function(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageComponent);