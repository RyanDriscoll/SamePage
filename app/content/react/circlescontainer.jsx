import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircleComponent from './circlecomponent.jsx';

class CircleContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      circles:{},
      activeTab:0,
      activeGroup:0
    }
  }

  updateCircles(groups){
    this.setState({circles: groups})
  }

  componentWillMount(){
    let activeTab = this.props.tabs.active
    let activeGroup = this.props.tabs[activeTab].activeGroup
    this.setState({
      activeTab: activeTab, 
      activeGroup: activeGroup
    });
    let groups = {};
    for (let group in this.props.tabs[activeTab]){
      if(group === 0 || group === 'active' || group === 'activeGroup') continue;
      if(this.props.groups[group]){
        groups[group] = {letter: 'M', message: false, id: group, group: true}
      }else if(this.props.circles[group]){
        groups[group] = {
          letter: this.props.circles[group].name.slice(0,1).toUpperCase(),
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
    this.setState({
      activeTab: activeTab, 
      activeGroup: activeGroup
    });
    let groups = {};
    let message;
    for (let group in nextProps.tabs[activeTab]){
      message = false;
      if(group === 0 || group === 'active' || group === 'activeGroup') continue;
      if(nextProps.groups[group]){
        if(this.props.tabs[activeTab][group].messages.length !== nextProps.tabs[activeTab][group].messages.length){
          message = true;
        }
        groups[group] = {letter: 'M', message: message, id: group, group: true}
      }else if(nextProps.circles[group]){
        if(this.props.tabs[activeTab][group].messages.length !== nextProps.tabs[activeTab][group].messages.length){
          message = true;
        }
        groups[group] = {
          letter: nextProps.circles[group].name.slice(0,1).toUpperCase(),
          message: message,
          id: group,
          group: false
        }
      }
    }
    this.updateCircles(groups);
  }

  render(){
    let groupList = [];
    for (let group in this.state.circles){
      if(this.state.circles[group].group){
        groupList.unshift(this.state.circles[group])
      }
      groupList.push(this.state.circles[group]);
    }
    return (
      <div>
        {
          groupList.map( (groupObj)=> {
            return (
              <CircleComponent letter={groupObj.letter} 
                              message={groupObj.message} 
                              active={this.state.activeGroup === groupObj.id}/>
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