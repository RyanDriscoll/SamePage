import React, { Component } from 'react';
import {connect} from 'react-redux';
import User from './User';

class UserContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users: [{username: 'coolguy85'}, {username: '6969696969'}, {username: 'av969696969'}]
    }

  }

  render(){
    return (
      <div className="user-container-box">
        {
          this.state.users.sort((a, b)=> a.username.localeCompare(b.username)).map(user => { //state
            return <User key={user.id} username={user.username} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
