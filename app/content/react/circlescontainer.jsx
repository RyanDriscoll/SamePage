import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircleComponent from './circlecomponent.jsx';
import CircleTitleComponent from './CircleTitleComponent.jsx';
import UserIcon from './UserIconComponent.jsx';
import User from './User.jsx';
import {TweenLite} from 'gsap';
import rootPath from './httpServer';

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
    if (this.state.collapsed)
         TweenLite.to(this.collapsedContainer, 0.3, {maxHeight:215,ease: Power1.easeOut});
    else TweenLite.to(this.collapsedContainer, 0.3, {maxHeight: 0, ease: Power1.easeOut});

    this.setState( {collapsed: !this.state.collapsed} )
  }

  componentWillMount(){
    this.setState({localTab: this.props.tabs.active})
  }

  componentWillReceiveProps(nextProps){
    let thisTab = this.props.tabs[this.props.tabs.active]
    let nextTab = nextProps.tabs[nextProps.tabs.active]
    let activeGroup = nextTab.activeGroup;
    let newGroups = Object.assign({}, this.state.groups);

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
        <div />
      );
    }
    let groupList = [];
    for (let group in groups){
      if(group == activeTab.main)
          groupList.unshift(groups[group]);
      else groupList.push(groups[group]);
    }
    let userIds = activeTab.activeGroup ? activeTab[activeTab.activeGroup].users : [];

    return (
      <div className="user-container shadow">
        <div
          className="title">
          {
            activeGroup == mainGroup ?
            <img
            className="title-button-img"
            style={{height: '40px', width: '40px', paddingLeft: '3px'}}
            src={`${rootPath}messagebubble.png`}
            />
            :
            <img
            className="title-button-img"
            style={{height: '30px', paddingLeft: '5px'}}
            src={`${rootPath}threecircles.png`}
            />
          }
          {
            this.state.circles[activeGroup] &&
            this.state.circles[activeGroup].name
          }
          <div
            onClick={this.handleContainerClick}>
            {
              this.state.circles[activeGroup] &&
              <UserIcon
                name={this.state.circles[activeGroup].name}
                group={group}
              />
            }
          </div>
        </div>
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
    circles: state.circles,
    messages: state.messages,
    users: state.users
  }
}

export default connect(mapStateToProps)(CircleContainer);