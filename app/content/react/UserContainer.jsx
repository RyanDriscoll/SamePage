import React, { Component } from 'react';
import {connect} from 'react-redux';
import User from './User.jsx';

class UserContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }

    this.userContainerBox = {
      width: '97%',
      height: '33%',
      backgroundColor: '#a1c4fc',
      border: '1px solid grey',
      borderRadius: '3px',
      overflow: 'scroll',
      margin: '5px auto 0px auto',
    }

  }

  render(){
    return (   
      <div style={this.userContainerBox}>
        {
          this.props.users.map(user => {
            return (
              <div key={user.user_id} >
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
