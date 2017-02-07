import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import MessageContainer from './messagecontainer.jsx';
import UserContainer from './UserContainer.jsx';
import SendMessageComponent from './sendmessagecomponent.jsx';


class ChatContainer extends React.Component{
  constructor(props){
    super(props);

    this.stopScroll = this.stopScroll.bind(this);
    this.startScroll = this.startScroll.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mounted) {
      // TweenLite.to(this.el, 0.5, {x: -260, ease: Bounce.easeOut})
    } else {
      // TweenLite.to(this.el, 0.3, {x: 0, ease: Power1.easeIn})
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
              ref={(el) => this.el = el}
              className="chat-container"
              style={{
                right: this.props.mounted ? '0' : '-260px',
                transition: 'all 0.5s cubic-bezier(0,.26,.84,1.52)'
              }}
              onMouseEnter={this.stopScroll}
              onMouseLeave={this.startScroll}>
              <UserContainer store={this.props.store} />
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
