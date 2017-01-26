import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import ReactTransitionGroup from 'react-addons-transition-group';
import MessageContainer from './messagecontainer.jsx';
import SendMessageComponent from './sendmessagecomponent.jsx';


class ChatContainer extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {
    // console.log('is this being called did mount?')
    // this.self = findDOMNode(this);
    // TweenLite.fromTo(this.self, 0.3, {
    //   opacity: 0
    // }, {
    //   opacity: 1
    // });
  }



  render(){
    return (
        <div className="chatBoxx-rakt">
          <MessageContainer />
          <SendMessageComponent />
        </div>
    );
  }
}

// function FirstChild(props) {
//   const childrenArray = React.Children.toArray(props.children);
//   return childrenArray[0] || null;
// }

export default ChatContainer;
