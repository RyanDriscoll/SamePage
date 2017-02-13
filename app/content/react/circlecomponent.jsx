import React, { Component } from 'react';
import {TweenMax} from 'gsap';
import rootPath from './httpServer';


export default class CircleComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      circleColor: '',
      colors: ['#e91e63', '#3f51b5', '#9c27b0', '#673ab7', '#f44336', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#558b2f', '#ef6c00', '#ff5722']
    };
    this.handleClick = this.handleClick.bind(this);
    this.hashNameToColorIndex = this.hashNameToColorIndex.bind(this);

  }

  componentDidMount() {
    this.tween = TweenMax.to(this.circle, 0.5, {
        scaleX: 1.2,
        scaleY: 1.2,
        force3D: true,
        yoyo: true,
        repeat: -1,
        ease: Power1.easeInOut
      }).pause();
    // this.stopTween = TweenMax.to(this.circle, 0.5, {
    //     scaleX: 1,
    //     scaleY: 1,
    //     force3D: true,
    //     yoyo: false,
    //     repeat: 0,
    //     ease: Power1.easeInOut
    //   });
  }

  componentWillReceiveProps(nextProps) {
    const index = this.hashNameToColorIndex(nextProps.name);
    this.setState({
      circleColor: this.state.colors[index]
    });
    if (nextProps.message && !nextProps.active && !this.tween.isActive()) {
      this.tween.play();
    } else if (!nextProps.message){
      this.tween.time(0).pause();
    }
  }

  hashNameToColorIndex(name){
    let total = 0;
    for (let i = 0; i < name.length; i++) {
      total += name.charCodeAt(i);
    }
    return total % this.state.colors.length;
  }

  handleClick(e){
    e.preventDefault();
    if (this.tween.isActive()) {
      this.tween.time(0).pause();
    }
    chrome.runtime.sendMessage({type: 'changeActiveGroup', groupId: this.props.id}, null)
  }

  render(){
    return (
      <div
        className="outer-circle"
        ref={el => {this.circle = el;}}>
        <div

          style={{backgroundColor: this.state.circleColor}}
          className="circle-component shadow"
          onClick={this.handleClick}>
          {
            this.props.letter ? this.props.letter
            :
            <img
              className="title-button-img"
              style={{
                height: '20px',
                width: '20px'
              }}
              src={`${rootPath}messagebubblewhite.png`}
            />
          }
        </div>
          { this.props.message ?
            <div className="number-of-messages-icon shadow">
            {this.props.message}
            </div>
            : null
          }
      </div>
    );
  }
};