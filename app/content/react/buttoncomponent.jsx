import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import ChatContainer from './ChatContainer.jsx';
import ReactDOM from 'react-dom';
import rootPath from './httpServer';
const findDOMNode = ReactDOM.findDOMNode;

class ButtonComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      displayChat: false
    }
    this.toggleChatDisplay = this.toggleChatDisplay.bind(this);
    this.animateButton = this.animateButton.bind(this);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.animateButton();
    }
  }

  animateButton() {
    TweenLite.to(this.button, 1.5, {top: '95vh', left: '95vw', height: 100, width:    100, ease: Power2.easeOut});
    TweenLite.to(this.img, 1.5, {x: -25, y: -20, height: 25, width: 25});
  }

  toggleChatDisplay(e){
    e.preventDefault();

    chrome.runtime.sendMessage({type: 'joinRoom', user: this.props.user.id}, null)

    this.setState({displayChat: !this.state.displayChat});

  }


  render(){
    console.log("button state", this.state)
    return (
      <div className="cleanslate">
        <ChatContainer mounted={this.state.displayChat} />
          <button ref={el => {this.button = el;}}
            // style={this.state.displayChat ?
            //   this.chatButtonRaktClicked
            //   :
            //   this.chatButtonRaktUnclicked}
            className="chat-button"
            onClick={this.toggleChatDisplay}>
            <img
              className="button-img"
              src={`${rootPath}messagebubble.png`}
              ref={el => {this.img = el;}}
              />
          </button>
      </div>
    )
  }
}

        // }
        //   this.state.displayChat ?
        //     <ChatContainer animation={this.state.animate ? 'chatBoxx-rakt-in' : 'chatBoxx-rakt-out'}/>
        //     :
        //     null
        // }

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