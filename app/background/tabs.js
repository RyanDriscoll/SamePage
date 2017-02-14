/* -----------------    CONSTANTS     ------------------ */

import { ADD_GROUP } from './groups';

import { ADD_USER } from './users';
import { GET_USER } from './users';
import { REMOVE_USER } from './users';

import { ADD_MSG } from './messages';
import { GET_MSG } from './messages';

export const REMOVE_TAB = 'REMOVE_TAB';
export const REMOVE_GROUP = "REMOVE_GROUP";
export const CHANGE_ACTIVE = 'CHANGE_ACTIVE';
export const SWITCH_ACTIVE_GROUP = 'SWITCH_ACTIVE_GROUP';
export const LOGOUT = 'LOGOUT';

/* -----------------    REDUCER     ------------------ */

const initialState = {
  active: 0,
  0: {
    activeGroup: 0,
    main: 0,
    0: {
      circle: null,
      users:[],
      messages: [] },
  }
}
export default function reducer (tabs = initialState, action) {
	switch (action.type) {
    case ADD_USER: {
      let newTabs = Object.assign({}, tabs);
      let group = newTabs[tabs.active][action.groupId]
      for(let tab in newTabs){
        if(group && group.users.indexOf(action.user.id) < 0){
          newTabs = Object.assign({}, newTabs, {
            [tab]: Object.assign({}, newTabs[tab], {
              [action.groupId]: Object.assign({}, group,
                {users: [...group.users, action.userId]}
              )
            })
          })
        }
      }
      return newTabs;
    }
    case SWITCH_ACTIVE_GROUP:{
      let newTab = Object.assign({}, tabs[tabs.active]);
      newTab.activeGroup = action.groupId;
      return Object.assign({}, tabs, {[tabs.active]: newTab});
    }
    case REMOVE_USER: {
      let newTabs = Object.assign({}, tabs)
        for(let tab in newTabs){
          if(tab == 'active' || tab == 0) continue;
          if(tabs[tab][action.groupId]) {
            newTabs[tab] = Object.assign({}, {
              [action.groupId]: Object.assign({}, newTabs[tab][action.groupId],
                {user: newTabs[tab][action.groupId].users.filter(id => id != action.userId)}
              )
            })
            //newTabs[tab][action.groupId].users = newTabs[tab][action.groupId].users.filter(id => id != action.userId);
          }
        }
      return newTabs;
    }
    case GET_USER: {
      if(!action.tabId) return tabs;
      let newTab = Object.assign({}, tabs[action.tabId]);
      action.users.forEach(user => {
        newTab[user.group_id].users.push(user.user_id);
      })
			return Object.assign({}, tabs, {[action.tabId]: newTab});
    }
    case ADD_MSG: {
      let newTabs = Object.assign({}, tabs);
      for(let tab in newTabs){
        if(newTabs[tab][action.groupId]){
          newTabs = Object.assign({}, newTabs, {
            [tab]: Object.assign({}, newTabs[tab], {
              [action.groupId]: Object.assign({}, newTabs[tab][action.groupId],
                {messages: [...newTabs[tab][action.groupId].messages, action.msg.id]}
              )
            })
          })
        }
      }
      return newTabs;
    }

    case GET_MSG: {
      let newTab = Object.assign({}, tabs[action.tabId]);
      action.messages.forEach( msg => {
        newTab[msg.group_id].messages.push(msg.id);
      })
			return Object.assign({}, tabs, {[action.tabId]: newTab});
    }
    case ADD_GROUP:{
      return Object.assign({}, tabs, {
        [action.tabId]: Object.assign({}, ...action.group.map(group => {
          if(group.circle_id){
            return {[group.id]: {circle: group.circle_id, users: [], messages: []}}
          }else return {
            activeGroup: group.id,
            main: group.id,
            [group.id]: {circle: null, users: [], messages: []}
          }
        }))
      })
    }
    case REMOVE_TAB:{
      let newTabs = Object.assign({}, tabs);
      delete newTabs[action.tabId];
      return newTabs;
    }
    case REMOVE_GROUP:{
      return Object.assign({}, tabs, {[action.tabId]: {activeGroup: 0, main: 0, 0: {}}});
    }
    case CHANGE_ACTIVE: {
      let newTab
      if(tabs[action.tabId]) newTab = {active: action.tabId}
      else newTab = {active: action.tabId, [action.tabId]: {}}
      return Object.assign({}, tabs, newTab);
    }
		case LOGOUT: {
      return Object.assign({}, initialState, {active: tabs.active, [tabs.active]: {}})
    }
		default: return tabs;
  }
}