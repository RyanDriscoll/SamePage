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
    const activeGroupId = tabs[tabs.active].activeGroup
    const group = tabs[tabs.active][activeGroupId];

    return (
      <div className="user-container shadow">

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
