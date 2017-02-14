import React, { Component } from 'react';
import rootPath from './httpServer';

class UserIcon extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div
        className="user-icon-container">
        <img
          src={`${rootPath}user-icon.png`}
          className="user-icon-in-user-container" />
        <div
          className="number-of-users-icon"
          style={{background: this.props.nameToColor(this.props.name)}}>
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