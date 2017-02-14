import React, { Component } from 'react';
import {TweenMax} from 'gsap';


export default class CircleComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      circleColor: '',
      // colors: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#558b2f', '#ef6c00', '#ff5722', '#795548']
    };
    this.handleClick = this.handleClick.bind(this);
    // this.hashNameToColorIndex = this.hashNameToColorIndex.bind(this);
  }

  componentWillMount(){
    // this.setState({circleColor: this.props.nameToColor(this.props.name)});
    // console.log('this state color in mount', this.state.circleColor, "__", this.props.name)
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({circleColor: this.props.nameToColor(nextProps.name)});
    // console.log('this state color', this.state.circleColor)
    if (this.props.message && !this.props.active) {
      // TweenMax.to(this.circle, 0, {transformOrigin: 'center center -150px'});
      TweenMax.to(this.circle, 0.5, {
        scaleX: 1.2,
        scaleY: 1.2,
        force3D: true,
        yoyo: true,
        repeat: -1,
        ease: Power1.easeInOut
      });
    } else {
      TweenMax.to(this.circle, 0.5, {
        scaleX: 1,
        scaleY: 1,
        force3D: true,
        yoyo: false,
        repeat: 0,
        ease: Power1.easeInOut
      });
    }
  }

  // hashNameToColorIndex(name){
  //   let total = 0;
  //   for (let i = 0; i < name.length; i++) {
  //     total += name.charCodeAt(i);
  //   }
  //   return total % this.state.colors.length;
  // }

  handleClick(e){
    e.preventDefault();
    chrome.runtime.sendMessage( {type: 'changeActiveGroup', groupId: this.props.id}, null)
  }

  render(){
    // console.log("color", this.state.circleColor, this.props.name)
    return (
      <div
        ref={el => {this.circle = el;}}
        style={ {backgroundColor: this.props.nameToColor(this.props.name)} }
        className="circle-component shadow"
        onClick={this.handleClick}>
        {this.props.letter} {this.props.message || ''}
      </div>
    );
  }
};