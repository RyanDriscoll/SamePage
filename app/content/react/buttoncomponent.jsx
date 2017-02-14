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
    // this.animateButtonOut = this.animateButtonOut.bind(this);
    // this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
  }

  componentDidMount(){
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'displayChatboxFalse') { 
        if (this.state.displayChat) {
          TweenLite.to(this.button, 1.5, {height: 100, width: 100, borderRadius: '50%', ease: Elastic.easeOut});
          TweenLite.to(this.img, 1.5, {height: 60, width: 60, ease: Elastic.easeOut});
        }
        this.setState( {displayChat: false} )
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) this.animateButtonIn();
    else this.animateButtonOut();
    // if (nextProps.user) {
    //   this.animateButtonIn();
    // }
    // if (!nextProps.user) {
    //   this.animateButtonOut();
    // }
  }

  animateButtonIn() {
    TweenLite.to(this.button, 1.5, {y: -155, ease: Elastic.easeOut});
  }

  animateButtonOut() {
    TweenLite.to(this.button, 1.5, {y: 155, ease: Power1.easeOut})
  }

  handleMouseEnter() {
    document.body.style.overflow = 'hidden';
    // TweenLite.to(this.mainComponent, 0.2, {opacity: 1});
  }

  handleMouseLeave() {
    document.body.style.overflow = 'scroll';
    // TweenLite.to(this.mainComponent, 0.2, {opacity: 0.8});

  }

  // joinRoom(userId){chrome.runtime.sendMessage({type: 'joinRoom', user: userId}, null)} //need user?
  joinRoom(){chrome.runtime.sendMessage({type: 'joinRoom'}, null)}

  toggleChatDisplay(e){
    e.preventDefault();
    if (!this.state.displayChat) {
      TweenLite.to(this.button,1.5, {height:50, width:75, ease: Elastic.easeOut, borderRadius: 3});
      TweenLite.to(this.img , 1.5 , {height:30, width:30, ease: Elastic.easeOut});
      this.joinRoom(this.props.user.id)
    } else {
      TweenLite.to(this.button,1.5, {height:100, width:100, ease: Elastic.easeOut, borderRadius:'50%'});
      TweenLite.to(this.img , 1.5 , {height: 60, width: 60, ease: Elastic.easeOut});
    }
    // chrome.runtime.sendMessage({type: 'joinRoom', user: this.props.user.id}, null)


    this.setState( {displayChat: !this.state.displayChat} );

  }


  render(){
    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref={el => {this.mainComponent = el;}}>
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

// const mapStateToProps = function(state){
//   return {
//     user: state.auth
//   }
// }

export default connect(({auth})=>({user: auth}))(ButtonComponent);