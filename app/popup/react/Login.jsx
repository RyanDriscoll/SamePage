import React from 'react'
import {login} from '../../background/auth.jsx'
import {connect} from 'react-redux'

console.dir(login)

const Login = (props) => {
    console.log('%%%%%%%%%',props)

  return (
    <form onSubmit={evt => {
      evt.preventDefault()
      console.log('^^^^^^^^^^', evt.target.username.value, evt.target.password.value)
      props.login(evt.target.username.value, evt.target.password.value)
    } }>
      <input name="username" />
      <input name="password" type="password" />
      <input type="submit" value="Login" />
    </form>
  )
}
const mapStateToProps = (state) => {
  return {
    bar: 'foo'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => {
      dispatch({
        type: 'SEND_LOGIN_REQUEST',
        username,
        password,
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
