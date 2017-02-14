import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import rootPath from './httpServer';


class Signup extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    }
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleUserSubmit(e){
    e.preventDefault();
    this.props.signup(this.state.email, this.state.username, this.state.password);
    this.setState({email: '', username: '', password: ''});
    window.close();
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    return (
      <div style={stylesheet.popupStyle}>
        <div style={stylesheet.welcomeStyle} >
          <img
            className="title-button-img"
            style={{height: '40px', width: '40px', paddingLeft: '3px'}}
            src={`${rootPath}messagebubble.png`}
          />
          <div>SamePage</div>
        </div>
        <form onSubmit={this.handleUserSubmit}>
          <input
            style={stylesheet.inputFieldStyle}
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}/>
          <input
            style={stylesheet.inputFieldStyle}
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}/>
          <input
            style={stylesheet.inputFieldStyle}
            name="password"
            placeholder="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}/>
          <button
            style={stylesheet.btnStyle}
            type="submit"
            onClick={this.handleUserSubmit}>Sign Up</button>
        </form>
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
