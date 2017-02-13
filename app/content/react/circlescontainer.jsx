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
      circles: {},
      collapsed: true
    };
    this.handleContainerClick = this.handleContainerClick.bind(this);
  }

  handleContainerClick(e){
    e.preventDefault();
    console.log(this.state.collapsed)
    if (this.state.collapsed) {
      TweenLite.to(this.collapsedContainer, 0.3, {maxHeight: 215, ease: Power1.easeOut});
    } else {
      TweenLite.to(this.collapsedContainer, 0.3, {maxHeight: 0, ease: Power1.easeOut});
    }
    this.setState({collapsed: !this.state.collapsed})
  }

  updateCircles(groups){
    this.setState({circles: groups})
  }

  componentWillReceiveProps(nextProps){
    let activeTab = nextProps.tabs.active;
    let activeGroup = nextProps.tabs[activeTab].activeGroup;
    let groups = Object.assign({}, this.state.circles);

    if (!Object.keys(groups).length && Object.keys(nextProps.tabs[activeTab]).length > 3){
      for (let group in nextProps.tabs[activeTab]){
        if (group === 0 || group === 'main' || group === 'activeGroup' ||
          !nextProps.tabs[activeTab][group] || !nextProps.tabs[activeTab][group].messages) continue;
        if (group == nextProps.tabs[activeTab].main){
          groups[group] = {letter: null, name: "SamePage", message: 0, id: group, group: true}
        } else {
          groups[group] = {
            letter: nextProps.circles[nextProps.tabs[activeTab][group].circle].name.slice(0,1).toUpperCase(),
            name: nextProps.circles[nextProps.tabs[activeTab][group].circle].name,
            message: 0,
            id: group,
            group: false
          }
        }
      }
    }

    if (Object.keys(this.props.messages).length !== Object.keys(nextProps.messages).length
    && Object.keys(groups).length && ( Object.keys(nextProps.messages).length - Object.keys(this.props.messages).length < 2 )){
      for (let group in nextProps.tabs[activeTab]){
        if (group === 0 || group === 'main' || group === 'activeGroup' ||
          !this.props.tabs[activeTab][group] || !nextProps.tabs[activeTab][group] ||
            !this.props.tabs[activeTab][group].messages || !nextProps.tabs[activeTab][group].messages) continue;
        if (this.props.tabs[activeTab][group].messages.length !== nextProps.tabs[activeTab][group].messages.length && group != activeGroup){
          groups[group].message++;
        }
      }
    }
    if (this.props.tabs[this.props.tabs.active].activeGroup != activeGroup && this.props.tabs[this.props.tabs.active].activeGroup != 0 && Object.keys(groups).length && activeGroup){
      groups[activeGroup].message = 0;
    }
    this.updateCircles(groups);
  }

  render(){
    let activeTab = this.props.tabs.active;
    let mainGroup = this.props.tabs[activeTab].main;
    let activeGroup = this.props.tabs[activeTab].activeGroup;
    if (!Object.keys(this.state.circles).length){
      return (
        <div />
      );
    }
    let groupList = [];
    for (let group in this.state.circles){
      if (group == this.props.tabs[this.props.tabs.active].main){
        groupList.unshift(this.state.circles[group])
      } else {
        groupList.push(this.state.circles[group]);
      }
    }
    const tabs = this.props.tabs;
    const activeGroupId = tabs[tabs.active].activeGroup;
    const group = tabs[tabs.active][activeGroupId];
    let userIds;
    if (group) {
      userIds = group.users;
    }
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
            this.state.circles[activeGroup] ?
            this.state.circles[activeGroup].name :
            ''
          }
          <div
            onClick={this.handleContainerClick}>
            {
              this.state.circles[activeGroup] ?
              <UserIcon
                name={this.state.circles[activeGroup].name}
                group={group}
              />
              :
              <div />
            }
          </div>
        </div>
        <div className="circle-container">
          {
            groupList.map( (groupObj)=> {
              return (
                <div key={groupObj.id}>
                  <CircleComponent
                    name={groupObj.name}
                    letter={groupObj.letter}
                    message={groupObj.message}
                    active={this.props.tabs[this.props.tabs.active].activeGroup == +groupObj.id}
                    id={groupObj.id} />
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
              group && this.props.users && userIds.map(id => {
                return (
                  <div key={id} >
                    <User username={this.props.users[id].username} />
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
    groups: state.groups,
    circles: state.circles,
    messages: state.messages,
    users: state.users
  }
}

const mapDispatchToProps = function(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CircleContainer);