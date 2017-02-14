import React, { Component } from 'react';
import {connect} from 'react-redux';
import User from './User.jsx';
import rootPath from './httpServer.js';
import CircleContainer from './circlescontainer.jsx'


class UserContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render(){
    const tabs = this.props.tabs;
    // const activeGroupId = tabs[tabs.active].activeGroup
    // const group = tabs[tabs.active][activeGroupId];

    return (
      <div className="user-container shadow">
        <div
          className="title">
          <img
            className="button-img"
            style={{
              height: '40px',
              width: '40px'
            }}
            src={`${rootPath}messagebubble.png`}
          />
          SamePage
        </div>
        <CircleContainer
          nameToColor={this.props.nameToColor}
          store={this.props.store}
        />
      </div>
    );
  }
}

// const mapStateToProps = function(state){
//   return {
//     tabs: state.tabs
//   };
// }

export default connect(({tabs})=>({tabs}))(UserContainer);
