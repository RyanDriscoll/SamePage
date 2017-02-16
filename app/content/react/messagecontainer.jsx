import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import ReactDOM from 'react-dom';
import MessageComponent from './messagecomponent.jsx';



class MessageContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      localTab: 0
    }
  }

  componentWillMount() {
    this.setState({localTab: this.props.tabs.active})
  }
  
  componentDidMount() {
    this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    console.log("9oooooooooo",this.messageContainer)
  }

  componentDidUpdate() {

    // conditionally set scroll height if new message comes in
    if(this.props.tabs.active==this.state.localTab )
    this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.tabs.active==this.state.localTab)
    this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
  }

  // shouldComponentUpdate(nextProps) {
  //   if ((Object.keys(nextProps.messages).length !== Object.keys(this.props.messages).length) || (this.props.tabs[this.props.tabs.active].activeGroup != nextProps.tabs[nextProps.tabs.active].activeGroup) || (Object.keys(nextProps.users).length !== Object.keys(this.props.users).length)) {
  //     console.log('true', Object.keys(nextProps.messages).length, Object.keys(this.props.messages).length)
  //     console.log('true', this.props.tabs[this.props.tabs.active].activeGroup, nextProps.tabs[nextProps.tabs.active].activeGroup)
  //     return true;
  //   }
  //   console.log('faSlse', Object.keys(nextProps.messages).length, Object.keys(this.props.messages).length)
  //     console.log('false', this.props.tabs[this.props.tabs.active].activeGroup, nextProps.tabs[nextProps.tabs.active].activeGroup)
  //   return false;
  // }

  render(){
    const tabs = this.props.tabs;
    const activeGroupId = tabs[tabs.active].activeGroup
    const group = tabs[tabs.active][activeGroupId]
    const messages = this.props.messages//.map(message => message.groupId === group.id);
    let messageIds = group ? group.messages.sort((a, b) => a - b) : [];
    const users = this.props.users;
    
    console.log("gggggggggggggg",this.props.tabs.active, this.state.localTab)
    return this.props.tabs.active==this.state.localTab && (
      <div
        className="message-container"
        ref={el => {this.messageContainer = el;}}>
        {
          group && users && messages && messageIds.map(id => {
            console.log("ggmmmmm", id, messages)
            return messages[id] && users[messages[id].user_id] && (
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
