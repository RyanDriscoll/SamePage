import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';

class User extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userColor: '',
      colors: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#558b2f', '#ef6c00', '#ff5722', '#795548']
    };
    // this.hashUsernameToColorsIndex = this.hashUsernameToColorsIndex.bind(this);
  }

  componentWillMount() {
    this.setState( {userColor: this.props.nameToColor(this.props.username)} );
  }

  // hashUsernameToColorsIndex(username){
  //   let total = 0;
  //   for (let i = 0; i < username.length; i++) {
  //     total += username.charCodeAt(i);
  //   }
  //   return total % this.state.colors.length;
  // }


  render(){
    const color = this.state.userColor;
    return (
      <div
        className="user-component"
        style={{backgroundColor: color}}>
        <div>{this.props.username}</div>
      </div>
    )
  }
}


export default User;