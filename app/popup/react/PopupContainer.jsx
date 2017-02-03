import React, {Component} from 'react';
import {connect} from 'react-redux';
import Login from './Login.jsx';

class PopupContainer extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    return (
      <div>
        <Login {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      console.log(email, password)
      dispatch({
        type: 'SEND_LOGIN_REQUEST',
        email,
        password,
      });
    },
    logout: () => {
      dispatch({
        type: 'SEND_LOGOUT_REQUEST'
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupContainer);