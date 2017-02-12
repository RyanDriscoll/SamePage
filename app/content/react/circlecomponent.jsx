import React, { Component } from 'react';


export default class CircleComponent extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    console.log("----------clicked circle")
    chrome.runtime.sendMessage({type: 'changeActiveGroup', groupId: this.props.id}, null)
  }

  render(){
    return (
      <div className={(this.props.message && !this.props.active) ? 'circle-component-alert' : 'circle-component'}
            onClick={this.handleClick}>
        {this.props.letter}
      </div>
    )
  }
}