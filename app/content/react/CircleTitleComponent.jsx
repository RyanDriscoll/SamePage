import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TweenLite} from 'gsap';
import rootPath from './httpServer';

class CircleTitle extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      titleColor: '',
      colors: ['#e91e63', '#3f51b5', '#9c27b0', '#673ab7', '#f44336', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#558b2f', '#ef6c00', '#ff5722']
    };
    this.hashNameToColorIndex = this.hashNameToColorIndex.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const index = this.hashNameToColorIndex(nextProps.name);
    this.setState({
      titleColor: this.state.colors[index]
    });
  }

  hashNameToColorIndex(name){
    let total = 0;
    for (let i = 0; i < name.length; i++) {
      total += name.charCodeAt(i);
    }
    return total % this.state.colors.length;
  }




  render(){
    const color = this.state.titleColor;
    return (
      <div className="circle-title-container">
        <div
          className="circle-title-component"
          style={{backgroundColor: color}}>
          <div>{this.props.name}</div>
        </div>
        <div
          className="user-icon-container">
          <img
            src={`${rootPath}user-icon.png`}
            className="user-icon-in-user-container" />

        </div>
      </div>
    )
  }
}


export default CircleTitle;