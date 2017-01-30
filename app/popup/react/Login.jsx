import React from 'react';
import {Link, hashHistory} from 'react-router';
import {connect} from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginAttempts: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.login(evt.target.email.value, evt.target.password.value);
    console.log('in handleSubmit login attempts >', this.state.loginAttempts)
      let count = this.state.loginAttempts;
      count++;
      this.setState({loginAttempts: count});
  }
  handleLogout() {
    this.setState({loginAttempts: 0});
    this.props.logout();
  }
  componentWillReceiveProps(nextProps) {
    // console.log('in componentWillReceiveProps this.props.auth, nextProps.auth', this.props.auth, nextProps.auth)
    // if (!nextProps.auth) {
    // }
  }
  componentWillUpdate(nextProps) {
    // console.log('componentWillUpdate nextProps', nextProps);
  }
  renderLogin() {
    return (
      <div>
        <div style={stylesheet.welcomeStyle} >Welcome to RAKT Chat</div>
        <form onSubmit={this.handleSubmit}>
          <input name="email" placeholder="email" style={stylesheet.inputFieldStyle}/>
          <input name="password" type="password" placeholder="password" style={stylesheet.inputFieldStyle}/>
          <input type="submit" value="Login" style={stylesheet.loginBtnStyle}/>
        </form>
        <Link to='/signup'>
          <p>No account? Sign up here!</p>
        </Link>
        {
          this.state.loginAttempts > 0 && !this.props.auth ? <div>Login unsuccessful, please try again</div> : <div />
        }
      </div>
    )
  }
  renderLogout() {
    return <button style={stylesheet.logoutBtnStyle} onClick={this.handleLogout}>Logout</button>
  }
  render() {
    return (
      <div style={stylesheet.popupStyle}>
      {
        !this.props.auth ? this.renderLogin() : this.renderLogout()
      }
      </div>
    );
  }
}
const stylesheet = {
  loginBtnStyle: {
    backgroundColor: 'green',
    borderRadius: '3px',
    color: 'white',
    border: '1px solid black',
    width: '80%',
    marginTop: '10px',
    marginBottom: '5px'
  },
  logoutBtnStyle: {
    backgroundColor: 'red',
    borderRadius: '3px',
    color: 'white',
    border: '1px solid black',
    width: '150px',
  },
  inputFieldStyle: {
    marginTop: '5px',
    width: '200px',
    height: '2em'
  },
  welcomeStyle: {
    color: 'white',
    width: '95%',
    textDecoration: 'underline',
    margin: '5px auto 5px auto',
    fontSize: '1.5em'
  },
  popupStyle: {
    backgroundColor: '#2c75ea',
    textAlign: 'center',
    padding: '10px',
    borderRadius: '3px',
    border: '1px solid black'
  }
};


// const mapStateToProps = (state) => {
//   console.log('in login mstp', state)
//   return {
//     auth: state.auth
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: (email, password) => {
//       dispatch({
//         type: 'SEND_LOGIN_REQUEST',
//         email,
//         password,
//       });
//     },
//     logout: () => {
//       dispatch({
//         type: 'SEND_LOGOUT_REQUEST'
//       });
//     }
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;
