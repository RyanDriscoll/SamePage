import React, { Component } from 'react';
import {connect} from 'react-redux';
import User from './User.jsx';

class UserContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users: [{username: 'coolguy85'}, {username: '6969696969'}, {username: 'av969696969'}]
    }

  }

  render(){
    console.log("testing user: ", this.props.users[0])
    return (   
      <div className="user-container-box">
        {
          this.props.users.map(user => { //state
            return (
              <div key={user.id} >
                <User username={user.user.username} />
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
