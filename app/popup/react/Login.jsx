import React from 'react';
import {Link, hashHistory} from 'react-router';
import {connect} from 'react-redux';
import rootPath from './httpServer';

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
    setTimeout(() => {
      let count = this.state.loginAttempts;
      count++;
      this.setState({loginAttempts: count});
    }, 1000);
  }
  handleLogout() {
    this.setState({loginAttempts: 0});
    chrome.runtime.sendMessage({type: 'logout'});
    this.props.logout();
  }
  // componentDidUpdate(nextProps) {
  //   if (!this.props.auth && nextProps.auth) {
  //     setTimeout(() => {
  //       window.close();
  //     }, 1500);
  //   }
  // }
  componentWillUpdate(nextProps) {
    // console.log('componentWillUpdate nextProps', nextProps);
  }
  renderLogin() {
    return (
      <div>
        <div style={stylesheet.welcomeStyle} >
          <img
            className="title-button-img"
            style={{height: '40px', width: '40px', paddingLeft: '3px'}}
            src={`${rootPath}messagebubble.png`}
          />
          <div>SamePage</div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input name="email" placeholder="email" style={stylesheet.inputFieldStyle}/>
          <input name="password" type="password" placeholder="password" style={stylesheet.inputFieldStyle}/>
          <input
            type="submit"
            value="Login"
            style={stylesheet.btnStyle}/>
        </form>
        <div style={stylesheet.signup}>
          <Link
            to='/signup'
            style={{textDecoration: 'none'}}>
            <p>No account? Sign up here!</p>
          </Link>
        </div>
        {
          this.state.loginAttempts > 0 && !this.props.auth ? <div style={stylesheet.loginFail}>Login unsuccessful, please try again</div> : <div />
        }
      </div>
    )
  }
  renderLogout() {
    return (
      <div>
        <div style={stylesheet.welcomeStyle} >
            <img
              className="title-button-img"
              style={{height: '40px', width: '40px', paddingLeft: '3px'}}
              src={`${rootPath}messagebubble.png`}
            />
            <div>SamePage</div>
          </div>
        <button
          style={stylesheet.btnStyle}
          onClick={this.handleLogout}>
          Logout
        </button>
      </div>
    );
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
  btnStyle: {
    color: '#fff',
    fontSize: '20px',
    backgroundColor: '#5cb85c',
    border: 'none',
    height: '35px',
    width: '75px',
    borderRadius: '3px',
    margin: '20px auto',
    outline: 'none',
    cursor: 'pointer',
    display: 'block',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
  },
  inputFieldStyle: {
    width: '150px',
    height: '25px',
    fontSize: '14px',
    padding: '5px',
    boxSizing: 'border-box',
    display: 'block',
    borderRadius: '3px',
    border: 'none',
    outline: 'none',
    margin: '10px auto',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
  },
  loginFail: {
    height: '25px',
    background: 'red',
    color: 'white',
    fontSize: '12px',
    padding: '5px',
    boxSizing: 'border-box',
    display: 'block',
    borderRadius: '3px',
    border: 'none',
    outline: 'none',
    margin: 'auto',
    position: 'absolute',
    bottom: '11px',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
  },
  welcomeStyle: {
    background: 'white',
    fontSize: '28px',
    borderRadius: '3px',
    border: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '5px',
    margin: '10px',
    alignItems: 'center',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
  },
  signup: {
    margin: 'auto',
    textAlign: 'center'
  },
  popupStyle: {
    fontFamily: 'Helvetica Neue',
    background: '#e2e1e0',
    width: '250px',
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
