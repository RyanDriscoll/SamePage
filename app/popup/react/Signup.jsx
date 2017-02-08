import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router';


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
      <div>
        <form onSubmit={this.handleUserSubmit}>
          <input name="email" placeholder="email" value={this.state.email} onChange={this.handleChange}/>
          <input name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/>
          <input name="password" placeholder="password" type="password" value={this.state.password} onChange={this.handleChange}/>
          <button type="submit" onClick={this.handleUserSubmit}>Sign Up</button>
        </form>
      </div>
    );
  }
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
