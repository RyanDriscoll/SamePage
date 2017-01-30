import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router';


const Signup = (props) => {

  return (
    <div>
      <form onSubmit={evt => {
        evt.preventDefault()
        props.signup(evt.target.email.value, evt.target.username.value, evt.target.password.value)
      } }>
        <input name="email" placeholder="email" />
        <input name="username" placeholder="username" />
        <input name="password" placeholder="password" type="password" />
        <Link to="/landing">
          <input type="submit" value="Sign up" />
        </Link>
      </form>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (email, username, password) => {
      dispatch({
        type: 'SEND_SIGNUP_REQUEST',
        email,
        username,
        password
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
