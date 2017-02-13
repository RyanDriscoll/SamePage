import React, { Component } from 'react';
import rootPath from './httpServer';

class UserIcon extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      color: '',
      colors: ['#e91e63', '#3f51b5', '#9c27b0', '#673ab7', '#f44336', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#558b2f', '#ef6c00', '#ff5722']
    };
    this.hashNameToColorsIndex = this.hashNameToColorsIndex.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const index = this.hashNameToColorsIndex(nextProps.name);
    this.setState({
      color: this.state.colors[index]
    });
  }

  hashNameToColorsIndex(name){
    let total = 0;
    for (let i = 0; i < name.length; i++) {
      total += name.charCodeAt(i);
    }
    return total % this.state.colors.length;
  }




  render(){
    const color = this.state.color;
    return (
      <div
        className="user-icon-container">
        <img
          src={`${rootPath}user-icon.png`}
          className="user-icon-in-user-container" />
        <div
          className="number-of-users-icon"
          style={{background: color}}>
          {
            this.props.group ?
              this.props.group.users.length
              :
              '1'
          }
        </div>
      </div>
    )
  }
}


export default UserIcon;