import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import MessageContainer from './messagecontainer.jsx';
import UserContainer from './UserContainer.jsx';
import SendMessageComponent from './sendmessagecomponent.jsx';
import rootPath from './httpServer.js';
import CirclesContainer from './circlescontainer.jsx';



class ChatContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      style: {
        right: this.props.mounted ? '0' : '-260px',
        transition: 'all 0.5s cubic-bezier(0.39, 0.575, 0.565, 1)'
      }
          };
    this.nameToColor = this.nameToColor.bind(this)
  }


  componentDidMount(){ // on the button instead??
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'rerender') {
        this.props.joinRoomMessage()//(this.props.user.id)
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mounted) {
      this.setState({
        style: {
          right: '0',
          transition: 'all 0.5s cubic-bezier(0.39, 0.575, 0.565, 1)'
        }
      });
      // TweenLite.to(this.el, 0.5, {x: -260, ease: Bounce.easeOut})
    } else {
      this.setState({
        style: {
          right: '-260px',
          transition: 'all 0.5s cubic-bezier(0.39, 0.575, 0.565, 1)'
        }
      });
      // TweenLite.to(this.el, 0.3, {x: 0, ease: Power1.easeIn})
    }
  }

  nameToColor(name){
    let total = 0;
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#558b2f', '#ef6c00', '#ff5722', '#795548']
    for (let i = 0; i < name.length; i++) {
      total += name.charCodeAt(i);
    }
    return colors[total % colors.length];
  }

  render(){
    return (

      <div>
        {
          this.props.user ?
            <div
              ref={(el) => this.el = el}
              className="chat-container shadow"
              style={this.state.style}
              >

              <UserContainer nameToColor={this.nameToColor} store={this.props.store} />
              {/*<CirclesContainer store={this.props.store} />*/}
              <MessageContainer nameToColor={this.nameToColor} store={this.props.store} />
              <SendMessageComponent store={this.props.store}/>
            </div>
            :
            null
        }
      </div>
    );
  }
}

// const mapStateToP

export default connect(({auth})=>({user: auth}))(ChatContainer);
