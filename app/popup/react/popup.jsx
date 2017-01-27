import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Login} from './Login.jsx';
import store from '../../store';

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