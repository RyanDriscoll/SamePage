import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import ChatContainer from './ChatContainer.jsx';
import ReactDOM from 'react-dom';
import ShadowDOM from 'react-shadow';
import rootPath from './httpServer';
const findDOMNode = ReactDOM.findDOMNode;

class ButtonComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      displayChat: false
    }
    this.toggleChatDisplay = this.toggleChatDisplay.bind(this);
    this.animateButtonIn = this.animateButtonIn.bind(this);
    this.animateButtonOut = this.animateButtonOut.bind(this);
    this.stopScroll = this.stopScroll.bind(this);
    this.startScroll = this.startScroll.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.animateButtonIn();
    }
    if (!nextProps.user) {
      this.animateButtonOut();
    }
  }

  animateButtonIn() {
    TweenLite.to(this.button, 1.5, {y: -50, ease: Elastic.easeOut});
  }

  animateButtonOut() {
    TweenLite.to(this.button, 1.5, {y: 150, ease: Power1.easeOut})
  }

  stopScroll() {
    console.log('in stopScroll')
    document.body.style.overflow = 'hidden';
  }

  startScroll() {
    console.log('in startScroll')
    document.body.style.overflow = 'scroll';
  }

  joinRoom(userId){chrome.runtime.sendMessage({type: 'joinRoom', user: userId}, null)}

  toggleChatDisplay(e){
    e.preventDefault();
    if (!this.state.displayChat) {
      TweenLite.to(this.button, 1.5, {height: 50, width: 75, borderRadius: 3, ease: Elastic.easeOut});
      TweenLite.to(this.img, 1.5, {height: 30, width: 30, ease: Elastic.easeOut});
      this.joinRoom(this.props.user.id)
    } else {
      TweenLite.to(this.button, 1.5, {height: 100, width: 100, borderRadius: '50%', ease: Elastic.easeOut});
      TweenLite.to(this.img, 1.5, {height: 60, width: 60, ease: Elastic.easeOut});
    }
    // chrome.runtime.sendMessage({type: 'joinRoom', user: this.props.user.id}, null)


    this.setState({displayChat: !this.state.displayChat});

  }


  render(){
    return (
      <div
        onMouseEnter={this.stopScroll}
        onMouseLeave={this.startScroll}>
        <ShadowDOM include={[`${rootPath}style.css`]}>
          <div className="cleanslate">
            <ChatContainer
              store={this.props.store}
              mounted={this.state.displayChat}
              joinRoomMessage={this.joinRoom}
              />
              <button ref={el => {this.button = el;}}
                className="chat-button shadow"
                onClick={this.toggleChatDisplay}>
                <img
                  className="button-img"
                  style={{
                    height: '60px',
                    width: '60px'
                  }}
                  src={`${rootPath}messagebubble.png`}
                  ref={el => {this.img = el;}}
                  />
              </button>
          </div>
        </ShadowDOM>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonComponent);