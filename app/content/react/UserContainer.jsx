import React, { Component } from 'react';
import {connect} from 'react-redux';
import User from './User';

class UserContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }

  }

  render(){
    return (
      <div className="user-container-box">
        {
          this.props.users.sort((a, b)=> a.username.localeCompare(b.username)).map(user => {
            return (
              <div key={user.user_id}>
                <User  username={user.username} />
              </div>
            )
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
