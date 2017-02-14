import React, { Component } from 'react';
import {TweenMax} from 'gsap';
import rootPath from './httpServer';


export default class CircleComponent extends React.Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
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
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.message && !nextProps.active && !this.tween.isActive()) {
      this.tween.play();
    } else if (!nextProps.message){
      this.tween.time(0).pause();
    }
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

          style={{backgroundColor: this.props.nameToColor(this.props.name)}}
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
}
