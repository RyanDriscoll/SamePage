import React, {Component} from 'react';
import {connect} from 'react-redux';
import Login from './Login.jsx';

class Popup extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <Login />
      </div>
    )
  }
}

// export default connect({}, {})(Popup);
export default Popup;