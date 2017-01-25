import React, {Component} from 'react';
import {connect} from 'react-redux';

class Popup extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div>Hello World</div>
    )
  }
}

// export default connect({}, {})(Popup);
export default Popup;