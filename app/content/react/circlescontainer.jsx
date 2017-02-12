import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircleComponent from './circlecomponent.jsx';

class CircleContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      circles:{},
    }
  }

  updateCircles(groups){
    this.setState({circles: groups})
  }

  componentWillMount(){
    let activeTab = this.props.tabs.active
    let activeGroup = this.props.tabs[activeTab].activeGroup
    let groups = {};
    for (let group in this.props.tabs[activeTab]){
      if(group === 0 || group === 'active' || group === 'activeGroup' || 
        !this.props.tabs[activeTab][group] || !this.props.tabs[activeTab][group].messages) continue;
      if(group == this.props.tabs[activeTab].main){
        groups[group] = {letter: 'M', message: false, id: group, group: true}
      }else{
        groups[group] = {
          letter: this.props.circles[this.props.tabs[activeTab][group].circle].name.slice(0,1).toUpperCase(),
          message: false,
          id: group,
          group: false
        }
      }
    }
    this.updateCircles(groups);
  }

  componentWillReceiveProps(nextProps){
    let activeTab = nextProps.tabs.active;
    let activeGroup = nextProps.tabs[activeTab].activeGroup
    let groups = {};
    let message;
    // if(this.props.tabs[this.props.tabs.active].activeGroup != nextProps.tabs[nextProps.tabs.active].activeGroup){
    //   for()
    // }
    // if(Object.keys(this.props.messages).length !== Object.keys(nextProps.messages).length ){
      for (let group in nextProps.tabs[activeTab]){
        message = false;
        if(group === 0 || group === 'active' || group === 'activeGroup' ||
          !this.props.tabs[activeTab][group] || !nextProps.tabs[activeTab][group] ||
            !this.props.tabs[activeTab][group].messages || !nextProps.tabs[activeTab][group].messages) continue;
        if(group == nextProps.tabs[activeTab].main){
          if(this.props.tabs[activeTab][group].messages.length !== nextProps.tabs[activeTab][group].messages.length){
            message = true;
          }
          groups[group] = {letter: 'M', message: message, id: group, group: true}
        }else {
          if(this.props.tabs[activeTab][group].messages.length !== nextProps.tabs[activeTab][group].messages.length){
            message = true;
          }
          groups[group] = {
            letter: nextProps.circles[nextProps.tabs[activeTab][group].circle].name.slice(0,1).toUpperCase(),
            message: message,
            id: group,
            group: false
          }
        }
      }
      this.updateCircles(groups);
    // }
  }

  render(){
    if(!Object.keys(this.state.circles).length){
      return (
        <div></div>
      )
    }
    let groupList = [];
    for (let group in this.state.circles){
      if(group == this.props.tabs[this.props.tabs.active].main){
        groupList.unshift(this.state.circles[group])
      }else{
        groupList.push(this.state.circles[group]);
      }
    }
    console.log('groupList', this.state.circles, groupList)
    return (
      <div>
        {
          groupList.map( (groupObj)=> {
            return (
              <div key={groupObj.id}>
                <CircleComponent letter={groupObj.letter} 
                                message={groupObj.message} 
                                active={this.props.tabs[this.props.tabs.active].activeGroup === groupObj.id}
                                id={groupObj.id}/>

              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = function(state){
  return {
    tabs: state.tabs,
    groups: state.groups,
    circles: state.circles,
    messages: state.messages
  }
}

const mapDispatchToProps = function(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CircleContainer);