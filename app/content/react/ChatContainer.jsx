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
  }


  componentDidMount(){
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'rerender') {
        this.props.joinRoomMessage(this.props.user.id)
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

              <UserContainer store={this.props.store} />
              {/*<CirclesContainer store={this.props.store} />*/}
              <MessageContainer store={this.props.store} />
              <SendMessageComponent store={this.props.store} />
            </div>
            :
            null
        }
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
