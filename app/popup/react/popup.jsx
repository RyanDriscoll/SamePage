import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Login} from '../../components/Login.jsx';

class Popup extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div>
        <Login />
        <div>popupjsx</div>
      </div>
    )
  }
}

// export default connect({}, {})(Popup);
export default Popup;