import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import ReactDOM from 'react-dom';
import MessageComponent from './messagecomponent.jsx';



class MessageContainer extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
  }

  componentDidUpdate() {

    // conditionally set scroll height if new message comes in
    this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
  }

  componentWillReceiveProps() {
    this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
  }

  render(){
    const tabs = this.props.tabs;
    const activeGroupId = tabs[tabs.active].activeGroup
    const group = tabs[tabs.active][activeGroupId]
    const messages = this.props.messages //.map(message => message.groupId === group.id);
    let messageIds = group ? group.messages.sort((a, b) => a - b) : [];
    const users = this.props.users;
    return (
      <div
        className="message-container"
        ref={el => {this.messageContainer = el;}}>
        {
          group && users && messages && messageIds.map(id => {
            return users[messages[id].user_id] && (
              <div key={id}>
                <MessageComponent
                  content={messages[id].content}
                  sender={users[messages[id].user_id].username}
                  time={messages[id].created_at}
                  messageOwner={this.props.user.id == messages[id].user_id}
                  nameToColor={this.props.nameToColor} 
                />
              </div>
            );
          })
        }
      </div>
    )
  }
}

const mapStateToProps = function(state){
  return {
    messages: state.messages,
    user: state.auth,
    users: state.users,
    tabs: state.tabs
  }
}

export default connect(mapStateToProps)(MessageContainer);
