import React, { Component } from 'react';


export default class CircleComponent extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className={(this.props.message && !this.props.active) ? 'circle-component-alert' : 'circle-component'}>
        {this.props.letter}
      </div>
    )
  }
}