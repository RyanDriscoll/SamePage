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

  //component will receive props?
  componentWillReceiveProps() {
    this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
  }


  // shouldComponentUpdate(nextProps) {
  //   const propsMessagesLength = Object.keys(this.props.messages).length;
  //   const nextPropsMessagesLength = Object.keys(nextProps.messages).length;

  //   // if (this.props.tabs.messages.length !== nextProps.tabs.messages.length && Object.keys(this.props.messages).length === Object.keys(nextProps.messages).length) {
  //   //   console.log('in shouldComponentUpdate', this.props, nextProps)
  //   //   return false;
  //   // }
  //   if (propsMessagesLength === nextPropsMessagesLength) {
  //     return false;
  //   }
  //   return true;
  // }




  render(){
    const tabs = this.props.tabs;
    // let activeGroup = Object.keys(tabs[tabs.active]);
    // if (!activeGroup.length) activeGroup = '-1';
    // else activeGroup = activeGroup[0];
    const activeGroupId = tabs[tabs.active].activeGroup
    const group = tabs[tabs.active][activeGroupId]
    const messages = this.props.messages //.map(message => message.groupId === group.id);
    let messageIds = [];
    if (group) {
      messageIds = group.messages.sort((a, b) => {
        return a - b;
      });
    }
    const users = this.props.users;
    return (
      <div
        className="message-container"
        ref={el => {this.messageContainer = el;}}>
        {
          group && messageIds.map(id => {
            return (
              <div key={id}>
                <MessageComponent
                  content={messages[id].content}
                  sender={users[messages[id].user_id].username}
                  time={messages[id].created_at}
                  messageOwner={this.props.user.id === users[messages[id].user_id].id} />
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

const mapDispatchToProps = function(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
