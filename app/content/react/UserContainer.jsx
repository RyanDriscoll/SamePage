import React, { Component } from 'react';
import CircleContainer from './circlescontainer.jsx'


class UserContainer extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    return (
      <div className="user-container shadow">
        <CircleContainer
          nameToColor={this.props.nameToColor}
          store={this.props.store}
        />
      </div>
    );
  }
}

export default UserContainer;
