import React, { Component } from 'react';
import {connect} from 'react-redux';
import User from './User';

class UserContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users: [{username: 'coolguy85'}, {username: '6969696969'}]
    }

  }

  render(){
    return (
      <div >
        {
          this.state.users.map(user => {
            return <User username={user.username} />;
          })
        }
      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    users: state.users
  }
}

const mapDispatchToProps = function(dispatch){
  return {
  }
}

export default UserContainer;
