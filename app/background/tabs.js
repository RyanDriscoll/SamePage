/* -----------------    CONSTANTS     ------------------ */

export const ADD_USER = 'ADD_USER';
export const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const REMOVE_TAB = 'REMOVE_TAB';
export const REMOVE_GROUP = "REMOVE_GROUP";
export const ADD_MSG = 'ADD_MSG';
export const GET_MSG = 'GET_MSG';
export const ADD_GROUP = 'ADD_GROUP';
export const CHANGE_ACTIVE = 'CHANGE_ACTIVE';
export const SWITCH_ACTIVE_GROUP = 'SWITCH_ACTIVE_GROUP';

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
      for(let tab in newTabs){
        if(newTabs[tab][action.groupId] && newTabs[tab][action.groupId].users.indexOf(action.user.id)<0){
          newTabs = Object.assign({}, newTabs, {[tab]:
            Object.assign({}, newTabs[tab], {[action.groupId]:
              Object.assign({}, newTabs[tab][action.groupId], {users:
                [...newTabs[tab][action.groupId].users, action.userId]
              })
            })
          });
        } 
      }
      return newTabs;
    }
    case SWITCH_ACTIVE_GROUP:{
      let newActiveGroup = Object.assign({}, tabs[tabs.active]);
      newActiveGroup.activeGroup = action.groupId;
      return Object.assign({}, tabs, {[tabs.active]: newActiveGroup});
    }
    case REMOVE_USER: {
      let newTabs = Object.assign({}, tabs)
        for(let tab in newTabs){
          if(tab == 'active' || tab == 0) continue;
          if(tabs[tab][action.groupId]) {
            newTabs[tab][action.groupId].users = newTabs[tab][action.groupId].users.filter(id => id != action.userId);
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
          newTabs = Object.assign({}, newTabs, {[tab]:
            Object.assign({}, newTabs[tab], {[action.groupId]:
              Object.assign({}, newTabs[tab][action.groupId], {messages:
                [...newTabs[tab][action.groupId].messages, action.msg.id]
              })
            })
          });
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
    case ADD_GROUP:

      return Object.assign({}, tabs, {
        [action.tabId]: Object.assign({}, ...action.group.map(groupInst => {
          if(groupInst.circle_id){
            return {[groupInst.id]: {circle: groupInst.circle_id, users: [], messages: []}}
          }else return {
            activeGroup: groupInst.id, 
            main: groupInst.id, 
            [groupInst.id]: {circle: null, users: [], messages: []}
          }
        }))
      })
    case REMOVE_TAB:
      let newTabs = Object.assign({}, tabs);
      delete newTabs[action.tabId];
      return newTabs;
    case REMOVE_GROUP:{
      let removeGroup = Object.assign({}, tabs);
      removeGroup[action.tabId] = {}
      removeGroup[action.tabId].activeGroup = 0;
      removeGroup[action.tabId].main = 0;
      return removeGroup;
    }
    case CHANGE_ACTIVE: {
      let newTab
      if(tabs[action.tabId]){
        newTab = {active: action.tabId}
      } else{
        newTab = {active: action.tabId, [action.tabId]: {}}
      }
      return Object.assign({}, tabs, newTab);
    }
		case 'LOGOUT': return initialState;
		default: return tabs;
  }
}