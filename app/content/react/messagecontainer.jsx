import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import MessageComponent from './messagecomponent.jsx';


class MessageContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }

    this.messageContainerBox = {
      width: '97%',
      height: '57%',
      backgroundColor: 'lightgrey',
      border: '1px solid grey',
      borderRadius: '3px',
      overflow: 'scroll',
      margin: '5px auto 0px auto',
    }

  }

  // shouldComponentUpdate(nextProps) {
  //   const tabsMessages = this.props.tabs[this.props.tabs.active]
  //     console.log('in shouldComponentUpdate', this.props, nextProps)

  //   if (this.props.tabs.messages.length !== nextProps.tabs.messages.length && Object.keys(this.props.messages).length === Object.keys(nextProps.messages).length) {
  //     console.log('in shouldComponentUpdate', this.props, nextProps)
  //     return false;
  //   }
  //   return true;
  // }


  render(){
    const tabs = this.props.tabs;
    let activeGroup = Object.keys(tabs[tabs.active]);
    if (!activeGroup.length) activeGroup = '-1';
    else activeGroup = activeGroup[0];
    const group = tabs[tabs.active][activeGroup]
    const messages = this.props.messages //.map(message => message.groupId === group.id);
    let messageIds = [];
    if (group) {
      messageIds = group.messages;
    }
    const users = this.props.users;
    console.log("-----messages", this.props, group, tabs, "messages", messages)
    return (
      <div style={this.messageContainerBox}>
        {
          group && messageIds.map(id => {
            {console.log('inside message render', id, messages[id].content)}
            return (
              <div key={id}>
                <MessageComponent content={messages[id].content}
                                  sender={users[messages[id].user_id].username}
                                  time={messages[id].created_at}
                                  messageOwner={this.props.user.id === users[messages[id].user_id].id}/>
              </div>
            )
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

const mapDispatchToProps = function(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
