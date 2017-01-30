import React from 'react'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
import Login from './Login';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }



  componentDidUpdate() {
    setTimeout(() => {
      if (this.props.auth) {
        window.close();
      }
    }, 3000);
  }


  render() {
    return (
      <div>
        {
          this.props.auth ? (
            <div>
              Welcome! Use the button in the corner of this page to chat.
            </div>
          ) : (
            <div>
              <Login />
              <div>
                Login failed, please try again
              </div>
            </div>
          )
        }
      </div>
    );

  }
}


const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
