import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {TweenLite} from 'gsap';
import MessageContainer from './messagecontainer.jsx';
import UserContainer from './UserContainer.jsx';
import SendMessageComponent from './sendmessagecomponent.jsx';
const findDOMNode = ReactDOM.findDOMNode;



class ChatContainer extends React.Component{
  constructor(props){
    super(props);

    this.stopScroll = this.stopScroll.bind(this);
    this.startScroll = this.startScroll.bind(this);
  }

  componentDidMount(){
    this.el = findDOMNode(this);
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if(request.action === 'rerender') {
        this.props.joinRoomMessage(this.props.user.id)
      }
    });
    //
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mounted) {
      TweenLite.to(this.el, 0.5, {x: -260, ease: Bounce.easeOut})
    } else {
      TweenLite.to(this.el, 0.3, {x: 0, ease: Power1.easeIn})
    }
  }

  stopScroll() {
    document.body.style.overflow = 'hidden';
  }

  startScroll() {
    document.body.style.overflow = 'scroll';
  }

  render(){
    return (

      <div>
        {
          this.props.user ?
            <div
              className="chat-container"
              onMouseEnter={this.stopScroll}
              onMouseLeave={this.startScroll}>
              <UserContainer />
              <MessageContainer />
              <SendMessageComponent />
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
