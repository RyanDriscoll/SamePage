import React from 'react'
import {login, logout} from '../../background/auth.jsx'
import store from '../../background/store.js'
import {connect} from 'react-redux'

const Login = (props) => {

  return (
    <div>
    {
      !props.auth ? (
        <form onSubmit={evt => {
          evt.preventDefault()
          props.login(evt.target.email.value, evt.target.password.value)
        } }>
          <input name="email" />
          <input name="password" type="password" />
          <input type="submit" value="Login" />
        </form>
      ) : (
        <button onClick={props.logout}>Logout</button>
      )
    }
    </div>
  );
}


const mapStateToProps = (state) => {
  console.log('mstp state', state)
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
