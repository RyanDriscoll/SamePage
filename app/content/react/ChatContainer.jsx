import React, { Component } from 'react';
import {connect} from 'react-redux';
import MessageContainer from './messagecontainer.jsx';
import UserContainer from './UserContainer.jsx';
import SendMessageComponent from './sendmessagecomponent.jsx';


class ChatContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      show: false,
      style: {
        opacity: 0,
        position: 'fixed',
        top: '0vh',
        right: '-300px',
        zIndex: 9999,
        background: 'white',
        height: '100vh',
        width: 250,
        boxShadow: '-10px 10px 30px black',
        transition: 'all 2s ease',
      }
    }
    this.stopScroll = this.stopScroll.bind(this);
    this.startScroll = this.startScroll.bind(this);
    this.transitionEnd = this.transitionEnd.bind(this)
    this.mountStyle = this.mountStyle.bind(this)
    this.unMountStyle = this.unMountStyle.bind(this)
  }

  componentDidMount(){
    // animate using TweenMax
    setTimeout(this.mountStyle, 10);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.mounted) {
      return this.unMountStyle();
    }
    this.setState({
      show: true
    })
    // animate in using TweenMax
    setTimeout(this.mountStyle, 10)
  }

  unMountStyle() {
    const newStyle = Object.assign({}, this.state.style, {
      right: '-300px',
      opacity: 0,
      transition: 'all 0.5s ease',
    });
    this.setState({
      style: newStyle
    });
  }

  mountStyle() {
    const newStyle = Object.assign({}, this.state.style, {
      right: '0px',
      opacity: 1,
      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    });
    this.setState({
      style: newStyle
    });
  }

  transitionEnd(){
    if (!this.props.mounted){
      this.setState({
        show: false
      });
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
          this.state.show && this.props.user ?
            <div
              style={this.state.style}
              onTransitionEnd={this.transitionEnd}
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
