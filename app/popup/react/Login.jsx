import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const Login = (props) => {
  const loginBtnStyle = {
    backgroundColor: 'green',
    borderRadius: '3px',
    color: 'white',
    border: '1px solid black',
    width: '80%',
    marginTop: '10px',
    marginBottom: '5px'
  }
  const logoutBtnStyle = {
    backgroundColor: 'red',
    borderRadius: '3px',
    color: 'white',
    border: '1px solid black',
    width: '150px',
  }
  const inputFieldStyle = {
    marginTop: '5px',
    width: '200px',
    height: '2em'
  }
  const welcomeStyle = {
    color: 'white',
    width: '95%',
    textDecoration: 'underline',
    margin: '5px auto 5px auto',
    fontSize: '1.5em'
  }

  return (
    <div style={{textAlign: 'center'}}>
    {
      !props.auth ? (
        <div>
          <div style={welcomeStyle} >Welcome to RAKT Chat</div>
          <form onSubmit={evt => {
            evt.preventDefault()
            props.login(evt.target.email.value, evt.target.password.value)
          } }>
            <input name="email" placeholder="email" style={inputFieldStyle}/>
            <input name="password" type="password" placeholder="password" style={inputFieldStyle}/>
            <input type="submit" value="Login" style={loginBtnStyle}/>
          </form>
          <Link to='/signup'>
            <p>No account? Sign up here!</p>
          </Link>
        </div>
      )
      :
      (
        <button style={logoutBtnStyle} onClick={props.logout}>Logout</button>
      )
    }
    </div>
  );
}


const mapStateToProps = (state) => {
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
