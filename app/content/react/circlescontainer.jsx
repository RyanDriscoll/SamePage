import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircleComponent from './circlecomponent.jsx';
import CircleTitleComponent from './CircleTitleComponent.jsx';
import User from './User.jsx';
import {TweenLite} from 'gsap';

class CircleContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      groups: {},
      collapsed: true,
      localTab: 0
    };
    this.handleContainerClick = this.handleContainerClick.bind(this);
  }

  handleContainerClick(e){
    e.preventDefault();
    // console.log('clicked', this.state.collapsed)
    if (this.state.collapsed)
         TweenLite.to(this.collapsedContainer, 0.3, {maxHeight:215,ease: Power1.easeOut});
    else TweenLite.to(this.collapsedContainer, 0.3, {maxHeight: 0, ease: Power1.easeOut});

    this.setState( {collapsed: !this.state.collapsed} )
  }

  componentWillMount(){
    this.setState({localTab: this.props.tabs.active})
  }
  // updateCircles(groups){
  //   this.setState( {groups: groups} )
  // }

  componentWillReceiveProps(nextProps){
    let thisTab = this.props.tabs[this.props.tabs.active]
    let nextTab = nextProps.tabs[nextProps.tabs.active]
    let activeGroup = nextTab.activeGroup;
    let newGroups = Object.assign({}, this.state.groups);
//if there is a main now else check msg+1 or group switch
    if(activeGroup && !thisTab.activeGroup && !Object.keys(newGroups).length && this.state.localTab == nextProps.tabs.active){
      for (let group in nextTab){
        if(group === 'main' || group === 'activeGroup') continue;
        if(group == nextTab.main) newGroups[group] = {
            id: group,
            letter: 'M',
            name: "Main Page",
            message: 0,
            group: true}
        else newGroups[group] = {
            id: group,
            letter: nextProps.circles[nextTab[group].circle].name.slice(0,1).toUpperCase(),
            name: nextProps.circles[nextTab[group].circle].name,
            message: 0,
            group: false}
      }
    }else if(Object.keys(this.props.messages).length + 1 === Object.keys(nextProps.messages).length && this.state.localTab == nextProps.tabs.active){
      for (let group in nextTab){
        if (group === 'main' || group === 'activeGroup' || group == activeGroup) continue;
        if(thisTab[group].messages.length !== nextTab[group].messages.length)
          if(newGroups[activeGroup]) newGroups[group].message++;
      }
    }else if(thisTab.activeGroup !== activeGroup && this.props.tabs.active === nextProps.tabs.active && this.state.localTab == nextProps.tabs.active)
        if(newGroups[activeGroup]) newGroups[activeGroup].message = 0;
    else return;

    this.setState( {groups: newGroups} )
  }

  render(){
    let activeTab = this.props.tabs[this.props.tabs.active]
    let groups = this.state.groups
    console.log("outside if", groups, groups[activeTab.activeGroup], activeTab.activeGroup)
    if( !Object.keys(groups).length || !groups[activeTab.activeGroup] || this.state.localTab != this.props.tabs.active){
      return (
        <div></div>
      )
    }
    let groupList = [];
    for (let group in groups){
      if(group == activeTab.main)
          groupList.unshift(groups[group]);
      else groupList.push(groups[group]);
    }
    let userIds = activeTab.activeGroup ? activeTab[activeTab.activeGroup].users : [];
    // if (activeGroup) userIds = activeGroup.users;
    // console.log("grouplist", groupList)
    return (
      <div>
        <div className="circle-container">
          {
            groupList && groupList.map( (groupObj)=> {
              return (
                <div key={groupObj.id}>
                  <CircleComponent
                    name={groupObj.name}
                    letter={groupObj.letter}
                    message={groupObj.message}
                    active={activeTab.activeGroup == +groupObj.id}
                    id={groupObj.id}
                    nameToColor={this.props.nameToColor}
                  />
                </div>
              )
            })
          }
        </div>
        {/*<div onClick={this.handleContainerClick}>
          <CircleTitleComponent
            name={groups[activeTab.activeGroup].name}
            group={activeTab.activeGroup}
            nameToColor={this.props.nameToColor}
          />
        </div>*/}
        {
          <div
            className="user-container-collapsed"
            ref={el => {this.collapsedContainer = el;}}>
            {
              activeTab.activeGroup && this.props.users && userIds.map(id => {
                return (
                  <div key={id} >
                    <User
                      username={this.props.users[id].username}
                      nameToColor={this.props.nameToColor}
                    />
                  </div>
                );
              })
            }
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = function(state){
  return {
    tabs: state.tabs,
    // groups: state.groups,
    circles: state.circles,
    messages: state.messages,
    users: state.users
  }
}

export default connect(mapStateToProps)(CircleContainer);