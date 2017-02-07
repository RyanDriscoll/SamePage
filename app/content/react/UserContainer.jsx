import React, { Component } from 'react';
import {connect} from 'react-redux';
import User from './User.jsx';
import rootPath from './httpServer.js';

class UserContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentWillMount(){

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
      <div className="user-container">
        <div>
          <img
            src={`${rootPath}user-icon.png`}
            style={{height: '30px'}} />
        </div>
        {
          group && this.props.users && userIds.map(id => {
            return (
              <div key={id} >
                <User username={this.props.users[id].username} />
              </div>
            );
          })
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
