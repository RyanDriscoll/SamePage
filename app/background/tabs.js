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
      for(let tabId in newTabs){
        if(tabId !== 'active' && tabId != 0 && newTabs[tabId][action.groupId]
          && newTabs[tabId][action.groupId].users.indexOf(action.userId) < 0){ //likely unnecessary
            newTabs[tabId] = Object.assign({}, newTabs[tabId],
              {[action.groupId]: Object.assign({}, newTabs[tabId][action.groupId],
                {users: [...newTabs[tabId][action.groupId].users, action.userId]})})
        }
      }
      return newTabs;
    }
    case SWITCH_ACTIVE_GROUP: return Object.assign({}, tabs, {
      [tabs.active]: Object.assign({}, tabs[tabs.active], 
        {activeGroup: action.groupId})})

    case REMOVE_USER: {
      let newTabs = Object.assign({}, tabs)
      for(let tabId in newTabs){
        if(tabId !== 'active' && tabId != 0 && newTabs[tabId][action.groupId]){
          newTabs[tabId] = Object.assign({}, newTabs[tabId], {
            [action.groupId]: Object.assign({}, newTabs[tabId][action.groupId],
              {users: newTabs[tabId][action.groupId].users.filter(id => id != action.userId)})})
        }
      }
      return newTabs;
    }
    case GET_USER: {
      if(!action.tabId) return tabs
      let newTab = Object.assign({}, tabs[action.tabId])
      for(let groupId in newTab){
        if (groupId !== 'activeGroup' && groupId !== 'main'){
          newTab[groupId] = Object.assign({}, newTab[groupId], 
            {users: 
              action.users
              .filter(user => user.group_id == groupId)
              .map(user => user.user_id)
            }
          )
        }
      }return Object.assign({}, tabs, {[action.tabId]: newTab})
    }
    // let newTabs = Object.assign({}, tabs)
    //   for(let tabId in newTabs){
    //     if(tabId !== 'active' && tabId != 0 && newTabs[tabId][action.groupIds[0]]){
    //       newTabs[tabId] = Object.assign({}, newTabs[tabId])
    //       for(let groupId in newTabs[tabId]){
    //         if (groupId !== 'activeGroup' && groupId !== 'main' && groupId !== 'circle'){
    //           newTabs[tabId][groupId] = Object.assign({}, newTabs[tabId][groupId], 
    //             {users: action.users
    //                     .filter(user => user.group_id == groupId)
    //                     .map(user => user.user_id)
    //             }
    //           )
    //         } 
    //       }
    //     }
    //   }
    //   return newTabs
    
    case ADD_MSG: {
      let newTabs = Object.assign({}, tabs);
      for(let tabId in newTabs){
        if(tabId !== 'active' && tabId != 0 && newTabs[tabId][action.groupId]){
            newTabs[tabId] = Object.assign({}, newTabs[tabId],
              {[action.groupId]: Object.assign({}, newTabs[tabId][action.groupId],
                {messages: [...newTabs[tabId][action.groupId].messages, action.msg.id]})})
        }
      }
      return newTabs;
    }
    case GET_MSG: {
      let newTab = Object.assign({}, tabs[action.tabId])
      for(let groupId in newTab){
        console.log("gggg" , groupId)
        if (groupId !== 'activeGroup' && groupId !== 'main'){
          newTab[groupId] = Object.assign({}, newTab[groupId], 
            {messages: 
              action.messages
              .filter(msg => {console.log("llll msg, grouploop ",msg.group_id, groupId);return msg.group_id == groupId})
              .map(msg => msg.id)
            }
          )
        }
      }return Object.assign({}, tabs, {[action.tabId]: newTab})
    }
    case ADD_GROUP:{
      return Object.assign({}, tabs, {
        [action.tabId]: Object.assign({}, ...action.groups.map(group => {
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
      return Object.assign({}, tabs, {[action.tabId]: {}});
    }
    case CHANGE_ACTIVE: {
      let newTab
      if(tabs[action.tabId]) newTab = {active: action.tabId};
      else newTab = {active: action.tabId, [action.tabId]: {}};
      return Object.assign({}, tabs, newTab);
    }
		case LOGOUT: {
      return Object.assign({}, initialState, {active: tabs.active, [tabs.active]: {}})
    }
		default: return tabs;
  }
}