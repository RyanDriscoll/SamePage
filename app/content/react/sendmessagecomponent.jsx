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

    console.log("sending props", this.props)
    //send active tab to background
    const groupId = Object.keys(this.props.tabs[this.props.active].groups)[0];
    axios.post(rootPath + 'messages', {
      content: this.state.currMessage,
      user_id: this.props.user.id,
      group_id: groupId
    });
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