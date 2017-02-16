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
      typers: []
    }
    this.sendChat = this.sendChat.bind(this);
    this.handleChatChange = this.handleChatChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);

    this.displayTypers = this.displayTypers.bind(this);
  }

  componentDidMount(){
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'typing') {
        this.setState({typers: [...this.state.typers, request.username]})
      }else if (request.action === 'doneTyping') {
        this.setState({typers: this.state.typers.filter(typer => typer != request.username)})
      }
    });
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
      console.log("ppppppppppP", groupId)
      this.setState({currMessage: ''});
      chrome.runtime.sendMessage({type: 'doneTyping', groupId});
    }
    this.textarea.focus();
  }

  handleChatChange(e){
    e.preventDefault();
    //if state from '' to * emit typing else if from * to '' emit doneTyping
    let groupId = this.props.tabs[this.props.tabs.active].activeGroup;
    if(this.state.currMessage =='' && e.target.value !='') {
      chrome.runtime.sendMessage({type: 'typing', groupId});
    }else if(this.state.currMessage !='' && e.target.value ==''){
      chrome.runtime.sendMessage({type: 'doneTyping', groupId});
    }
    this.setState({currMessage: e.target.value});
  }

  handleEnter(e){
    if (e.keyCode === 13) this.sendChat(e)
  }

  displayTypers(){
    let len = this.state.typers.length;
    switch (len){
      case 0:
        return '';
      case 1:
        return `${this.state.typers[0]} is typing...`;
      case 2:
        return `${this.state.typers[0]} and ${this.state.typers[1]} are typing...`;
      case 3:
        return `${this.state.typers[0]}, ${this.state.typers[1]}, and ${this.state.typers[2]} are typing...`;
      default:
        return `${this.state.typers[0]}, ${this.state.typers[1]}, ${this.state.typers[2]}, and ${len -3} other${len==4 ? '' : s} are typing...`;
    }
  }


  render(){
    return (
      <div className="send-chat-container">

        <form className="send-chat-form" id="send-chat" action="submit" onSubmit={this.sendChat} >
          <textarea
              ref={el => {this.textarea = el;}}
              rows="2"
              className="send-chat-textarea shadow"
              type="textarea"
              name="msg"
              placeholder="Send Message"
              value={this.state.currMessage}
              onChange={this.handleChatChange}
              form="send-chat"
              onKeyDown={this.handleEnter}
              />
          <div className="typers">
            {this.displayTypers()}
          </div>
          <button
            type="submit"
            className="btn-success shadow">
            Send
          </button>
        </form>
      </div>
    )
  }
}

export default connect(({tabs, auth})=>({tabs, user: auth}))(SendMessageComponent);