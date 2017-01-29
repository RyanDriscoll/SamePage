import React, {Component} from 'react';
import {connect} from 'react-redux';
import Login from './Login.jsx';

class Popup extends React.Component{
  constructor(props){
    super(props);
    this.popupStyle = {
      backgroundColor: '#2c75ea',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '3px',
      border: '1px solid black'
    }
  }


  render(){
    return (
      <div style={this.popupStyle}>
        <Login />
      </div>
    )
  }
}

// export default connect({}, {})(Popup);
export default Popup;