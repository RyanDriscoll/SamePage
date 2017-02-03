import React, { Component } from 'react';
import {connect} from 'react-redux';
import User from './User.jsx';

class UserContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    };

    this.userContainerBox = {
      width: '97%',
      height: '33%',
      backgroundColor: '#a1c4fc',
      border: '1px solid grey',
      borderRadius: '3px',
      overflow: 'scroll',
      margin: '5px auto 0px auto',
    };

  }

  componentWillMount(){

  }

  render(){
    const tabs = this.props.tabs;
    let activeGroup = Object.keys(tabs[tabs.active]);
    if (!activeGroup.length) activeGroup = '-1';
    else activeGroup = activeGroup[0];
    const group = tabs[tabs.active][activeGroup];
    const userIds = group.users;
    console.log("-----users", this.props.users)
    return (
      <div style={this.userContainerBox}>
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
