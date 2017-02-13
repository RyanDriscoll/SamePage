import React, { Component } from 'react';
import {connect} from 'react-redux';
import User from './User.jsx';
import rootPath from './httpServer.js';
import CircleContainer from './circlescontainer.jsx'


class UserContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }



  render(){
    const tabs = this.props.tabs;
    // let activeGroup = Object.keys(tabs[tabs.active]);
    // if (!activeGroup.length) activeGroup = '-1';
    // else activeGroup = activeGroup[0];
    const activeGroupId = tabs[tabs.active].activeGroup
    const group = tabs[tabs.active][activeGroupId];

    return (
      <div className="user-container shadow">
        <div
          className="title">
          <img
          className="title-button-img"
          style={{
            height: '40px',
            width: '40px'
          }}
          src={`${rootPath}messagebubble.png`}
          />
          SamePage
        </div>
        <CircleContainer
          store={this.props.store}
          group={group}
          />

      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    tabs: state.tabs
  };
}

const mapDispatchToProps = function(dispatch){
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
