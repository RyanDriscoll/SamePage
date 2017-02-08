import React, { Component } from 'react';
import {connect} from 'react-redux';
import User from './User.jsx';
import rootPath from './httpServer.js';
import {TweenLite} from 'gsap';


class UserContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed: true,
      numUsers: 0
    };
    this.handleUserContainerClick = this.handleUserContainerClick.bind(this);
  }

  handleUserContainerClick(e){
    e.preventDefault();
    if (this.state.collapsed) {
      TweenLite.to(this.collapsedContainer, 0.3, {maxHeight: 215, ease: Power1.easeOut});
    } else {
      TweenLite.to(this.collapsedContainer, 0.3, {maxHeight: 0, ease: Power1.easeOut});
    }
    this.setState({collapsed: !this.state.collapsed})
  }

  render(){
    const tabs = this.props.tabs;
    // let activeGroup = Object.keys(tabs[tabs.active]);
    // if (!activeGroup.length) activeGroup = '-1';
    // else activeGroup = activeGroup[0];
    const activeGroupId = tabs[tabs.active].activeGroup
    const group = tabs[tabs.active][activeGroupId];
    let userIds =[];
    if (group) {
      userIds = group.users;
    }
    return (
      <div
        className="user-container shadow"
        onClick={this.handleUserContainerClick}>
        <div
          className="title">
          <img
          className="button-img"
          style={{
            height: '40px',
            width: '40px'
          }}
          src={`${rootPath}messagebubble.png`}
          />
          SamePage
          <div
            className="user-icon-container">
            <img
              src={`${rootPath}user-icon.png`}
              className="user-icon-in-user-container" />
            <div className="number-of-users-icon">
              {
                group ?
                  group.users.length
                  :
                  '1'
              }
            </div>
          </div>
        </div>
        {
          <div
            className="user-container-collapsed"
            ref={el => {this.collapsedContainer = el;}}>
            {
            //   this.state.collapsed ?
            //     null
            //   :
                group && this.props.users && userIds.map(id => {
                  return (
                    <div key={id} >
                      <User username={this.props.users[id].username} />
                    </div>
                  );
                })
            }
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    users: state.users,
    tabs: state.tabs
  };
}

const mapDispatchToProps = function(dispatch){
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
